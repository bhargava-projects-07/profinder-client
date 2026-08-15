
import { useEffect, useState } from "react";
import { getTrendingServices } from "../service/servService";
import { toast, ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";

const Footer = () => {

    const [trendingServices, setTrendingServices] = useState([]);

    useEffect(()=>
    {
      const fetchTrendingServices = async() =>{
          try
          {
            const data = await getTrendingServices();
            setTrendingServices(data);
          }
          catch( err )
          {      
            toast.error( "Unable to Load Trending Services: " + err.message )
          }
    }

    fetchTrendingServices();

    },[]);

  return (
   <>

    <footer className="w-full bg-gray-50 text-sm text-gray-600">
           <ToastContainer position='top-right' autoClose={3000} />        
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-4 md:px-11 py-8">
        
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="mb-3 font-bold text-gray-900 text-base">About ProFinder</h3>
          <p className="leading-relaxed">
            ProFinder is your ultimate local business directory, connecting you with trusted service providers instantly. Find local help quickly, reliably, and hassle-free.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="mb-3 font-bold text-gray-900 text-base">Trending Services</h3>
          <ul className="space-y-2 grid grid-cols-2">

              {
                trendingServices?.length > 0 ? (
                    trendingServices.map((service) => (
                      <li key={service._id}>
                        <NavLink 
                          to={`/service/${service._id}`} 
                          className="hover:text-blue-600 transition-colors"
                        >
                          {service.name}
                        </NavLink>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 animate-pulse text-xs">Loading latest updates...</li>
                  )
              }            
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="mb-3 font-bold text-gray-900 text-base">Contact Us</h3>
          <p className="leading-relaxed text-gray-700 font-medium mb-2">Corporate Office:</p>
          <p className="leading-relaxed">
            Plot No. 42, 3rd Floor, Silicon Valley,<br />
            Madhapur, Hyderabad,<br />
            Telangana - 500081, India.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="mb-3 font-bold text-gray-900 text-base">Reach Us</h3>
          <ul className="space-y-2.5 mb-4">
            <li className="flex flex-row gap-2 items-baseline">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 self-center mt-[3px]">
                <path fillRule="evenodd" d="M19.5 9.75a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l4.72-4.72a.75.75 0 1 1 1.06 1.06L16.06 9h2.69a.75.75 0 0 1 .75.75Z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-gray-800 self-center mt-[3px]">Phone:</span>{' '}
              <a href="tel:+919876543210" className="hover:text-blue-600 self-center mt-[3px]">+91 98765 43210</a>
            </li>
            <li className="flex flex-row items-baseline gap-2">
                  <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="currentColor" className="size-4 self-center mt-[3px]">
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                  </svg>
                  <span className="font-semibold text-gray-800">Email:</span>{' '}
                  <a href="mailto:info@profinder.com" className="hover:text-blue-600 transition-colors">info@profinder.com</a>
            </li>
        </ul>          
    </div>

      </div>

      {/* Bottom Part of Footer (Responsive Base Row) */}
      {/* flex-col on mobile stacks them vertically, sm:flex-row makes it a side-by-side bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 min-h-14 px-4 md:px-11 py-4 sm:py-0 bg-gray-100 text-center sm:text-left gap-2">
        <div className="font-bold">
          <span>&copy;&nbsp;All rights reserved 2026-2027.</span>
        </div>
        <div className="font-bold">
          Designed by Elearn Infotech
        </div>
      </div>
    </footer>
   </>
  )
}

export default Footer