import { Route, Routes, useNavigate } from 'react-router-dom';
import Overview from './pages/Overview/Overview';
import LoginPage from './pages/Login/Login';
import CalendarPage from './pages/Calendar/CalendarPage';
import DetailsPage from './pages/Details/Details';
import Signup from './pages/Signup/Signup';
import WorkProgressPage from './pages/WorkProgress/WorkProgress';
import Listworks from './pages/Listworks/Listworks';
import LoginAdmin from './pages/LoginAdmin/LoginAdmin';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import { useEffect, useState } from 'react';
import Accounts from './fileData/Account';
import Events from './fileData/Event';
import Notify from './fileData/Notify';
import { io } from "socket.io-client";
import { useDispatch } from 'react-redux';
import { updateSocket, updateUserOnline } from './redux/socketSlice';
import PrivateRoute from '../src/components/PrivateRoute/PrivateRoute';
import UserPrivateRoute from './components/PrivateRoute/UserPrivateRoute';

function App() {
    const [user, setUser] = useState();
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const signUp = () => {
        const user = {
            userId: localStorage.getItem("userId"),
            userName: localStorage.getItem("userName"),
            avatar: localStorage.getItem("avatar"),
        };
        setUser(user);
    };

    useEffect(() => {
        signUp();
    }, [isSignUp]);

    const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const portSocket = "http://localhost:4000";

    useEffect(() => {
        const socket = io(portSocket);
        dispatch(updateSocket(socket));
        if (currentUser?.id) {
            socket.emit("add-user", currentUser);
            dispatch(updateUserOnline(currentUser));
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<UserPrivateRoute><CalendarPage /></UserPrivateRoute>} />
            <Route path="/Overview" element={<UserPrivateRoute><Overview /></UserPrivateRoute>} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Calendar" element={<UserPrivateRoute><CalendarPage /></UserPrivateRoute>} />
            <Route path="/WorkProgress" element={<UserPrivateRoute><WorkProgressPage /></UserPrivateRoute>} />
            <Route path="/Details" element={<UserPrivateRoute><DetailsPage /></UserPrivateRoute>} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Listworks" element={<UserPrivateRoute><Listworks /></UserPrivateRoute>} />
            <Route path="/LoginAdmin" element={<LoginAdmin />} />
            <Route
                path="/AdminDashboard"
                element={
                    <PrivateRoute>
                        <AdminDashboard />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default App;