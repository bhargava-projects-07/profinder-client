
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardProtector = ({children}) => {

    const {token} = useAuth();
    if( ! token )
    {
        return <Navigate to="/admin-login" />;
    }
    

    return children;
}

export default DashboardProtector;
