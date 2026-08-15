
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getEntity, entitySave, entityUpdate } from "../service/servService.js";

import './dashboard.css';
import AdminServiceForm from "./AdminServiceForm.jsx";

const Service = () => {
  const [entity,setEntity] = useState({
    name:"" , description:"" });

    const { entity_id } = useParams();
    const entityName = "Service";

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
                      toast.error( "Error loading entity: " + data?.cause );
                  }
                  else if( data?.entityFetched !== undefined )
                  {
                      setEntity( data.entityFetched );
                  }
                  else
                  {
                      toast.info( "Entity to edit not found." );
                  }
              }
              catch(err)
              {
                  toast.error( "Error loading entity to edit : " + err.message );
              }
            }
        }

        fetchEntity();
    },[])

    useEffect(() => {
        if( ! entity_id )
        {
            setEntity({
                name: "" , description: "" });
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
                  name: "" , description: "" });
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
        toast.error("Could not update entity: " + result?.cause);
      }
      else if( isUpdated !== undefined && ! isUpdated )
      {
          toast.info(apiMessage, {
              onClose: (reason)=>{
                  navigate("/admindashboard/delete-services");
              },
              autoClose: 3000
          });
      }
      else if( result?.putResult )
      {
          toast.error(apiMessage, {
              onClose: (reason) => {
                  navigate("/admindashboard/delete-services");
              },
              autoClose: 3000
          });
      }
      else
      {
          toast.success(apiMessage, {
              onClose: (reason) => {
                  navigate("/admindashboard/delete-services");
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

              <AdminServiceForm entity={entity} changeHandler={changeHandler} submitForm={submitForm} entity_id={entity_id ? entity_id:null} entity_name="Service" />

            </section>

      </main>

    </>

  )
}

export default Service