
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import '../Admin-Dashboard/dashboard.css';

import UserRegistrationForm from "./UserRegistrationForm.jsx";
import { entitySave } from "../service/userService.js";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [user,setUser] = useState({
    usertype: "admin", name: "", email: "", password: "", phone: "", address: "" });

    const entityName = "Registration";
    const navigate = useNavigate();

    const changeHandler = (event)=>{
      setUser( {... user,[event.target.name]:event.target.value} );
    }

    const saveEntity = async ()=>{

      const data = await entitySave(user);
      if( data?.cause !== undefined )
      {
          toast.error("Could not save admin : " + data?.cause);
      }
      else if( data?.userCreated !== undefined )
      {
          toast.success( "Admin Registered Successfully !",{
              onClose: (reason)=>{
              setUser({
                    usertype: "admin", name: "", email: "", password: "", phone: "", address: "" });
              },
              autoClose: 3000
          } );
      }
      else
      {
          toast.info(data.message);
      }
    }

    const submitForm = (event)=>
    {
        event.preventDefault();

        saveEntity();
    }

    const cancelReg = ()=>{
      navigate('/admin-login')
    }

  return (

    <>

      <main>
            <ToastContainer position='top-right' autoClose={3000} />        

            <section className="mt-2">
                <div className="breadCrumbDivAdmin">
                      <span>{entityName}</span>
                </div>
            </section>

            <section className='mt-2 ps-13'>

        <div className="grid grid-cols-2">

            <div className="flex flex-row justify-center items-center">
                <img src="/login/registration-1.jpg" alt="Admin Registration"/>
            </div>

            <div className="flex flex-col mt-4 items-center">

              <UserRegistrationForm entity={user} changeHandler={changeHandler} submitForm={submitForm} cancelReg={cancelReg} />

            </div>

        </div>

            </section>

      </main>

    </>

  )
}

export default User;
