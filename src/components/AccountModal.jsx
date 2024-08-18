import React, { useState, useEffect } from "react";
import { PrimaryButton, SecondaryButton } from "./Button";




const AccountModal = () => {
    const activeSession = localStorage.getItem("activeSession");
    const sessions = JSON.parse(localStorage.getItem("sessions"));
  return (
    // Modal with background blured
    <dialog id="accountdialog" className="modal md:w-1/4 bg-slate-300 border rounded-lg p-3">
        <div className="flex flex-row ">
            <h2 className="text-[1.25rem] mb-1 px-2 mx-auto text-center font-medium  leading-[30px]">
                Switch Account
            </h2>
            <form method="dialog" className="modal-backdrop">
                <button type="submit"><PrimaryButton >X</PrimaryButton></button>
            </form>
        </div>
    
        <div className="flex flex-col gap-2">
            {Object.keys(sessions).map((session, index) => {
                if (session !== activeSession) {
                    return <SecondaryButton key={index} className="" onClick={() => {
                        localStorage.setItem("activeSession", session);
                        window.location.reload();
                    }}>{sessions[session].user.username}</SecondaryButton>
                }else{
                    return <SecondaryButton key={index} className="bg-slate-300 text-slate-700 border-slate-400" >
                        {sessions[session].user.username}
                    </SecondaryButton>
                }
            })}
            <PrimaryButton onClick={() => {
                window.location = "/login";
            }
            }>Add Account</PrimaryButton>
        </div>
      
    </dialog>
  );
};

export default AccountModal;