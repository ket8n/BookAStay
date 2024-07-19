import React, { useContext, useRef, useState } from "react";
import { checkSignInData, checkSignUpData } from "../utils/validate";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

// axios.defaults.baseURL = "http://127.0.0.1:4000";
// axios.defaults.withCredentials = true;

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    if (isSignIn) {
      const message = checkSignInData(
        email.current.value,
        password.current.value
      );
      setErrorMessage(message);

      if (message !== null) return;

      // login logic
      axios
        .post("/login", {
          email: email.current.value,
          password: password.current.value,
        })
        .then((res) => {
          alert("Login Successful.");
          // sessionStorage.setItem("username", res.data.name);
          // let userName = sessionStorage.getItem("username");
          setUser(res.data);
          // console.log(res);
          setRedirect(true);
        })
        .catch((err) => {
          alert("Login Failed. Please Try Again Later...");
        });
    } else {
      const message = checkSignUpData(
        name.current.value,
        email.current.value,
        password.current.value
      );
      setErrorMessage(message);

      if (message !== null) return;

      // sign up logic

      const newUser = {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      axios
        .post("/register", newUser)
        .then(() => alert("Registerd Successfully. Now you Can Login..."))
        .catch((err) => {
          alert("Registration Failed. Please Try Again Later...");
          console.log(err);
        });
    }
  };

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="">
      <form
        className=" p-12 w-full md:w-4/12 mx-auto my-16 right-0 left-0 rounded-lg border shadow-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignIn && (
          <input
            ref={name}
            type="text"
            className="p-4 my-4 w-full border"
            placeholder="Full Name"
          ></input>
        )}
        <input
          type="text"
          ref={email}
          className="p-4 my-4 w-full border"
          placeholder="Email Address"
        ></input>
        <input
          type="password"
          ref={password}
          className="p-4 my-4 w-full border"
          placeholder="Password"
        ></input>
        <p className="text-red-700 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-600 w-full rounded-lg text-white"
          onClick={handleButtonClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignIn}>
          {isSignIn
            ? "New to StreamVault? Sign Up Now!"
            : "Already registered? Sign In Now!"}
        </p>
      </form>
    </div>
  );
};

export default Login;
