
import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

const Home = lazy(()=>import("../Home/Home"));

const User = lazy(()=>import("../Admin/User"));
const AdminLogin = lazy(()=>import("../Admin/AdminLogin"));
const NotFound = lazy(()=>import("../pages/NotFound"));
const BookService = lazy(()=>import("../user-views/BookService"));
const Offers = lazy(()=>import("../user-views/Offers"));
const Services = lazy(()=>import("../user-views/Services"));
const SubServices = lazy(()=>import("../user-views/SubServices"));
const ServiceProviders = lazy(()=>import("../user-views/ServiceProviers"));
const ContactUs = lazy(()=>import("../user-views/ContactUs"));
const Blogs = lazy(()=>import("../user-views/Blogs"));
const BlogView = lazy(()=>import("../user-views/BlogView"));

const Routing = () => {
    
  return (
    
        <Suspense fallback={
          <div className="flex flex-col justify-center items-center">
              <h6>Loading...</h6>
          </div>
        }>

    <Routes>

        <Route path="/" element={ <Home className="flex-grow" /> } />

        <Route path="/book-service" element={ <BookService subDisp={false} className="flex-grow" /> } />
        <Route path="/offers-listing" element={ <Offers className="flex-grow" /> } />
        <Route path="/contact-us" element={ <ContactUs className="flex-grow" /> } />
        <Route path="/blogs-home" element={ <Blogs className="flex-grow" /> } />
        <Route path="/blog-view/:blogId" element={ <BlogView className="flex-grow" /> } />
        
        <Route path="/services" element={ <Services subDisp={false} className="flex-grow" /> } />
        <Route path="/service/:serviceid" element={ <SubServices className="flex-grow" /> } />
        <Route path="/subservice/:subserviceid" element={ <ServiceProviders className="flex-grow" /> } />
        
        <Route path="/admin-login" element={ <AdminLogin /> } />
        <Route path="user-registration" element={<User />}  />

        <Route path="*" element={<NotFound />} />

    </Routes>

    </Suspense>

  )
}

export default Routing;