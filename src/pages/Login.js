import { Button } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../firebase/FirebaseConfig";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Login() {
  //auth
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(process.env.REACT_APP_apiKey);

  const handleSignin = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // console.log(user.providerData[0].email);
        let verifyEmail = user?.providerData[0]?.email.match("nstu.edu.bd");

        if (verifyEmail[0] === "nstu.edu.bd") {
          //console.log(user.providerData[0].email);
          const postData = async () => {
            dispatch(showLoading());
            const response = await axios.post(
              "https://portal-server-rosy.vercel.app/api/user/login",
              { email: user?.providerData[0]?.email,
                name:user?.providerData[0]?.displayName,
                photoURL:user?.providerData[0]?.photoURL,
               }
            );
            console.log(response);
            dispatch(hideLoading());
            if (response?.data?.success) {
              toast.success(
                `${user?.providerData[0]?.displayName} !Login Success Fully`,
                2000
              );
              localStorage.setItem("token", response?.data?.data);
              localStorage.setItem(
                "userInfo",
                JSON.stringify(response?.data?.userInfo)
              );
              navigate("/");
            } else {
              dispatch(hideLoading());
              toast.error(response?.data?.message);
            }
          };

          postData();
        } else {
          dispatch(hideLoading());
          toast.error(`Invalid User!`, 2000);
        }
      })
      .catch((error) => {
        dispatch(hideLoading());
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error(`Invalid User!`, 2000);
      });

    // try {
    //   dispatch(showLoading());

    //   const response = await axios.post("/api/user/login", values);
    //   dispatch(hideLoading());
    //   if (response.data.success) {
    //     toast.success(response.data.message);
    //     localStorage.setItem("token", response?.data?.data);
    //     localStorage.setItem("userInfo", JSON.stringify(response?.data?.userInfo));
    //     //console.log(response?.data);
    //     navigate("/");
    //   } else {
    //     toast.error(response.data.message);
    //   }
    // } catch (error) {
    //   dispatch(hideLoading());
    //   toast.error("Something went wrong");
    // }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Welcome Back</h1>
        <Button
          onClick={handleSignin}
          className="primary-button my-2 full-width-button"
          htmlType="submit"
        >
          
          <h4 style={{color:'white'}}>Login With Google</h4>
         
        </Button>
      </div>
    </div>
  );
}

export default Login;
