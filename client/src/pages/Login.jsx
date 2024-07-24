import React, { useContext, useRef, useState } from "react";
import { checkSignInData, checkSignUpData } from "../utils/validate";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { GoogleLogin } from "@react-oauth/google";
import { useSnackbar } from "notistack";

// axios.defaults.baseURL = "http://127.0.0.1:4000";
// axios.defaults.withCredentials = true;

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
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
        .post("/auth/login", {
          email: email.current.value,
          password: password.current.value,
        })
        .then((res) => {
          setUser(res.data);
          setRedirect(true);
          enqueueSnackbar("Logged In Successfully.", {
            variant: "success",
            autoHideDuration: 2000,
          });
        })
        .catch((err) => {
          enqueueSnackbar("Incorrect Email/Password.", {
            variant: "error",
            autoHideDuration: 2000,
          });
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
        .post("/auth/register", newUser)
        .then(() => {
          enqueueSnackbar("Registered Successfully, Please Log In again...", {
            variant: "success",
            autoHideDuration: 2000,
          });
        })
        .catch((err) => {
          enqueueSnackbar("Registration Failed. Please Try Again Later...", {
            variant: "error",
            autoHideDuration: 2000,
          });
          console.log(err);
        });
    }
  };

  function handleLoginSuccess(response) {
    const tokenId = response.credential; // tokenId should be response.credential

    axios
      .post("/auth/google-login", { idToken: tokenId })
      .then((res) => {
        setUser(res.data);
        setRedirect(true);
        enqueueSnackbar("Logged In Successfully.", {
          variant: "success",
          autoHideDuration: 2000,
        });
      })
      .catch((err) => {
        enqueueSnackbar("Log In failed.", {
          variant: "error",
          autoHideDuration: 2000,
        });
        console.error("Google login failed:", err);
      });
  }

  function handleLoginError(response) {
    enqueueSnackbar("Log In failed.", {
      variant: "error",
      autoHideDuration: 2000,
    });
    console.error("Login failed:", response.error);
  }

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
        <p className="py-4 cursor-pointer " onClick={toggleSignIn}>
          {isSignIn ? (
            <>
              New to StreamVault?{" "}
              <span className="underline font-bold">Sign Up Now!</span>
            </>
          ) : (
            <>
              Already registered?{" "}
              <span className="underline font-bold">Sign In Now!</span>
            </>
          )}
        </p>
        <div className="">
          <GoogleLogin
            clientId={import.meta.env.VITE_GOOGLE_CLIENT_API}
            buttonText="Login with Google"
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
