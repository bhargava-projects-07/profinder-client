
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

            <Box sx={{ mt: { xs: 3, sm: 5 }, mb: 4, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', px: { xs: 2, sm: 4, md: 6 } }}>

                {/* Subservice Description Banner Box */}
                {/* Fixed minWidth break conflict by replacing it with percentage based fluid dimensions */}
                <Box 
                    sx={{ 
                    width: '100%', 
                    maxWidth: 1200, 
                    background: 'linear-gradient(135deg, #63F0F8 0%, #a2f7fc 100%)', 
                    px: 3, 
                    py: 2.5, 
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 500, color: 'rgba(0, 0, 0, 0.75)' }}>
                    {subservice?.description || "Explore available service providers below."}
                    </Typography>
                </Box>

                {/* Core Service Providers Grid Section */}
                <Box sx={{ width: '100%', maxWidth: 1200, mt: 4 }}>
                    {/* Centered cards using 'justifyContent' and removed layout size duplication restrictions */}
                    <Grid container spacing={{ xs: 3, sm: 4 }} justifyContent="center" sx={{ width: '100%', margin: 0 }}>
                    {
                        serviceproviders.map((serviceprovider, index) => (
                        /* Card Breakpoint Allocation: 
                            xs:12 (Full width on Mobile)
                            md:6  (Side-by-side pairs on Tablets/Laptops)
                            lg:6  (Clean, balanced layout inside your max-1200 container) */
                        <Grid key={index} size={{ xs: 12, lg: 6 }} sx={{ display: 'flex' }}>
                            
                            <Card 
                                variant="outlined"
                                sx={{ 
                                    borderRadius: 4, 
                                    width: '100%', 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                    border: '1px solid rgba(0, 0, 0, 0.08)'
                            }}
                            >

                                {/* Header */}
                                <CardHeader
                                    title={
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
                                            {serviceprovider.businessname}
                                        </Typography>
                                    }
                                    sx={{ 
                                        bgcolor: 'rgba(39, 101, 245, 0.08)', 
                                        textAlign: 'center',
                                        borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                                    }}
                                />

                                {/* Content Section */}
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>

                                    <Grid container spacing={2} sx={{ width: '100%', margin: 0, height: '100%' }}>
                                    
                                        {/* Info details column blocks */}
                                        <Grid size={{ xs: 12, sm: 8 }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                            
                                            <Typography variant="body1">
                                                <span className="font-bold text-gray-700">Provider:</span> {serviceprovider.name}
                                            </Typography>

                                            {/* Contact Subrow - Stacks seamlessly on ultra-small mobile screens */}
                                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 3 } }}>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                <span className="font-semibold text-gray-800">Phone:</span> {serviceprovider.phone}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary', wordBreak: 'break-word' }}>
                                                <span className="font-semibold text-gray-800">Email:</span> {serviceprovider.email}
                                                </Typography>
                                            </Box>

                                            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', color: 'text.secondary', mt: 1 }}>
                                                <span className="font-semibold text-gray-800">Address:</span><br />
                                                {serviceprovider.address}
                                            </Typography>
                                            </Box>
                                        </Grid>

                                        {/* Button Action Block column wrapper */}
                                        {/* xs:12 on mobile pushes button full width below text content block */}
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <Box 
                                            sx={{ 
                                                display: 'flex', 
                                                flexDirection: 'column', 
                                                justifyContent: 'center', 
                                                alignItems: { xs: 'stretch', sm: 'center' }, 
                                                width: '100%', 
                                                height: '100%',
                                                pt: { xs: 2, sm: 0 }
                                            }}
                                            >
                                            <Button 
                                                variant="contained" 
                                                color="primary"
                                                fullWidth
                                                onClick={() => { loadBookService(serviceprovider) }}
                                                sx={{ 
                                                textTransform: 'none', 
                                                fontWeight: 'bold',
                                                borderRadius: '8px',
                                                px: 3,
                                                py: 1
                                                }}
                                            >
                                                Book Service
                                            </Button>
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

    );

}

export default ServiceProviderBox;
