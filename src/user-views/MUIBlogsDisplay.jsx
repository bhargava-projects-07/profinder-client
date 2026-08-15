
import { Box, Container, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


import '../user-views/user-view.css';
import { BASE_API_URL } from "../config/api-client";

const MUIBlogsDisplay = ({ blogs }) => {

  const mainWrapperDesign = {
    mt: 6,
    width: "100%",
    maxWidth: 1300,
    minHeight: "70vh",
    bgcolor: "background.paper",
    borderRadius: 3,
    p: 4,

    boxShadow: "0px 0px 25px rgba(159, 245, 159, 0.5)",
    
    mb: 2
  };

  return (
      <Container >

        <Box sx={mainWrapperDesign}>
          <Grid container spacing={3}>
            {blogs.map((blog) => (
              <Grid size={{ xs: 12, sm: 4 }} key={blog._id}>
                <BlogCard blog={blog} backendUrl={BASE_API_URL} />
              </Grid>
            ))}
          </Grid>
        </Box>

      </Container>
  );
};

const BlogCard = ({ blog, backendUrl }) => {

    const navigate = useNavigate();
    const goToBlog = (blogId)=>{
        navigate(`/blog-view/${blogId}`);
    }

  const content = blog.content || ""; 
  const isLongContent = content.length > 150;

  const displayedText = `${content.substring(0, 150)}${isLongContent ? "..." : ""}`;  

  const imageUrl = `${backendUrl}uploads/blog-images/${blog.filename}`;

  return (
    <Card sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: 2,

        border: "1px solid rgba(0, 0, 0, 0.12)",
      
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.12)"      
    }}>
      
      <CardContent sx={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: 'center',
        gap: 1.5, 
        flexGrow: 1,

        p: 2.5
      }}>
        <CardMedia
            component="img"
            image={imageUrl}
            alt={blog.title}
            sx={{ 
            width: "300px",
            height: "160px",
            objectFit: "cover",
            bgcolor: "#f5f5f5"
            }}
        />

        <Typography variant="h6" component="h2" sx={{ fontWeight: "700", fontSize: "1.1rem", lineHeight: 1.3 }}>
          {blog.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '320px',overflow: 'auto',whiteSpace: "pre-line", lineHeight: 1.5 }}>
          {displayedText}
        </Typography>

          <Button variant="contained" sx={{ mt: "auto" }}
          onClick={() => goToBlog(blog._id)} >Read More</Button>
      </CardContent>
    </Card>
  );
};

export default MUIBlogsDisplay;
