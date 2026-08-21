
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getEntity, entitySave, entityUpdate } from "../service/blogService.js";

import './dashboard.css';
import BlogForm from "./BlogForm.jsx";

const Blog = () => {
  
    const [entity,setEntity] = useState({
    title:"" , content:"" });
    const [blogimage, setBlogimage] = useState(null);
    const blogImageInputRef = useRef();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { entity_id } = useParams();
    const entityName = "Blog";

    const navigate = useNavigate();

    useEffect(()=>
    {
        const fetchEntity = async() =>
        {
            if( entity_id )
            {   
              try
              {
                  const data = await getEntity(entity_id);
                  if( data?.cause !== undefined )
                  {
                      toast.error( "Error loading blog: " + data?.cause );
                  }
                  else if( data?.entityFetched !== undefined )
                  {
                      setEntity( data.entityFetched );
                      setBlogimage( data.entityFetched.filename );
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

    useEffect(() => {
        if( ! entity_id )
        {
            setEntity({
                title:"" , content:"" });
            setBlogimage(null);
            blogImageInputRef.current.value = "";
        }
    }, [entity_id]);    

    const fileHandler = (event) => {
        setBlogimage(event.target.files[0] ? event.target.files[0] : null);
    };

    const changeHandler = (event)=>{
      setEntity( {...entity,[event.target.name]:event.target.value} );
    }

    const setUpFormData = ()=>
    {
        const formData = new FormData();

        formData.append("blogimage", blogimage); 
        
        formData.append( "title",entity.title );
        formData.append( "content",entity.content );

        return formData;
    }

    const saveEntity = async ()=>{

      const imageData = setUpFormData();
      const data = await entitySave(imageData);
      setIsSubmitting( false );
      if( data?.cause !== undefined )
      {
          toast.error("Could not save "+entityName.toLowerCase()+": " + data?.cause);
      }
      else if( data?.entityCreated !== undefined )
      {
          toast.success( entityName + " added Successfully !",{
              onClose: (reason)=>{
              setEntity({
                    title:"" , content:"" });
              setBlogimage(null);
              blogImageInputRef.current.value = "";
              },
              autoClose: 3000
          } );
      }
      else
      {
          toast.info(data.message);
      }
    }

    const updateEntity = async() =>
    {
        try
        {
            const result = await entityUpdate(entity_id,entity);
            setIsSubmitting( false );
            const successMsg = result?.message || "Blog updated successfully!";
            const isUpdated = result?.updated;
            notifyUpd(successMsg,isUpdated,result);
        }
        catch(err)
        {
            toast.error( "Could not update Blog : " + err.message );
        }
    }
    const notifyUpd= ( apiMessage,isUpdated,result )=>
    {
      if( result?.cause !== undefined )
      {
        toast.error("Could not update blog: " + result?.cause);
      }
      else if( isUpdated !== undefined && ! isUpdated )
      {
          toast.info(apiMessage, {
              onClose: (reason)=>{
                  navigate("/admindashboard/delete-blogs");
              },
              autoClose: 3000
          });
      }
      else if( result?.putResult )
      {
          toast.error(apiMessage, {
              onClose: (reason) => {
                  navigate("/admindashboard/delete-blogs");
              },
              autoClose: 3000
          });
      }
      else
      {
          toast.success(apiMessage, {
              onClose: (reason) => {
                  navigate("/admindashboard/delete-blogs");
              },
              autoClose: 3000
          });
      }
    }

    const submitForm = (event)=>
    {
        event.preventDefault();
        setIsSubmitting(true);

        if( entity_id )
        {
            updateEntity();
        }
        else
        {
            saveEntity();
        }
    }

  return (

    <>

      <main>
            <ToastContainer position='top-right' autoClose={3000} />        

            {/* View Breadcrumb */}
            <section className="mt-2">
                <div className="breadCrumbDivAdmin">
                      <span>{entity_id ? 'Edit' : 'Add'}&nbsp;{entityName}</span>
                </div>
            </section>

            <section className='mt-2 ps-13'>

              <BlogForm entity={entity} blogImageInputRef={blogImageInputRef} changeHandler={changeHandler} fileHandler={fileHandler} submitForm={submitForm} entity_id={entity_id ? entity_id:null} entity_name="Blog" isSubmitting={isSubmitting} />

            </section>

      </main>

    </>

  )
}

export default Blog