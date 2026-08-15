
import { Box, Typography  } from "@mui/material"

const MUIOffersDisplay = ({offers}) => {

  return (

    <>

        <Box sx={{ width: '100%', mx: 'auto', px: { xs: 6, sm: 12 }, my: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
        
            {
                offers.map((offer, index) =>
                {
                    const isEven = index % 2 === 0;

                    return (
                        <Box 
                            key={offer._id}
                            sx={{
                            display: 'flex',
                            /* 2. Alternates row alignment layout path sequence */
                            flexDirection: isEven ? 'row' : 'row-reverse',
                            width: '100%',
                            alignItems: 'flex-start'
                            }}
                        >
                            {/* Offer content section wrapper column block */}
                            <Box 
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                gap: 1.5,
                                maxWidth: '75%', // Prevents text stretching completely edge to edge
                                /* 3. Aligns the text left or right inside its row layout box context */
                                alignItems: isEven ? 'flex-start' : 'flex-end',
                                textAlign: isEven ? 'left' : 'right'
                            }}
                            >
                            {/* Title: Rounded border with a light grey background style */}
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

                            {/* Detail: Light box shadow style container panel */}
                            <Box 
                                sx={{ 
                                bgcolor: '#ffffff',
                                p: 2, 
                                borderRadius: '8px',
                                /* 4. Applied a clean light box shadow styling rule */
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