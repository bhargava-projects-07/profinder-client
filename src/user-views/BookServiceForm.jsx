
import { Backdrop, Box, CircularProgress, Grid  } from '@mui/material';
import { MUIButton, MUIFormField, MUISelect, MUITextField } from '../components/MUIInputs';
import MUISpinnerOne from '../components/MUISpinnerOne';

const BookServiceForm = ({ subDisp, entity, changeHandler, submitForm, entity_id,entity_name,
    optionsArr,subOptionsArr,serviceprovidersArr,isDataLoading,isSubmitting }) => {

    const btnLable = entity_id ? `Update ${entity_name}` : `${entity_name}`;

    const gridDisp = subDisp ? { xs: 12, sm: 6, md: 12 } : { xs: 12, sm: 6 };

    return (
    <Box 
            sx={{ 
                position: 'relative',
                mt: 6, 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'center' 
            }}
        >

        <Box
            component="form" 
            onSubmit={submitForm} 
            noValidate 
            sx={{  width: '100%', maxWidth: 520,px: { xs: 2, sm: 0 } }}
            >

                <Grid container columnSpacing={3} rowSpacing={2} sx={{ maxWidth: 520, width: '100%' }}>

                    <Grid size={gridDisp}>

                        <MUIFormField >
                            <MUISelect required id="serviceid" name="serviceid" label="Select Service" labelId="services-label"
                                value={entity.serviceid} onChange={changeHandler} options={optionsArr} />
                        </MUIFormField>

                    </Grid>
                    <Grid size={gridDisp}>

                        <MUIFormField >
                            <MUISelect required id="subserviceid" name="subserviceid" label="Select Sub Service" labelId="sub-services-label"
                                value={entity.subserviceid} onChange={changeHandler} options={subOptionsArr} />
                        </MUIFormField>

                    </Grid>

                    <Grid size={gridDisp}>

                        <MUIFormField >
                            <MUISelect required id="serviceproviderid" name="serviceproviderid" label="Select Service Provider" labelId="service-provider-label"
                                value={entity.serviceproviderid} onChange={changeHandler} options={serviceprovidersArr} />
                        </MUIFormField>

                    </Grid>
                    <Grid size={gridDisp}>
                        <MUIFormField >
                            <MUITextField required id="name" name="name" label="Your Name"
                                value={entity.name} onChange={changeHandler} />
                        </MUIFormField>

                    </Grid>

                    <Grid size={gridDisp}>
                        <MUIFormField >
                            <MUITextField required id="email" type='email' name="email" label="Email"
                                value={entity.email} onChange={changeHandler} />
                        </MUIFormField>

                    </Grid>
                    <Grid size={gridDisp}>
                        <MUIFormField >
                            <MUITextField required id="phone" name="phone" label="Phone"
                                value={entity.phone} onChange={changeHandler} />
                        </MUIFormField>

                    </Grid>

                    <Grid size={gridDisp}>
                        <MUIFormField >
                            <MUITextField required id="subject" name="subject" label="Subject"
                                value={entity.subject} onChange={changeHandler}></MUITextField>
                        </MUIFormField>

                    </Grid>

                    <Grid size={12}>
                        <MUIFormField >
                            <MUITextField multiline rows={3} required id="message" name="message" label="Message"
                                value={entity.message} onChange={changeHandler}></MUITextField>
                        </MUIFormField>

                    </Grid>

                    <Grid size={12} sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <MUIButton type="submit" variant="contained" color="primary" size="large" btnlable={btnLable} disabled={isSubmitting}
                          startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}  />
                    </Grid>

                </Grid>

        </Box>

        <Backdrop
            sx={{ 
                position: 'absolute',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                color: '#1976d2',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(1px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
            open={isDataLoading}
        >
            <MUISpinnerOne />
        </Backdrop>        

    </Box>
   
  )

}

export default BookServiceForm