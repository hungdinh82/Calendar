import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser || !currentUser.isAdmin) {
        return <Navigate to="/LoginAdmin" />;
    }

    return children;
};

export default PrivateRoute;
