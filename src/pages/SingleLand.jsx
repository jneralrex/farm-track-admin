import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleLand = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${storedUser?.token}` },
  };
  const { id } = useParams();
  const base_url = import.meta.env.VITE_API_URL;

  const [singleFarm, setSingleFarm] = useState(null);

  useEffect(() => {
    const getSingleFarm = async () => {
      try {
        const res = await axios.get(`${base_url}/admin/land/${id}`, config);
        setSingleFarm(res.data.data);
      } catch (error) {
        console.error("Error fetching land data:", error);
      }
    };
    getSingleFarm();
  }, [id]);

  if (!singleFarm) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading land data...
      </div>
    );
  }

  const {
    name,
    location,
    landType,
    ownership,
    currentCrop,
    totalArea,
    createdAt,
    updatedAt,
  } = singleFarm;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Land Details
        </h2>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">General Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mt-2">
            <p><strong>Name:</strong> {name || "N/A"}</p>
            <p><strong>Type:</strong> {landType || "N/A"}</p>
            <p><strong>Ownership:</strong> {ownership || "N/A"}</p>
            <p><strong>Current Crop:</strong> {currentCrop || "N/A"}</p>
            <p>
              <strong>Total Area:</strong>{" "}
              {totalArea?.value} {totalArea?.unit}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Location Info</h3>
          <div className="text-sm text-gray-700 mt-2 space-y-1">
            <p><strong>Address:</strong> {location?.address || "N/A"}</p>
            <p>
              <strong>Coordinates:</strong>{" "}
              {location?.coordinates
                ? `${location.coordinates.latitude}, ${location.coordinates.longitude}`
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p><strong>Created:</strong> {new Date(createdAt).toLocaleString()}</p>
          <p><strong>Last Updated:</strong> {new Date(updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleLand;
