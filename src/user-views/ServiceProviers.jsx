
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getSubService } from "../service/subServService";
import ServiceProviderBox from './ServiceProviderBox';
import '../user-views/user-view.css';

const ServiceProviders = () => {

    const [ subservice,setSubservice ] = useState(null);
    const [ serviceproviders,setServiceproviders ] = useState([]);
    const [ loading,setLoading ] = useState(true);

    const { subserviceid } = useParams();

    useEffect(()=>
    {
        const getServiceData = async() =>{
            try
            {
                const data = await getSubService(subserviceid);
                setSubservice( data?.entityFetched );
                setServiceproviders(data?.entitiesList);
            }
            catch( err )
            {      
                toast.error( "Unable to Load Service-Providers: " + err.message )
            }
            finally
            {
                setLoading(false);
            }          
        }

        getServiceData();
    },[])

    if( loading ) return <p className='mt-5 text-center'>Loading Service Providers...</p>

    return (

    <>
        <main>

            <section>
                <div className="breadCrumbUserView">
                    <span>{subservice?.name}</span>
                </div>
            </section>

            <section>
                <ServiceProviderBox serviceproviders={serviceproviders} subservice={subservice} />
            </section>

        </main>
    </>


  )
}

export default ServiceProviders