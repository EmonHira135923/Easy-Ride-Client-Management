import React from "react";
import { useLoaderData, useParams } from "react-router";

const CarDetails = () => {
  const detailsdata = useLoaderData();
  const { id } = useParams();
  console.log(detailsdata, id);
  return (
    <div className="p-25">
      <h1>Details Page</h1>
    </div>
  );
};

export default CarDetails;
