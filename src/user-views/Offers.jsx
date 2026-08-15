
import { useEffect, useState } from "react";
import { getEntitysList } from '../service/OfferService.js';
import MUIOffersDisplay from "./MUIOffersDisplay.jsx";
import '../user-views/user-view.css';

const Offers = () => {

    const [offers,setOffers] = useState([]);
    const [ loading,setLoading ] = useState(true);

    const entityName = "Offers Listing";

    useEffect(()=>{
        const getRecordsList = async() =>{
            try
            {
                const data = await getEntitysList();
                setOffers(data);
            }
            catch( error )
            {      
                toast.error( "Unable to Load Offers: " + error.message )
            }
            finally
            {
                setLoading(false);
            }          
        }

        getRecordsList();
    },[]);

    if( loading ) return <p className='mt-5 text-center'>Loading Offers List...</p>

 return (

    <>
        <main>

                <section>
                    <div className="breadCrumbUserView">
                        <span>{entityName}</span>
                    </div>
                </section>

                <section>

                    <MUIOffersDisplay offers={offers} />

                </section>

        </main>
    </>
    
  )
}

export default Offers