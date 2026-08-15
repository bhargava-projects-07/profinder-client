
import { Box, Grid, Typography } from "@mui/material";
import { BACKEND_URL } from "../constants/server-urls";

export default function AboutUs() {
  return (
    <Box 
      sx={{ 
        mx: '14px', 
        my: 4, 
        bgcolor: 'background.paper', 
        border: "1px solid rgba(0, 0, 0, 0.08)", 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 5px 3px rgba(0, 0, 0, 0.08)', 
        borderRadius: '8px', 
        overflow: 'hidden' 
      }}
    >
      <Grid container sx={{ width: '100%' }}>
        
        <Grid 
          size={{ xs: 12, sm: 4 }} 
          sx={{ 
            position: 'relative', 
            minHeight: { xs: '240px', sm: '260px' }, // Slightly shorter height on mobile
            p: 3,
            // Centers the container coordinate grid on mobile devices
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'flex-start' }
          }}
        >
          <Box
            component="img"
            src={`${BACKEND_URL}uploads/services-1.avif`}
            alt="ProFinder Business Base"
            sx={{
              width: '140px',
              height: '140px',
              objectFit: 'cover',
              border: '2px solid #1976d2',
              borderRadius: '4px',
              position: 'absolute',
              top: '20px',
              // Centered on mobile, shifted right closer to content on desktop monitors
              left: { xs: 'calc(50% - 90px)', sm: '50px', md: '120px', lg: '270px' },
              zIndex: 1,
            }}
          />

          {/* Overlapping Image */}
          <Box
            component="img"
            src={`${BACKEND_URL}uploads/painting-1.jpg`}
            alt="ProFinder Service Team"
            sx={{
              width: '140px',
              height: '150px',
              objectFit: 'cover',
              border: '2px solid darkblue',
              borderRadius: '4px',
              position: 'absolute',
              top: '90px',
              // Steps perfectly to the right relative to the base image on all sizes
              left: { xs: 'calc(50% - 40px)', sm: '100px', md: '170px', lg: '320px' },
              zIndex: 2,
              backgroundColor: '#ffffff',
              boxShadow: '4px 4px 10px rgba(0,0,0,0.15)'
            }}
          />
        </Grid>
        
        {/* TEXT CONTENT COLUMN */}
        <Grid 
          size={{ xs: 12, sm: 8 }} 
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center' 
          }}
        >
          {/* Section Title */}
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold', 
              color: 'darkblue', 
              mb: 2,
              textAlign: { xs: 'center', sm: 'left' } // Center header on stacked mobile layouts
            }}
          >
            About Us
          </Typography>

          {/* Paragraph Text */}
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary', 
              lineHeight: 1.7, 
              textAlign: 'justify' 
            }}
          >
            ProFinder is your ultimate local business directory, designed to connect you with trusted local service providers instantly. Our platform acts as a bridge between everyday consumers and verified experts, ranging from home maintenance technicians to medical professionals. By combining real-time search filters with localized business mappings, we ensure that finding local help is always quick, reliable, and hassle-free.
          </Typography>
        </Grid>

      </Grid>
    </Box>
  );
}
