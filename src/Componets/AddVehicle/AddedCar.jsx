import React, { useState, use } from "react";
import { AuthProvider } from "../../ContextProvider/Provider";
import Swal from "sweetalert2";

const AddedCar = () => {
  const { user } = use(AuthProvider);
  const [vehicleData, setVehicleData] = useState({
    vehicleName: "",
    ownerName: "",
    category: "",
    pricePerDay: "",
    location: "",
    availability: "Available",
    description: "",
    coverImage: "",
    userEmail: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/allvehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicleData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Vehicle added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        setVehicleData({
          vehicleName: "",
          ownerName: "",
          category: "",
          pricePerDay: "",
          location: "",
          availability: "Available",
          description: "",
          coverImage: "",
          userEmail: user?.email || "",
        });
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Failed to add vehicle",
          text: "Please try again",
        })
      );
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Add Vehicle</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="vehicleName"
          value={vehicleData.vehicleName}
          onChange={handleChange}
          placeholder="Vehicle Name"
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="ownerName"
          value={vehicleData.ownerName}
          onChange={handleChange}
          placeholder="Owner Name"
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="category"
          value={vehicleData.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="pricePerDay"
          value={vehicleData.pricePerDay}
          onChange={handleChange}
          placeholder="Price Per Day"
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="location"
          value={vehicleData.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-3 rounded-lg"
          required
        />

        <select
          name="availability"
          value={vehicleData.availability}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option value="Available">Available</option>
          <option value="Not Available">Not Available</option>
        </select>

        <textarea
          name="description"
          value={vehicleData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="coverImage"
          value={vehicleData.coverImage}
          onChange={handleChange}
          placeholder="Cover Image URL"
          className="border p-3 rounded-lg"
        />

        <input
          type="email"
          name="userEmail"
          value={vehicleData.userEmail}
          readOnly
          className="border p-3 rounded-lg bg-gray-100"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all"
        >
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default AddedCar;
