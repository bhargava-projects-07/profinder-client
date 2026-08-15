
import { Box, Grid, Typography } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import RoomIcon from '@mui/icons-material/Room';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const reasons = [
  {
    icon: <VerifiedUserIcon sx={{ fontSize: 40, color: 'darkblue' }} />,
    title: 'Verified Professionals',
    description: 'Every single listed provider undergoes a strict background check and verification protocol.',
  },
  {
    icon: <RoomIcon sx={{ fontSize: 40, color: 'darkblue' }} />,
    title: 'Hyper-Local Search',
    description: 'Find top expert providers located nearest to your current tracking coordinates instantly.',
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 40, color: 'darkblue' }} />,
    title: '24/7 Priority Support',
    description: 'Our customer success dispatch team is standing by day or night to assist your bookings.',
  },
  {
    icon: <ThumbUpIcon sx={{ fontSize: 40, color: 'darkblue' }} />,
    title: 'Trusted Reviews',
    description: 'Browse authentic service logs and user testimonials before locking in your appointment.',
  },
];

const WhyChooseUs= ()=> {
  return (
    <Box sx={{ mx: '14px', my: 5, py: 4, px: 2, border: '2px solid darkblue', borderRadius: '8px', backgroundColor: '#ffffff' }}>
      
      {/* Section Header */}
      <Typography 
        variant="h4" 
        component="h2" 
        align="center"
        sx={{ fontWeight: 'bold', color: 'darkblue', mb: 5 }}
      >
        Why Choose ProFinder?
      </Typography>

      {/* 4-Column Layout */}
      {/* xs:12 stacks vertically on phones, md:6 splits into pairs on tablets, lg:3 creates 4 items side-by-side on desktop */}
      <Grid container spacing={4}>
        {reasons.map((item, index) => (
          <Grid size={{ xs: 12, md: 6, lg: 3 }} key={index}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center',
                px: 2 
              }}
            >
              {/* Icon Container with subtle blue backing highlight */}
              <Box 
                sx={{ 
                  mb: 2, 
                  p: 2, 
                  borderRadius: '50%', 
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {item.icon}
              </Box>

              {/* Title */}
              <Typography 
                variant="h6" 
                component="h3" 
                sx={{ fontWeight: 700, color: '#111111', mb: 1, fontSize: '1.15rem' }}
              >
                {item.title}
              </Typography>

              {/* Description Text */}
              <Typography 
                variant="body2" 
                sx={{ color: 'text.secondary', lineHeight: 1.6 }}
              >
                {item.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default WhyChooseUs;

