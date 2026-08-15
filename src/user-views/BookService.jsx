
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";

import { getEntity, entitySave } from "../service/ServBookingService.js";

import { getServices } from "../service/servService.js";
import { getSubServices } from "../service/subServService.js";
import { getMatchingProviders } from "../service/ServProviderService.js";

import './user-view.css';
import BookServiceForm from "./BookServiceForm.jsx";

const BookService = ({subDisp}) => {
    const [ serviceBooking,setServiceBooking ] = useState({
        serviceid: "", subserviceid: "", serviceproviderid: "", name: "", email: "", phone: "", subject: "", message: "" });
    
    const [ services,setServices ] = useState([]);
    const [ subservices,setSubservices ] = useState([]);
    const [ serviceproviders,setServiceproviders ] = useState([]);

    const [ loading,setLoading ] = useState(true);
    const [ loadingsub,setLoadingsub ] = useState(false);
    const [ loadingproviders,setLoadingproviders ] = useState(false);
    const isDataLoading = loading || loadingsub || loadingproviders;
    const [ isSubmitting,setIssubmitting ] = useState( false );
    const [ preload,setPreload ] = useState( true );

    const { entity_id } = useParams();
    const entityName = "Book Service";

    const location = useLocation();
    const serviceSelection = location.state;

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
                      toast.error( "Error loading service booking: " + data?.cause );
                  }
                  else if( data?.entityFetched !== undefined )
                  {
                      setServiceBooking( data.entityFetched );
                  }
                  else
                  {
                      toast.info( "Service Booking to edit not found." );
                  }
              }
              catch(err)
              {
                  toast.error( "Error loading service booking to edit : " + err.message );
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
    },[]);

    const getSubServiceOptions = async ()=>{
        try
        {
            const data = await getSubServices(serviceBooking.serviceid);
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
        if( services.length && serviceSelection )
        {
            setServiceBooking( {...serviceBooking,serviceid: serviceSelection.serviceid } );
        }
    },[services]);
    useEffect(()=>{
        if( subservices.length && serviceSelection && preload )
        {
            setServiceBooking( {...serviceBooking,subserviceid: serviceSelection.subserviceid } );
        }
    },[subservices]);
    useEffect(()=>{
        if( serviceproviders.length && serviceSelection && preload )
        {
            setServiceBooking( {...serviceBooking,serviceproviderid: serviceSelection.serviceproviderid } );
            setPreload( false );
        }
    },[serviceproviders]);

    useEffect(()=>{
        setServiceBooking({...serviceBooking,"subserviceid": ""});
        if( serviceBooking.serviceid == "" )
        {
            setSubservices([]);
        }
        else
        {
            setLoadingsub( true );
        }

    },[serviceBooking.serviceid]);
    useEffect(()=>{
        if( loadingsub )
        {
            getSubServiceOptions();
        }
    },[loadingsub]);

    const getServiceProviders = async()=>{
        try
        {
            const data = await getMatchingProviders(serviceBooking.serviceid,serviceBooking.subserviceid);
            const servProviders = data.map(item => ({
                value: item._id,
                label: item.name
            }))

            setServiceproviders(servProviders);
        }
        catch(err)
        {
            toast.error( "Unable to Load Service Provders: " + err.message )
        }
        finally
        {
            setLoadingproviders(false);
        } 
    }
    useEffect(()=>{
        setServiceBooking({...serviceBooking,"serviceproviderid": ""});        
        if( serviceBooking.subserviceid == "" )
        {
            setServiceproviders([]);
        }
        else
        {
            setLoadingproviders( true );
        }

    },[serviceBooking.subserviceid]);
    useEffect(()=>{
        if( loadingproviders )
        {
            getServiceProviders();
        }
    },[loadingproviders]);

    useEffect(() => {
        if( ! entity_id )
        {
            setServiceBooking({ serviceid: "", subserviceid: "", serviceproviderid: "", name: "", email: "", phone: "", subject: "", message: "" });
        }
    }, [entity_id]);

    useEffect(()=>{
        if( isSubmitting )
        {
            saveEntity();
        }
    },[isSubmitting]);
    const changeHandler = (event)=>{
      setServiceBooking( {...serviceBooking,[event.target.name]:event.target.value} );
    }

    const saveEntity = async ()=>{

      const data = await entitySave(serviceBooking);
      setIssubmitting( false );
      if( data?.cause !== undefined )
      {
          toast.error("Could not save "+entityName.toLowerCase()+": " + data?.cause);
      }
      else if( data?.entityCreated !== undefined )
      {
          toast.success( entityName + " added Successfully !",{
              onClose: (reason)=>{
                  setServiceBooking({ serviceid: "", subserviceid: "", serviceproviderid: "", name: "", email: "", phone: "", subject: "", message: "" });
              },
              autoClose: 3000
          } );
      }
      else
      {
          toast.info(data.message);
      }
    }

    const submitForm = (event)=>
    {
        event.preventDefault();
        setIssubmitting( true );
    }

    return (

        <>

            <main>
                <ToastContainer position='top-right' autoClose={3000} />        

                <section>
                    <div className={`${subDisp ? 'subDispHeading': 'breadCrumbUserView' }`}>
                        <span>{entityName}</span>
                    </div>
                </section>


                <section>

                    <BookServiceForm subDisp={subDisp} entity={serviceBooking} changeHandler={changeHandler} submitForm={submitForm} entity_id={entity_id ? entity_id:null} entity_name="Book Service"
                            optionsArr={services} subOptionsArr={subservices} serviceprovidersArr={serviceproviders} isDataLoading={isDataLoading} isSubmitting={isSubmitting} />

                </section>

            </main>

        </>

    )

}

export default BookService