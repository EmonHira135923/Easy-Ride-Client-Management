import React from "react";
import Banner from "../../Componets/Header/Banner";
import Vehicle from "../../Componets/AllVehicle/Vehicle";
import StaticSections from "../../Componets/Header/StaticSections";
const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Vehicle></Vehicle>
      <StaticSections></StaticSections>
    </div>
  );
};

export default Home;
