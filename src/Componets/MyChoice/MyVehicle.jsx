import React, { useEffect, useState, use } from "react";
import Swal from "sweetalert2";
import MyCar from "./MyCar";
import { AuthProvider } from "../../ContextProvider/Provider";

const MyVehicle = () => {
  const { user } = use(AuthProvider);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("https://easy-ride-server-side.vercel.app/allvehicles")
      .then((res) => res.json())
      .then((data) => {
        const userVehicles = data.filter(
          (vehicle) => vehicle.userEmail === user?.email
        );
        setVehicles(userVehicles);
      });
  }, [user?.email]);

  // Delete function
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://easy-ride-server-side.vercel.app/allvehicles/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setVehicles(vehicles.filter((vehicle) => vehicle._id !== id));
            Swal.fire("Deleted!", "Your vehicle has been deleted.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete vehicle.", "error");
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">My Vehicles</h1>

      {vehicles.length === 0 ? (
        <p className="text-center text-gray-500">No vehicles added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <MyCar
              key={vehicle._id}
              vehicle={vehicle}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVehicle;
