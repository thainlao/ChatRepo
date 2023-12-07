import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./store/hoocs";
import Register from "./components/Register";
import Header from "./pages/Header";
import Dashboard from "./components/Dashboard";
import Mainpage from "./components/Mainpage";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from 'react';
import { getMe } from "./store/reducers/authSlice";
import ChatPage from "./pages/ChatPage";
import SettingUser from "./components/SettingUser";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe())
  }, [])

  return (
      <Router>  
        <Header />
        <Routes>
          <Route path='/' element={<Mainpage />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/registration' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/setting" element={<SettingUser />}/>
        </Routes>
        <ToastContainer />
      </Router>
  );
}

export default App;