import { Route, Routes } from 'react-router-dom';
import Overview from './pages/Overview/Overview';
import LoginPage from './pages/Login/Login';
import CalendarPage from './pages/Calendar/CalendarPage'
import DetailsPage from './pages/Details/Details';
import Signup from './pages/Signup/Signup';
import WorkProgressPage from './pages/WorkProgress/WorkProgress';
import Listworks from './pages/Listworks/Listworks';
import { useEffect, useState } from 'react';
import Accounts from './fileData/Account';
import Events from './fileData/Event';
import Notify from './fileData/Notify'
import { io } from "socket.io-client";
import { useDispatch } from 'react-redux';
import { updateSocket, updateUserOnline } from './redux/socketSlice';

function App() {
    const [user, setUser] = useState();
    const [isSignUp, setIsSignUp] = useState(false);
    const signUp = () => {
        const user = {
            userId: localStorage.getItem("userId"),
            userName: localStorage.getItem("userName"),
            avatar: localStorage.getItem("avatar"),
        }
        setUser(user);
    }
    useEffect(() => {
        signUp();
    }, [isSignUp]);

    const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const portSocket = "http://localhost:6000"
    useEffect(() => {
        const socket = io(portSocket);
        dispatch(updateSocket(socket));
        if (currentUser.id) {
            socket.emit("add-user", currentUser);
            dispatch(updateUserOnline(currentUser));
        }
    }, []);
    return (
        <Routes>
            <Route path="/" element={<CalendarPage />} />
            <Route path="/Overview" element={<Overview />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Calendar" element={<CalendarPage />} />
            <Route path="/WorkProgress" element={<WorkProgressPage />} />
            <Route path="/Details" element={<DetailsPage />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Listworks" element={<Listworks />} />
            <Route path="/" element={<CalendarPage />} />
        </Routes>
    );
}

export default App;
