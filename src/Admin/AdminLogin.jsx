
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { checkLogin } from '../service/loginService.js';
import { useAuth } from "../context/AuthContext.jsx";

const AdminLogin = () => {

    const { token,login } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const [user,setUser] = useState({
    email: "", password: "" });

    const changeHandler = (event)=>{
      setUser( {...user,[event.target.name]:event.target.value} )
    }

    const loginCheck = async ()=>{
        const data = await checkLogin(user);
        setIsSubmitting( false );
        if( data?.cause !== undefined )
        {
            toast.error("Could not check login: " + data?.cause);
        }
        else if( data?.userNotFound !== undefined )
        {
            toast.info("Invalid email.");
        }
        else if( data?.passwordMismatch !== undefined )
        {
            toast.info("Invalid password.");
        }
        else
        {
            toast.success( "Login Successful !",{
                onClose: (reason)=>{
                    login( data?.token,data?.userFetched );
                },
                autoClose: 3000
            } );
        }
    }

    const submitLogin = (event)=>
    {
        event.preventDefault();
        setIsSubmitting(true);
    } 

    useEffect(()=>
    {
        if( isSubmitting )
        {
            loginCheck();
        }
    },[isSubmitting]);

    useEffect(()=>{
    if( token )
    {
        navigate("/admindashboard");
    }
    },[]);

  return (

    <main>
        <ToastContainer position='top-right' autoClose={3000} />

        <div className="grid grid-cols-2">

            <div className="flex flex-row justify-center items-center">
                <img src="/login/login-3.JPG" />
            </div>

            <div className="flex flex-col mt-35 items-center">
                <div className="text-2xl">Admin Login</div>

                <div className="mt-6">

                    <form onSubmit={submitLogin}>

                        <div className="mb-4">
                            <input type="email" name='email' placeholder='Email'
                            value={user.email} className='shadow appearance-none border border-gray rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={changeHandler} />
                        </div>

                        <div className="mb-4">
                            <input type="password" name='password' placeholder='Password'
                            value={user.password} className='shadow appearance-none border border-gray rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={changeHandler} />
                        </div>

                        <div className="mb-4 text-center">
                            <input type='submit' disabled={isSubmitting} value="Login" className={`bg-algae-500 text-algae-900 font-semibold text-black py-2 px-8 rounded-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:bg-emerald-500'}`} />

                            {isSubmitting && (
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}

                        </div>

                    </form>

                    <div className="font-bold flex flex-row justify-between">
                        <div className='me-7'>
                        <NavLink to="/admin-login">Forgot Password !</NavLink>
                        </div>
                        <div>
                        <NavLink to="/user-registration">Create New Admin ?</NavLink>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </main>
    
  )

}

export default AdminLogin;