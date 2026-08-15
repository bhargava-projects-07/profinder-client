import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {

  const { user,logout } = useAuth();
  const navigate = useNavigate();

  const callLogout = (event)=>{
    event.preventDefault();
    logout();
    navigate("/admin-login");
  }

  return (

    <header className="admin-top-header mt-2">
      <img src='/logo-3.png' alt='ProFinder' className="ms-5" />

      <div>
        <div className="rounded mt-4 p-2 me-2 bg-green-50 border-1 inline-block h-11">
          <i>Welcome</i>&nbsp;<span className="font-bold">{user?.name}</span>
        </div>
        <img onClick={callLogout} src="/exit-1.webp" alt="Logout" tooltip="Logout" className="w-9 h-9 me-2 inline-block cursor-pointer" />
      </div>

    </header>

  )
}

export default AdminHeader;