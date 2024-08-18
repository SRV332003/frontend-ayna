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
        
        const resp = await loginApi(jsonData);
        
        if(resp){
            if(resp.error &&  resp.error?.status != 200){
                setErrMsg(resp.error?.message)
                return;
            }
            console.log(resp)
            login(resp.user,resp.jwt);
            navigate("/chat");
        }
    }   


    return (
        <div className="md:m-auto my-auto mx-2 border p-3 bg-white rounded-lg md:w-1/3">
            <h1 className="text-2xl font-bold text-center border-b">Login</h1>
            <form className="flex flex-col  overflow-auto" style={{
                maxHeight: "calc(100vh - 7.5rem)"
            }}
            onSubmit={handleLogin}
            >
                <input name="identifier" type="text" className="m-2 p-2 border rounded-md" placeholder="Email" />
                <input name="password" type="password" className="m-2 p-2 border  rounded-md" placeholder="Password" />

                <div className=" text-red-600 text-xs mx-2">
                    {errMsg}
                </div>
                <div className="w-full text-end  text-sm px-2 ">
                    Don't have Account? <Link to="/register" className=" font-semibold hover:underline text-blue-500">Regiser Here</Link>
                </div>
                <button type="submit" >
                    <PrimaryButton className=" m-2 p-2  text-white ">Login</PrimaryButton>
                </button>
            </form>
        </div>
    );
}

export default Login;