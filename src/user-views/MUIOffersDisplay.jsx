
import { Box, Typography  } from "@mui/material"

const MUIOffersDisplay = ({offers}) => {

  return (

    <>

        <Box sx={{ width: '100%', mx: 'auto', px: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 }, my: 4, display: 'flex', flexDirection: 'column', gap: { xs: 10, sm: 4, lg: 6 } }}>
        
            {
                offers.map((offer, index) =>
                {
                    const isEven = index % 2 === 0;

                    return (
                        <Box 
                            key={offer._id}
                            sx={{
                                display: 'flex',
                                flexDirection: isEven ? 'row' : 'row-reverse',
                                width: '100%',
                                alignItems: 'flex-start'
                            }}
                        >
                            <Box 
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: 1.5,
                                maxWidth: { xs: '100', sm: '75%' },
                                alignItems: isEven ? 'flex-start' : 'flex-end',
                                textAlign: isEven ? 'left' : 'right'
                            }}
                            >
                                <Box 
                                    sx={{ 
                                    bgcolor: '#f5f5f5', 
                                    border: '1px solid #e0e0e0', 
                                    borderRadius: '16px', 
                                    px: 2, 
                                    py: 0.5 
                                    }}
                                >
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#333' }}>
                                    {offer.title}
                                    </Typography>
                                </Box>

                                <Box 
                                    sx={{ 
                                        bgcolor: '#ffffff',
                                        p: 2, 
                                        borderRadius: '8px',
                                        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.04)',
                                        border: '1px solid #f0f0f0',
                                        fullWidth: true
                                    }}
                                >
                                    <Typography variant="body2" color="textSecondary">
                                        {offer.detail}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    )
                    
                })
            }
        
        </Box>

    </>

  )
}

export default MUIOffersDisplay