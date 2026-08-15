
import { NavLink } from 'react-router-dom';
import './SidebarNavigation.css';

const SidebarNavigation = () => {
  const navItems = [
    { name: 'Add Service', to: 'add-service' },
    { name: 'Add Sub-Service', to: 'add-sub-service' },
    { name: 'Add Service Provider', to: 'add-service-provider' },
    { name: 'Add Offer', to: 'add-offer' },
    { name: 'Add Blog', to: 'add-blog' },
    { name: 'Edit-Delete Services', to: 'delete-services' },
    { name: 'Edit-Delete Sub Services', to: 'delete-sub-services' },
    { name: 'Edit Service Providers', to: 'delete-service-providers' },
    { name: 'Edit-Delete Offers', to: 'delete-offers' },
    { name: 'Edit-Delete Blogs', to: 'delete-blogs' },
    { name: 'Service Bookings', to: 'service-bookings' },
  ];

  return (
    <aside className="sidebar">
      
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink 
                to={item.to} 
                className='nav-link'
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default SidebarNavigation