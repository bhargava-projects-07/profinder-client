
import { useState, useEffect } from 'react';

import { getEntitysList } from '../service/OfferService.js';

import { Box, Typography, Button, MobileStepper, CircularProgress } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const OffersCarousel = () => {
  const [offers, setOffers] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  const maxSteps = offers.length;

  useEffect(() => {
    if (maxSteps === 0) return;
    const timer = setInterval(() => {
      setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
    }, 6000);
    return () => clearInterval(timer);
  }, [maxSteps]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '240px' }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (maxSteps === 0) return null;

  return (
    <Box sx={{ mx: '14px', position: 'relative', overflow: 'hidden', my: 3 }}>
      
      <Box
        sx={{
          minHeight: { xs: '140px', sm: '160px' },
          width: '100%',
          backgroundColor: 'darkblue', // Base corporate background tone
          background: 'linear-gradient(135deg, #00008b 0%, #1976d2 100%)',
          color: '#ffffff',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 4, md: 8 },
          py: 3,
          position: 'relative'
        }}
      >
        
        <LocalOfferIcon 
          sx={{ 
            position: 'absolute', 
            right: '5%', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            fontSize: { xs: '80px', sm: '110px' }, 
            opacity: 0.08,
            color: '#ffffff'
          }} 
        />

        {/* Live Database Driven Content Block */}
        <Box sx={{ maxWidth: { xs: '85%', sm: '75%' }, zIndex: 2 }}>
          
          {/* Offer Title */}
          <Typography
            variant="h5"
            component="h3"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.25rem', sm: '1.6rem' },
              color: '#ffd700', // Gold tone accent for immediate conversion impact
              mb: 1,
              letterSpacing: '0.5px'
            }}
          >
            {offers[activeStep].title}
          </Typography>

          {/* Offer Description */}
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: { xs: '0.9rem', sm: '1.05rem' }, 
              opacity: 0.95,
              lineHeight: 1.5
            }}
          >
            {offers[activeStep].description}
          </Typography>

        </Box>
      </Box>

      {/* Slide Navigation Controls */}
      {maxSteps > 1 && (
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            position: 'absolute',
            bottom: 12,
            left: 0,
            right: 0,
            background: 'transparent',
            zIndex: 3,
            justifyContent: 'center',
            '& .MuiMobileStepper-dot': { backgroundColor: 'rgba(255,255,255,0.3)', mx: 0.5 },
            '& .MuiMobileStepper-dotActive': { backgroundColor: '#ffd700', transform: 'scale(1.2)' },
          }}
          nextButton={
            <Button size="small" onClick={handleNext} sx={{ color: '#ffffff', position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', minWidth: 36, height: 36, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}>
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} sx={{ color: '#ffffff', position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', minWidth: 36, height: 36, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}>
              <KeyboardArrowLeft />
            </Button>
          }
        />
      )}
    </Box>
  );
}

export default OffersCarousel;