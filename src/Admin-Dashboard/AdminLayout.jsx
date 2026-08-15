
import { Outlet } from 'react-router-dom';
import SidebarNavigation from './SidebarNavigation';

import './AdminLayout.css';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';

const AdminLayout = () => {
  return (
      <div className="app-container">

          <SidebarNavigation />

          <main className="main-wrapper min-h-screen">

                <AdminHeader />

                    <div className="flex-grow">
                      <Outlet />
                    </div>

                <AdminFooter />

          </main>

      </div>
  )
}

export default AdminLayout