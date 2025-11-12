import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateCar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const vehicle = location.state?.vehicle;

  const [formData, setFormData] = useState({
    vehicleName: vehicle?.vehicleName || "",
    ownerName: vehicle?.ownerName || "",
    category: vehicle?.category || "",
    pricePerDay: vehicle?.pricePerDay || "",
    location: vehicle?.location || "",
    availability: vehicle?.availability || "",
    description: vehicle?.description || "",
    coverImage: vehicle?.coverImage || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `https://easy-ride-server-side.vercel.app/allvehicles/${vehicle._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Vehicle updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/my-vehicles");
        });
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Failed to update vehicle!",
          text: "Please try again later.",
        })
      );
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 shadow-xl rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Update Vehicle</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="vehicleName"
          value={formData.vehicleName}
          onChange={handleChange}
          placeholder="Vehicle Name"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
          placeholder="Owner Name"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="pricePerDay"
          value={formData.pricePerDay}
          onChange={handleChange}
          placeholder="Price Per Day"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-2 rounded"
        />
        <select
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Availability</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
        <input
          type="text"
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded h-24"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save Updates
        </button>
      </form>
    </div>
  );
};

export default UpdateCar;
