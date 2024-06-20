import { Navigate } from 'react-router-dom';

const UserPrivateRoute = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser || currentUser.isAdmin) {
        return <Navigate to="/Login" />;
    }

    return children;
};

export default UserPrivateRoute;
