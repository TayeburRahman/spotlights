import axios from "axios";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { baseUrl } from "../config/Url";
import useToast from "../hooks/useToast";
import { AuthContext } from "../providers/AuthProvider";
import Button from "./Button";

const GoogleLogin = () => {
  const { user, googleSignIn, logOut } = useContext(AuthContext);
  const { showToast } = useToast();

  const [isUser,setUser]= useState({
    userName: '',
    userEmail: '',
    userImage: '',
    id: ''
  }) 

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((res) => {
        showToast(`Welcome Back ${res.user.displayName}!`);
        
        const saveUser = {
          userName: res.user.displayName,
          userEmail: res.user.email,
          userImage: res.user.photoURL, 
        };

        localStorage.setItem(
          'auth',
          JSON.stringify({
            userName: res.user.displayName,
           userEmail: res.user.email,
           userImage: res.user.photoURL,
          id: res.user.uid
          }),
        );
  
        axios.post(`${baseUrl}/users`, saveUser); 
      }).then((res) => {

      })
      .catch((err) => {
        showToast(err.message);
      });
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        showToast("Logout Successful!");
      })
      .catch((err) => {
        showToast(err.message);
      });
  };

  return (
    <>
      {user ? (
        <Button
          onClick={handleLogout}
          className="flex items-center gap-1"
          size="small"
          colors="transparent"
        >
          <FcGoogle className="w-6 h-6" /> Logout
        </Button>
      ) : (
        <Button
          onClick={handleGoogleLogin}
          className="flex items-center gap-1"
          size="small"
          colors="transparent"
        >
          <FcGoogle className="w-6 h-6" /> LogIn
        </Button>
      )}
    </>
  );
};

export default GoogleLogin;
