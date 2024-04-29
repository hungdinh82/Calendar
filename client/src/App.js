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

    useEffect(() => {
        // if (!localStorage.getItem("listEvents")) localStorage.setItem("listEvents", JSON.stringify(Events));
        // else console.log(localStorage.getItem("listEvents"));
        // if (!localStorage.getItem("listAccounts")) localStorage.setItem("listAccounts", JSON.stringify(Accounts));
        // else console.log(localStorage.getItem("listAccounts"));
        // if (!localStorage.getItem("listInformations")) localStorage.setItem("listInformations", JSON.stringify(Notify));
        // else console.log(localStorage.getItem("listInformations"));
        // if (!localStorage.getItem("listComments")) localStorage.setItem("listComments", JSON.stringify([]));
        // else console.log(localStorage.getItem("listComments"));
    }, [])
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
