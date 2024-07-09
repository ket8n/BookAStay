import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

const Account = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const handleLogoutBtn = () => {
    axios
      .post("/logout")
      .then(() => {
        setRedirect("/");
        setUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  const linkClasses = (type = null) => {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-red-500 rounded-full text-white";
    }
    return classes;
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-10 gap-2 mb-8">
        <Link className={linkClasses("profile")} to={"/account"}>
          My Profile
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My Places
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My Accommodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})
          <br />
          <button
            onClick={handleLogoutBtn}
            className="bg-red-500 text-white px-12 rounded-lg mt-2 py-1"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
