import React, { use } from "react";
import CardShow from "./CardShow";

const Vehicle = ({ vehiclespromise }) => {
  const AllVehicles = use(vehiclespromise);
  console.log(AllVehicles);
  return (
    <section className="bg-gradient-to-r from-purple-100 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Latest Vehicles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AllVehicles.map((data) => (
            <CardShow data={data}></CardShow>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vehicle;
