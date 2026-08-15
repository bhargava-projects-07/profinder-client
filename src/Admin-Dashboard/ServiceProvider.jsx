import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getEntity, entitySave, entityUpdate } from "../service/ServProviderService.js";

import { getServices } from "../service/servService.js";
import './dashboard.css';
import ServiceProviderForm from "./ServiceProviderForm.jsx";
import { getSubServices } from "../service/subServService.js";

const ServiceProvider = () => {
  const [entity,setEntity] = useState({
    serviceid: "", subserviceid: "", name: "" , businessname: "", email: "", phone: "", description: "", address: "" });
    const [ services,setServices ] = useState([]);
    const [ subservices,setSubservices ] = useState([]);

    const [ loading,setLoading ] = useState(true);
    const [ loadingsub,setLoadingsub ] = useState(false);

    const { entity_id } = useParams();
    const entityName = "Service Provider";

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
            catch( err )
            {      
                toast.error( "Unable to Load Services: " + err.message )
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
                serviceid: "", subserviceid: "", name: "" , businessname: "", email: "", phone: "", description: "", address: "" });
        }
    }, [entity_id]);
  
    const getSubServiceOptions = async ()=>{
        try
        {
            const data = await getSubServices(entity.serviceid);
            const subservices = data.map(item => ({
            value: item._id,
            label: item.name
            }))

            setSubservices(subservices);
        }
        catch(err)
        {
            toast.error( "Unable to Load Sub Services: " + err.message )
        }
        finally
        {
            setLoadingsub(false);
        } 
    }
    
    useEffect(()=>{
        if( entity.serviceid == "" )
        {
            setSubservices([]);
        }
        else
        {
            setLoadingsub( true );
        }

    },[entity.serviceid]);
    useEffect(()=>{
        if( loadingsub )
        {
            getSubServiceOptions();
        }
    },[loadingsub])

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
    serviceid: "", subserviceid: "", name: "" , businessname: "", email: "", phone: "", description: "", address: "" });
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
            const successMsg = result?.message || "Service Provider updated successfully!";
            const isUpdated = result?.updated;
            notifyUpd(successMsg,isUpdated,result);
        }
        catch(err)
        {
            toast.error( "Could not update Service Provider: " + err.message );
        }
    }
    const notifyUpd= ( apiMessage,isUpdated,result )=>
    {
      if( result?.cause !== undefined )
      {
        toast.error("Could not update service provider: " + result?.cause);
      }
      else if( isUpdated !== undefined && ! isUpdated )
      {
          toast.info(apiMessage, {
              onClose: (reason)=>{
                  navigate("/admindashboard/delete-service-providers");
              },
              autoClose: 3000
          });
      }
      else if( result?.putResult )
      {
          toast.error(apiMessage, {
              onClose: (reason) => {
                  navigate("/admindashboard/delete-service-providers");
              },
              autoClose: 3000
          });
      }
      else
      {
          toast.success(apiMessage, {
              onClose: (reason) => {
                  navigate("/admindashboard/delete-service-providers");
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
  if( loadingsub ) return <p className='mt-5 text-center'>Loading Sub Services...</p>

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

              <ServiceProviderForm entity={entity} changeHandler={changeHandler} submitForm={submitForm} entity_id={entity_id ? entity_id:null} entity_name="Service Provider" optionsArr={services} subOptionsArr={subservices} />

            </section>

      </main>

    </>

  )
}

export default ServiceProvider;