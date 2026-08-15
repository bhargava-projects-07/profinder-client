import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getEntity, entitySave, entityUpdate } from "../service/subServService.js";

import { getServices } from "../service/servService.js";
import './dashboard.css';
import SubServiceForm from "./SubServiceForm.jsx";


const SubService = () => {
  const [entity,setEntity] = useState({
    serviceid: "",name: "" , description: "" });
    const [ services,setServices ] = useState([]);

  const [ loading,setLoading ] = useState(true);

    const { entity_id } = useParams();
    const entityName = "Sub Service";

    const navigate = useNavigate();

    useEffect(()=>
    {
        const fetchEntity = async() =>
        {
            if( entity_id )
            {   
              try
              {
                  const data = await getEntity(entity_id);
                  if( data?.cause !== undefined )
                  {
                      toast.error( "Error loading sub service: " + data?.cause );
                  }
                  else if( data?.entityFetched !== undefined )
                  {
                      setEntity( data.entityFetched );
                  }
                  else
                  {
                      toast.info( "Sub service to edit not found." );
                  }
              }
              catch(err)
              {
                  toast.error( "Error loading sub service to edit : " + err.message );
              }
            }
        }

        fetchEntity();

        const getServiceOptions = async() =>{
            try
            {
                const data = await getServices();
                setServices(data);
            }
            catch( error )
            {      
                toast.error( "Unable to Load Services: " + error.message )
            }
            finally
            {
                setLoading(false);
            }          
        }

        getServiceOptions();
    },[])

    useEffect(() => {
        if( ! entity_id )
        {
            setEntity({
                serviceid: "",name: "" , description: "" });
        }
    }, [entity_id]);    

    const changeHandler = (event)=>{
      setEntity( {...entity,[event.target.name]:event.target.value} );
    }

    const saveEntity = async ()=>{

      const data = await entitySave(entity);
      if( data?.cause !== undefined )
      {
          toast.error("Could not save "+entityName.toLowerCase()+": " + data?.cause);
      }
      else if( data?.entityCreated !== undefined )
      {
          toast.success( entityName + " added Successfully !",{
              onClose: (reason)=>{
              setEntity({
                  serviceid: "",name: "" , description: "" });
              },
              autoClose: 3000
          } );
      }
      else
      {
          toast.info(data.message);
      }
    }

    const updateEntity = async() =>
    {
        try
        {
            const result = await entityUpdate(entity_id,entity);
            const successMsg = result?.message || "Entity updated successfully!";
            const isUpdated = result?.updated;
            notifyUpd(successMsg,isUpdated,result);
        }
        catch(err)
        {
            toast.error( "Could not update Entity : " + err.message );
        }
    }
    const notifyUpd= ( apiMessage,isUpdated,result )=>
    {
      if( result?.cause !== undefined )
      {
        toast.error("Could not update sub service: " + result?.cause);
      }
      else if( isUpdated !== undefined && ! isUpdated )
      {
          toast.info(apiMessage, {
              onClose: (reason)=>{
                  navigate("/admindashboard/delete-sub-services");
              },
              autoClose: 3000
          });
      }
      else if( result?.putResult )
      {
          toast.error(apiMessage, {
              onClose: (reason) => {
                  navigate("/admindashboard/delete-sub-services");
              },
              autoClose: 3000
          });
      }
      else
      {
          toast.success(apiMessage, {
              onClose: (reason) => {
                  navigate("/admindashboard/delete-sub-services");
              },
              autoClose: 3000
          });
      }
    }

    const submitForm = (event)=>
    {
        event.preventDefault();

        if( entity_id )
        {
          updateEntity();
        }
        else
        {
          saveEntity();
        }
    } 

  if( loading ) return <p className='mt-5 text-center'>Loading Services...</p>

  return (

    <>

      <main>
            <ToastContainer position='top-right' autoClose={3000} />        

            {/* View Breadcrumb */}
            <section className="mt-2">
                <div className="breadCrumbDivAdmin">
                      <span>{entity_id ? 'Edit' : 'Add'}&nbsp;{entityName}</span>
                </div>
            </section>

            <section className='mt-2 ps-13'>

              <SubServiceForm entity={entity} changeHandler={changeHandler} submitForm={submitForm} entity_id={entity_id ? entity_id:null} entity_name="Sub Service" optionsArr={services} />

            </section>

      </main>

    </>

  )
}

export default SubService;