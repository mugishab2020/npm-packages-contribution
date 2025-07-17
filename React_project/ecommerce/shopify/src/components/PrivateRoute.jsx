import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { role } = useAuth();

    return allowedRoles.includes(role) ? children : <Navigate to="/login" />;
};

export default PrivateRoute;