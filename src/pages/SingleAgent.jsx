import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleAgent = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${storedUser?.token}` },
  };
  const { id } = useParams();
  const base_url = import.meta.env.VITE_API_URL;

  const [singleAgent, setSingleAgent] = useState(null);

  useEffect(() => {
    const getSingleAgent = async () => {
      try {
        const res = await axios.get(`${base_url}/admin/user/${id}`, config);
        setSingleAgent(res.data.data);
      } catch (error) {
        console.error("Error fetching agent data:", error);
      }
    };
    getSingleAgent();
  }, [id]);

  if (!singleAgent) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading agent data...
      </div>
    );
  }

  const { profile, email, role, image, location, status, createdAt } =
    singleAgent;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Agent Profile</h2>

        <div className="flex items-center space-x-4 mb-6">
          <img
            src={image || "https://via.placeholder.com/100"}
            alt="Agent Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold">
              {profile?.firstName} {profile?.middleName} {profile?.lastName}
            </p>
            <p className="text-sm text-gray-600">{email}</p>
            <p className="text-sm text-gray-600 capitalize">{role}</p>
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-600"
              }`}
            >
              {status ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Profile Info</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                <strong>First Name:</strong> {profile?.firstName || "N/A"}
              </li>
              <li>
                <strong>Middle Name:</strong> {profile?.middleName || "N/A"}
              </li>
              <li>
                <strong>Last Name:</strong> {profile?.lastName || "N/A"}
              </li>
              <li>
                <strong>Address:</strong> {profile?.address || "N/A"}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Location Info</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                <strong>Address:</strong> {location?.address || "N/A"}
              </li>
              <li>
                <strong>State:</strong> {location?.state || "N/A"}
              </li>
              <li>
                <strong>LGA:</strong> {location?.lga || "N/A"}
              </li>
              <li>
                <strong>Ward:</strong> {location?.ward || "N/A"}
              </li>
              <li>
                <strong>Coordinates:</strong>{" "}
                {location?.coordinates
                  ? `${location.coordinates.latitude}, ${location.coordinates.longitude}`
                  : "N/A"}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <strong>Joined:</strong>{" "}
          {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleAgent;
