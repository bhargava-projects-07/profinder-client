
import { useState, useEffect } from 'react';
import { Box, Typography, Button, MobileStepper  } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../config/api-client';

const carouselItems = [
  {
    title: 'Find Top-Rated Local Experts',
    description: 'Connect with certified plumbers, electricians, and technicians in your area instantly.',
    buttonText: 'Explore Services',
    buttonClick: 'services',
    imageUrl: `${BASE_API_URL}/uploads/carousel/electrician-1.avif`,
  },
  {
    title: 'Get Things Fixed Fast',
    description: 'Verified home maintenance, appliance repair, and cleaning services right at your doorstep.',
    buttonText: 'Book Repairman',
    buttonClick: 'book-service',
    imageUrl: `${BASE_API_URL}/uploads/carousel/plumber-1.avif`,
  },
  {
    title: 'Grow Your Local Business',
    description: 'List your services on ProFinder today and reach thousands of daily local customers.',
    buttonText: 'Join as a Partner',
    buttonClick: 'contact-us',
    imageUrl: `${BASE_API_URL}/uploads/carousel/local-business-partner.avif`,
  },
];

const HeroCarousel = ()=> {

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = carouselItems.length;

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
    }, 5000);
    return () => clearInterval(timer);
  }, [maxSteps]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  const goToTarget = (page)=>{
    navigate( `/${page}` );
  }
  return (

    <Box sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
      <Box
        sx={{
          height: { xs: '320px', sm: '400px', md: '480px' },
          width: '100%',
          position: 'relative',
          backgroundImage: `url(${carouselItems[activeStep].imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.5s ease-in-out',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 100%)',
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            color: '#ffffff',
            px: { xs: 4, md: 8 },
            maxWidth: { xs: '100%', sm: '550px', md: '700px' },
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3.25rem' },
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            {carouselItems[activeStep].title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.95rem', sm: '1.1rem' },
              mb: 4,
              opacity: 0.9,
            }}
          >
            {carouselItems[activeStep].description}
          </Typography>
          <Button
            variant="contained"
            size="large"
            disableElevation
            onClick={()=>goToTarget(carouselItems[activeStep].buttonClick)}
            sx={{
              backgroundColor: '#1976d2',
              fontWeight: 'bold',
              textTransform: 'none',
              px: 4,
              py: 1.2,
              borderRadius: '8px',
              '&:hover': { backgroundColor: '#115293' },
            }}
          >
            {carouselItems[activeStep].buttonText}
          </Button>
        </Box>
      </Box>

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 0,
          right: 0,
          background: 'transparent',
          zIndex: 3,
          justifyContent: 'center',
          '& .MuiMobileStepper-dot': {
            backgroundColor: 'rgba(255,255,255,0.4)',
            mx: 0.75,
            width: 10,
            height: 10,
          },
          '& .MuiMobileStepper-dotActive': {
            backgroundColor: '#ffffff',
            transform: 'scale(1.2)',
          },
        }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            sx={{
              color: '#ffffff',
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-200px)',
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: '50%',
              minWidth: 44,
              height: 44,
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
            }}
          >
            <KeyboardArrowRight fontSize="medium" />
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            sx={{
              color: '#ffffff',
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-200px)',
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: '50%',
              minWidth: 44,
              height: 44,
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
            }}
          >
            <KeyboardArrowLeft fontSize="medium" />
          </Button>
        }
      />
    </Box>
  );

}

export default HeroCarousel;

