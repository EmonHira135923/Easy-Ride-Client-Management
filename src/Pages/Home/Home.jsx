import React from "react";
import Banner from "../../Componets/Header/Banner";
import Vehicle from "../../Componets/AllVehicle/Vehicle";
import StaticSections from "../../Componets/Header/StaticSections";

const vehiclespromise = fetch("http://localhost:3000/dynamic-vehicles").then(
  (res) => res.json()
);

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Vehicle vehiclespromise={vehiclespromise}></Vehicle>
      <StaticSections></StaticSections>
    </div>
  );
};

export default Home;
