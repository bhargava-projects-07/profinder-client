
import { Box, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { getEntitysList } from "../service/servService";
import { useEffect, useState } from "react";

const ServicesHome = ({subDisp}) => {
    const [ services,setServices ] = useState([]);
    const [ loading,setLoading ] = useState(true);

    const entityName = `${subDisp ? 'Our':''} Services`;
    const serviceStyling = subDisp ? { fontWeight: 'bold', color: 'darkcyan' } : {};

    useEffect(()=>
    {
        const getServiceOptions = async() =>{
            try
            {
                const data = await getEntitysList();
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

      if( loading ) return <p className='mt-5 text-center'>Loading Services...</p>

    return (

    <>
        <main className={`${subDisp ? 'mt-8': '' }`}>

            <section>
                <div className={`${subDisp ? 'subDispHeading': 'breadCrumbUserView' }`}>
                    <span>{entityName}</span>
                </div>
            </section>

            <section>
                <Box sx={{ mt:6, width: '100%',display: 'flex',flexDirection: 'row',justifyContent: 'center' }}>
                    <Box sx={{ width: '100%',maxWidth: 1200,px: { xs: 2, sm: 2, md: 2, lg: 0 }, mb: 2 }}>
                        <Grid container columnSpacing={3} rowSpacing={4} sx={{ maxWidth: 1200, width: '100%' }}>

                            {
                                services.map((service,index)=>(
                                    <Grid key={index} size={ ! subDisp ?  {xs: 12, sm: 6, md: 4, lg: 3} : { xs: 12 } }>
                                        <Box component={RouterLink} to={`/service/${service._id}`} sx={{
                                                display: 'block',
                                                p: 3, 
                                                borderRadius:'8px',
                                                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.4), 0px 1px 3px rgba(0, 0, 0, 0.5)',
                                                border: '1px solid #63F0F8',
                                                textAlign: 'center',
                                                textDecoration: 'none',color: 'inherit',cursor: 'pointer'
                                        }}>
                                            <Typography variant="h5" sx={ serviceStyling }>
                                                {service.name}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))
                            }

                        </Grid>

                    </Box>
                </Box>
            </section>

        </main>
    </>


  )
}

export default ServicesHome