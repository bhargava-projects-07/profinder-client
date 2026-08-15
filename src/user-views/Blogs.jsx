
import { useEffect, useState } from "react";
import { getEntitysList } from "../service/blogService.js";
import MUIBlogsDisplay from "./MUIBlogsDisplay.jsx";
import '../user-views/user-view.css';

const Blogs = () => {

    const [ blogs,setBlogs ] = useState( [] );
    const [ loading,setLoading ] = useState(true);

    const entityName = "Blogs Home";

    useEffect(()=>{
        const getRecordsList = async() =>{
            try
            {
                const data = await getEntitysList();
                setBlogs(data);
            }
            catch( error )
            {      
                toast.error( "Unable to Load Blogs: " + error.message )
            }
            finally
            {
                setLoading(false);
            }          
        }

        getRecordsList();
    },[]);

    if( loading ) return <p className='mt-5 text-center'>Loading Blogs...</p>

  return (

    <>
        <main>

                <section>
                    <div className="breadCrumbUserView">
                        <span>{entityName}</span>
                    </div>
                </section>

                <section>

                    <MUIBlogsDisplay blogs={blogs} />

                </section>

        </main>
    </>
    
  )
}

export default Blogs