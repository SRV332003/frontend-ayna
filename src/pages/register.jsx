import { PrimaryButton } from "../components/Button";
import React, { useState } from "react";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Pincode from 'react-pincode';
import { register } from "../services/Auth";





const Register = () => {
    const [phone, setPhone] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const handleRegister =async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        setErrMsg("");
        formData.append("phone_number", phone);
        formData.append("username", (formData.get("fname") + " " + formData.get("lname")).trim());
        formData.delete("fname");
        formData.delete("lname");
        if (formData.get("password") !== formData.get("password1")) {
            setErrMsg("Password does not match");
            return;
        }
        if(formData.get("password").length < 8){
            setErrMsg("Password should be atleast 8 characters");
            return;
        }
        if(formData.get("password").length > 20){
            setErrMsg("Password should be less than 20 characters");
            return;
        }
        if(formData.get("phone_number").length < 12){
            setErrMsg("Phone number should be atleast 10 characters");
            return;
        }
        if(formData.get("phone_number").length > 15){
            setErrMsg("Phone number should be less than 15 characters");
            return;
        }
        formData.delete("password1");
        let jsonData = Object.fromEntries(formData.entries());
        console.log(jsonData);
        const resp = await register(jsonData)
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
            <h1 className="text-2xl font-bold text-center border-b">Register</h1>
            <form className="flex flex-col  overflow-auto" style={{
                maxHeight: "calc(100vh - 7.5rem)"
            }}
                onSubmit={handleRegister}
            > 

                <div className="flex flex-row">
                    <input type="text" className="m-2 p-2 border rounded-md w-1/2 " name="fname" placeholder="First Name" required />
                    <input type="text" className="m-2 p-2 border rounded-md w-1/2" name="lname" placeholder="Last Name" />
                </div>
                <input type="email" className="m-2 p-2 border rounded-md" placeholder="Email" name="email" required />

                <PhoneInput
                    inputClassName="w-full "
                    className="m-2 text-base rounded-md"
                    defaultCountry="in"
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                />
                <input type="password" name="password" className="m-2 p-2 border rounded-md" placeholder="Password" required />
                <input type="password" name="password1" className="m-2 p-2 border rounded-md" placeholder="Confirm Password" required />
                <div className="h-4 text-sm text-red-600">
                    {errMsg}
                </div>
                <button type="submit"><PrimaryButton  className=" m-2 p-2  text-white " >SignUp</PrimaryButton></button>
            </form>
        </div>
    )
}


export default Register;