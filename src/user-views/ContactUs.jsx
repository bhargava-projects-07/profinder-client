
import { Box, Grid, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { MUIButton, MUITextField } from "../components/MUIInputs";
import { useState } from "react";
import '../user-views/user-view.css';

const ContactUs = () => {

    const [ contact,setContact ] = useState( { name: "",email: "",phone: "", subject: "", message: "" } );

    const entityName = "Contact Us";

    const changeHandler = (event)=>{
      setContact( {...contact,[event.target.name]:event.target.value} );
    }
    const submitForm = (event)=>
    {
        event.preventDefault();
    }

    return (

        <>

            <main>

                <ToastContainer position='top-right' autoClose={3000} />        

                <section>
                    <div className="breadCrumbUserView">
                        <span>{entityName}</span>
                    </div>
                </section>

                <section>
                <Grid container spacing={4} sx={{ mt: 4, px: { xs: 2, sm: 4, md: 6 }, py: 2, alignItems: 'center' }}>
                    
                    <Grid size={{ xs: 12, lg: 6 }}>
                        <Box component="form" onSubmit={submitForm}>
                            <Grid container columnSpacing={3} rowSpacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <MUITextField required id="name" name="name" label="Your Name" value={contact.name} onChange={changeHandler} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <MUITextField required id="email" name="email" type="email" label="Email ID" value={contact.email} onChange={changeHandler} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <MUITextField required id="phone" name="phone" label="Phone" value={contact.phone} onChange={changeHandler} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <MUITextField required id="subject" name="subject" label="Subject" value={contact.subject} onChange={changeHandler} />
                            </Grid>
                            <Grid size={12}>
                                <MUITextField multiline rows={3} required id="message" name="message" label="Message" value={contact.message} onChange={changeHandler} />
                            </Grid>
                            <Grid size={12} sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                                <MUIButton type="submit" variant="contained" color="primary" size="large" btnlable="Mail Us" />
                            </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, lg: 6 }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: 'flex-start', sm: 'center' }, textAlign: { xs: 'left', sm: 'center' }, px: 2 }}>
                            <Box sx={{ mb: 1 }}>
                            <Typography variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                                Visit Us At:
                            </Typography>
                            </Box>
                            <Box>
                            <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' }, lineHeight: 1.5 }}>
                                Plot No. 42, 3rd Floor, Silicon Valley,<br />
                                Madhapur, Hyderabad,<br />
                                Telangana - 500081, India.
                            </Typography>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>

                <Grid container sx={{ mt: 4, px: { xs: 2, sm: 4, md: 6 }, py: 2, justifyContent: 'center' }}>

                    <Grid size={12}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: '100%' }}>

                        <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'darkblue' }}>We Are At</Typography>
                        </Box>

                        <Box 
                            sx={{ 
                            width: '100%', 
                            maxWidth: '760px',
                            height: { xs: '300px', sm: '450px' },
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #e0e0e0'
                            }}
                        >
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3256850465327!2d78.3821418749361!3d17.444119183452802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91ed2dea4c17%3A0xd49a55db035ba737!2sElearn%20Infotech!5e0!3m2!1sen!2sin!4v1786021053287!5m2!1sen!2sin" 
                                width="100%"
                                height="100%"
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="strict-origin-when-cross-origin"
                            />
                        </Box>

                        </Box>
                    </Grid>

                </Grid>
                </section>
                
            </main>

        </>
  )
}

export default ContactUs