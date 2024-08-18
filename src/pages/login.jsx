import { useState } from "react";
import { PrimaryButton } from "../components/Button";
import { login } from "../services/Auth";



const Login = () => {

    const [errMsg1,setErrMsg1] = useState("");
    const [errMsg,setErrMsg] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        let jsonData = Object.fromEntries(new FormData(e.target).entries());
        
        const resp = await login(jsonData);
        
        if(resp){
            if(resp.error &&  resp.error?.status != 200){
                setErrMsg(resp.error?.message)
                return;
            }
            console.log(resp)
            let sessions = localStorage.getItem("sessions");
            if(sessions){
                sessions = JSON.parse(sessions);
                sessions[resp.user.username] = {
                    jwt: resp.jwt,
                    user: resp.user
                }
                localStorage.setItem("sessions",JSON.stringify(sessions))
            }else{
                localStorage.setItem("sessions",JSON.stringify({[resp.user.username]: {
                    jwt: resp.jwt,
                    user: resp.user
                }}))
            }
            localStorage.setItem("activeSession",resp.user.username)
            window.location = "/chat"
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
                <div className=" text-red-600 text-xs mx-2">
                    {errMsg1}
                </div>

                <input name="password" type="password" className="m-2 p-2 border  rounded-md" placeholder="Password" />

                <div className=" text-red-600 text-xs mx-2">
                    {errMsg}
                </div>
                <div className="w-full text-end  text-sm px-2 ">
                    Don't have Account? <a href="/register" className=" font-semibold hover:underline text-blue-500">Regiser Here</a>
                </div>
                <button type="submit" >
                    <PrimaryButton className=" m-2 p-2  text-white ">Login</PrimaryButton>
                </button>
            </form>
        </div>
    );
}

export default Login;