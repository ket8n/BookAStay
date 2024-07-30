import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import UserTable from "../components/UserTable";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .post("/admin/users")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div>UsersPage</div>
      <div>
        <UserTable users={users} />
      </div>
    </>
  );
};

export default UsersPage;
