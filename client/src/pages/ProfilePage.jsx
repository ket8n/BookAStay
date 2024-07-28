import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";
import { useSnackbar } from "notistack";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const handleLogoutBtn = () => {
    axios
      .post("/auth/logout")
      .then(() => {
        setRedirect("/");
        setUser(null);
        enqueueSnackbar("Logged Out Successfully.", {
          variant: "success",
        });
      })
      .catch((err) => {
        enqueueSnackbar("Failed to Log Out.", {
          variant: "error",
        });
        console.log(err);
      });
  };

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          <div className="text-2xl font-bold mb-3 mt-4">My Details</div>
          <div className="flex justify-center ml-10">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="mb-1 mt-1">Name: {user.name}</p>
              <p>E-mail: {user.email}</p>
            </div>
          </div>
          <br />
          <button
            onClick={handleLogoutBtn}
            className="bg-red-500 text-white px-12 rounded-lg py-1"
          >
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
