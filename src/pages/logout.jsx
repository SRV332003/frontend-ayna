import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



const Logout = () => {
    const navigate = useNavigate();
    const {logout } = useAuth();
    
    useEffect (() => { 
        if(!logout) return
        logout();
        navigate("/");
    },[logout,navigate])
    return <>Logging Out...</>
}

export default Logout;