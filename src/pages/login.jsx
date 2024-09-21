import { useState } from "react";
import { PrimaryButton } from "../components/Button";
import { loginApi } from "../services/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



const Login = () => {

    const [errMsg,setErrMsg] = useState("");
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        let jsonData = Object.fromEntries(new FormData(e.target).entries());
        
        if(jsonData?.identifier){
            localStorage.setItem("User",jsonData.identifier);
            navigate("/chat");
        }else setErrMsg("UserName required");
    }   


    return (
        <div className="md:m-auto my-auto mx-2 border p-3 bg-white rounded-lg md:w-1/3">
            <h1 className="text-2xl font-bold text-center border-b">Enter your Username</h1>
            <form className="flex flex-col  overflow-auto" style={{
                maxHeight: "calc(100vh - 7.5rem)"
            }}
            onSubmit={handleLogin}
            >
                <input name="identifier" type="text" className="m-2 p-2 border rounded-md" placeholder="Username" />
                
               
                <div className=" text-red-600 text-xs mx-2">
                    {errMsg}
                </div>
                <button type="submit" >
                    <PrimaryButton className=" m-2 p-2  text-white ">Enter Chat Roo</PrimaryButton>
                </button>
            </form>
        </div>
    );
}

export default Login;