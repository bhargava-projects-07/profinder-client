
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ServiceProviderBox = ({ serviceproviders,subservice }) => {

    const navigate = useNavigate();
    const loadBookService = (serviceprovider)=>{
        const serviceSelection = {
            serviceid: serviceprovider.serviceid,
            subserviceid: serviceprovider.subserviceid,
            serviceproviderid: serviceprovider._id
        }
        navigate( "/book-service",{ state:serviceSelection } );
    }

 return (

    <>

        <Box sx={{ mt:6, width: '100%',display: 'flex',flexDirection: 'column',alignItems: 'center' }}>
            <Box sx={{ width: '100%',maxWidth: 1200,minWidth: 1200,bgcolor: '#63F0F8', px:2, py: 3 }}>
                <Typography variant="subtitle1">
                    {subservice?.description}
                </Typography>
            </Box>
            <Box sx={{ width: '100%',maxWidth: 1200,mt: 4 }}>
                <Grid container columnSpacing={3} rowSpacing={4} sx={{ maxWidth: 1200, width: '100%' }}>

                    {
                        serviceproviders.map((serviceprovider,index)=>(
                            <Grid key={index} size={{ xs: 12, sm: 8 }}>

                                <Card variant="outlined"
                                    sx={{ borderRadius: 4 }}>

                                    <CardHeader
                                        title={
                                            <Typography variant="h5">
                                                { serviceprovider.businessname }
                                            </Typography>                                                    
                                        }
                                        sx={{ bgcolor: '#2765f542',textAlign: 'center' }}>
                                    </CardHeader>

                                    <CardContent>

                                        <Grid container>
                                            <Grid size={8}>

                                                <Box sx={{ display:'flex',flexDirection: 'column',gap: 1 }}>

                                                        <Box>
                                                            <Typography variant="subtitle1">
                                                                <span className="font-bold">Service Provider Name:</span>&nbsp;{ serviceprovider.name }
                                                            </Typography>
                                                        </Box>


                                                        <Box sx={{ display: 'flex',flexDirection: 'row',gap: 4 }}>
                                                            <Box>
                                                                <Typography variant="subtitle1">
                                                                    { serviceprovider.phone }
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography variant="subtitle1">
                                                                    { serviceprovider.email }
                                                                </Typography>
                                                            </Box>
                                                        </Box>

                                                        <Box>
                                                            <Typography variant="subtitle1" sx={{ whiteSpace: 'pre-wrap' }}>
                                                                { serviceprovider.address }
                                                            </Typography>
                                                        </Box>

                                                </Box>

                                            </Grid>
                                            <Grid size={4}>
                                                <Box sx={{ display:'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center', width: '100%',height: '100%' }}>
                                                        <Button variant="outlined" onClick={()=>{loadBookService(serviceprovider)}}>Book Service</Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        
                                    </CardContent>

                                </Card>

                            </Grid>
                        ))
                    }

                </Grid>

            </Box>
        </Box>

    </>
   
  )
}

export default ServiceProviderBox