
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getEntity } from "../service/blogService";
import { Box, CardMedia, Grid, Typography } from "@mui/material";
import BookService from "./BookService";
import Services from "./Services";
import '../user-views/user-view.css';
import { BASE_API_URL } from "../config/api-client";

const BlogView = () => {

    const [ blog,setBlog ] = useState({ title: "", filename: "",content: "" });
    const { blogId } = useParams();

    const imageUrl = `${BASE_API_URL}/uploads/blog-images/${blog.filename}`;

    useEffect(()=>
    {
        const fetchEntity = async() =>
        {
            if( blogId )
            {   
              try
              {
                  const data = await getEntity(blogId);
                  if( data?.cause !== undefined )
                  {
                      toast.error( "Error loading blog: " + data?.cause );
                  }
                  else if( data?.entityFetched !== undefined )
                  {
                      setBlog( data.entityFetched );
                  }
                  else
                  {
                      toast.info( "Blog to edit not found." );
                  }
              }
              catch(err)
              {
                  toast.error( "Error loading blog to edit : " + err.message );
              }
            }
        }

        fetchEntity();
    },[])

    return (
        <>
            <main>
                <ToastContainer position='top-right' autoClose={3000} />        

                <section>
                    <div className="breadCrumbUserView">
                        <span>{blog.title}</span>
                    </div>
                </section>

                <section>
                    <Grid 
                        container 
                        columnSpacing={{ xs: 0, md: 4, lg: 8 }} 
                        rowSpacing={4}
                        sx={{ 
                            mt: 6, 
                            minHeight: "70vh", 
                            px: { xs: 2, sm: 4, md: 6, lg: 8 },
                            width: '100%',
                            mx: 'auto' 
                        }}
                    >

                        <Grid 
                            size={{ xs: 12, sm: 12, md: 8 }} 
                            sx={{ 
                                p: { xs: 2, sm: 4 },
                                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
                                borderBottom: '1px solid rgba(0, 0, 0, 0.12)', 
                                mb: { xs: 4, md: 0 } 
                            }}
                        >
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, border: "1px solid rgba(0, 0, 0, 0.08)", borderRadius: 3, p: { xs: 2, sm: 3 } }}>
                                
                                <CardMedia 
                                    component="img" 
                                    image={imageUrl} 
                                    alt={blog.title}
                                    sx={{ width: "100%", maxHeight: "450px", objectFit: "cover", borderRadius: 2 }}
                                />

                                <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    {blog.title}
                                </Typography>

                                <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: "pre-line", lineHeight: 1.6, alignSelf: "flex-start" }}>
                                    {blog.content}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid 
                            size={{ xs: 12, sm: 12, md: 4 }}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}
                        >
                            <Box sx={{ width: '100%' }}>
                                <BookService subDisp={true} />
                                <Services subDisp={true} />
                            </Box>
                        </Grid>

                    </Grid>
                </section>
            </main>
        </>
    );

}

export default BlogView