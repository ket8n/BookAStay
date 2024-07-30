import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import PropertyTable from "../components/PropertyTable";

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .post("/admin/properties")
      .then((response) => setProperties(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div>PropertiesPage</div>
      <div>
        <PropertyTable properties={properties} />
      </div>
    </>
  );
};

export default PropertiesPage;
