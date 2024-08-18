import { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/login';
import Register from './pages/register';
import {PrimaryButton, SecondaryButton } from './components/Button';
import Chat from './pages/chat';
import AccountModal from './components/AccountModal';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Chat />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);


function App() {
  const [count, setCount] = useState(0)
  const [isAuth,setIsAuth] = useState(false);
  const user = localStorage.getItem("activeSession");


  const handleLogout = () => {
    if (confirm("Logging Out... \nDo you want to delete all messages as well?\n(This action cannot be undone)")) {
      localStorage.removeItem("messages_"+user.replace(/\s/g, ''));
    }
    let session = localStorage.getItem("sessions");
    if(session){
      session = JSON.parse(session);
      if(user in session) delete session[user];
      localStorage.setItem("sessions",JSON.stringify(session));
      if(Object.keys(session).length == 0){
        localStorage.removeItem("activeSession");
        window.location = "/login";
        return;
      }
      localStorage.setItem("activeSession",Object.keys(session)[0]);
      window.location = "/chat"

    }
  }

  useEffect(()=>{
    if(localStorage.getItem("activeSession") && localStorage.getItem("activeSession")!= "" ){
      setIsAuth(true);
    }
  })


  return (
    <div className='w-screen h-screen flex flex-col bg-slate-100'>
      <div className='bg-blue-500 flex flex-row gap-2 py-2 justify-end px-1'>
        {!isAuth?
          <>
            <a href='/login'>
              <PrimaryButton>Login</PrimaryButton>
            </a>
            <a href='/register'>
              <SecondaryButton>SignUp</SecondaryButton>
            </a>
          </>
          :
          <>  
              <PrimaryButton
                  onClick={()=>{
                    document.getElementById("accountdialog").showModal();
                  }}
              > Logged in as <b>{user}</b>!! 🔁</PrimaryButton>
              <SecondaryButton
                onClick={handleLogout}>Logout</SecondaryButton>
          </>
        }
      </div>
      <RouterProvider router={router}/>
      <AccountModal />
    </div>
  )
}

export default App
