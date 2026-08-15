
import { Box, Grid, Typography } from "@mui/material";
import { Link as RouterLink, useParams } from 'react-router-dom';
import { getService } from "../service/servService.js";
import { useEffect, useState } from "react";
import '../user-views/user-view.css';

const SubServices = () => {

    const [ service,setService ] = useState(null);
    const [ subservices,setSubservices ] = useState([]);
    const [ loading,setLoading ] = useState(true);

    const { serviceid } = useParams();

    useEffect(()=>
    {
        const getServiceData = async() =>{
            try
            {
                const data = await getService(serviceid);
                setService( data?.entityFetched );
                setSubservices(data?.entitiesList);
            }
            catch( err )
            {      
                toast.error( "Unable to Load Sub-Services: " + err.message )
            }
            finally
            {
                setLoading(false);
            }          
        }

        getServiceData();
    },[])

    if( loading ) return <p className='mt-5 text-center'>Loading Sub Services...</p>

    return (

    <>
        <main>

            <section>
                <div className="breadCrumbUserView">
                    <span>{service?.name}</span>
                </div>
            </section>

            <section>
                <Box sx={{ mt:6, width: '100%',display: 'flex',flexDirection: 'column',alignItems: 'center' }}>
                    <Box sx={{ width: '100%',maxWidth: 1200,minWidth: 1200,bgcolor: '#E7FDFE', px:2, py: 3 }}>
                        <Typography variant="subtitle1">
                            {service?.description}
                        </Typography>
                    </Box>
                    <Box sx={{ width: '100%',maxWidth: 1200,mt: 4 }}>
                        <Grid container columnSpacing={3} rowSpacing={4} sx={{ maxWidth: 1200, width: '100%' }}>

                            {
                                subservices.map((subservice,index)=>(
                                    <Grid key={index} size={{ xs: 6, sm: 3 }}>
                                        <Box component={RouterLink} to={`/subservice/${subservice._id}`} sx={{
                                                display: 'block',
                                                bgcolor: '#63F0F8',
                                                p: 3, 
                                                borderRadius: '8px',
                                                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.1)',
                                                border: '1px solid #27EBF5',
                                                textAlign: 'center',
                                                textDecoration: 'none',color: 'inherit',cursor: 'pointer'
                                        }}>
                                            <Typography variant="h5">
                                                {subservice.name}
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

export default SubServices