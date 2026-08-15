
import { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import DeleteBookings from "../Admin-Dashboard/DeleteBookings";

const AdminLayout = lazy(()=>import( "../Admin-Dashboard/AdminLayout" ));
const Service = lazy(()=>import( "../Admin-Dashboard/Service" ));
const SubService = lazy(()=>import( "../Admin-Dashboard/SubService" ));
const AdminLogin = lazy(()=>import( "../Admin/AdminLogin" ));
const DashboardProtector = lazy(()=>import( "../Admin-Dashboard/DashboardProtector" ));
const ServiceProvider = lazy(()=>import( "../Admin-Dashboard/ServiceProvider" ));
const DeleteServices = lazy(()=>import( "../Admin-Dashboard/DeleteServices" ));
const DeleteSubServices = lazy(()=>import( "../Admin-Dashboard/DeleteSubServices" ));
const DeleteServProviders = lazy(()=>import( "../Admin-Dashboard/DeleteServProviders" ));
const Offer = lazy(()=>import( "../Admin-Dashboard/Offer" ));
const DeleteOffers = lazy(()=>import( "../Admin-Dashboard/DeleteOffers" ));
const Blog = lazy(()=>import( "../Admin-Dashboard/Blog" ));
const DeleteBlogs = lazy(()=>import( "../Admin-Dashboard/DeleteBlogs" ));

const AdminRouting = () => {
  return (

        <Suspense fallback={
          <div className="flex flex-col justify-center items-center">
              <h6>Loading...</h6>
          </div>
        }>

    <Routes>

      <Route path="/admin-login" element={ <AdminLogin /> } />
      <Route path="/admindashboard" element={
                              <DashboardProtector >
                                  <AdminLayout />
                              </DashboardProtector>
                            } >

          <Route index element={<Navigate to="/admindashboard/add-service" />} replace />

          <Route path="add-service" element={<Service />}  />
          <Route path="add-sub-service" element={<SubService />}  />
          <Route path="add-service-provider" element={<ServiceProvider />}  />
          <Route path="delete-services" element={<DeleteServices />}  />
          <Route path="edit-service/:entity_id" element={<Service />}  />
          <Route path="delete-sub-services" element={<DeleteSubServices />}  />
          <Route path="edit-sub-service/:entity_id" element={<SubService />}  />
          <Route path="delete-service-providers" element={<DeleteServProviders />}  />
          <Route path="edit-service-provider/:entity_id" element={<ServiceProvider />}  />
          <Route path="service-bookings" element={<DeleteBookings />}  />

          <Route path="add-offer" element={<Offer />}  />
          <Route path="delete-offers" element={<DeleteOffers />}  />
          <Route path="edit-offer/:entity_id" element={<Offer />}  />

          <Route path="add-blog" element={<Blog />} />
          <Route path="delete-blogs" element={<DeleteBlogs />}  />
          <Route path="edit-blog/:entity_id" element={<Blog />}  />

      </Route>

    </Routes>

    </Suspense>

  )
}

export default AdminRouting;