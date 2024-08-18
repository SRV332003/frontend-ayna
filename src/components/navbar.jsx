import { Link } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "./Button";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
    const {isAuthenticated,activeUser} = useAuth();
    return (
        <div className='bg-blue-500 flex flex-row gap-2 py-2 justify-end px-1'>
        {!isAuthenticated ?
          <>
            <Link to='/login'>
              <PrimaryButton>Login</PrimaryButton>
            </Link>
            <Link to='/register'>
              <SecondaryButton>SignUp</SecondaryButton>
            </Link>
          </>
          :
          <>  
              <PrimaryButton
                  onClick={()=>{
                    document.getElementById("accountdialog").showModal();
                  }}
              > Logged in as <b>{activeUser}</b>!! 🔁</PrimaryButton>
              <Link to="/logout"><SecondaryButton
               >Logout</SecondaryButton></Link>
          </>
        }
      </div>
    )
}
export default Navbar