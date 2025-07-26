import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLaoding from "../components/PageLoading";

const SingleTest = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${storedUser.token}` },
  };
  const { id } = useParams();
  const base_url = import.meta.env.VITE_API_URL;

  const [singleRequest, setSingleRequest] = useState(null);

  useEffect(() => {
    const getSingleRequest = async () => {
      try {
        const res = await axios.get(`${base_url}/admin/request/${id}`, config);
        setSingleRequest(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getSingleRequest();
  }, [id]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Title */}
      <p className="text-center text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
        Test Request Analysis Report
      </p>
      <p className="text-center text-sm sm:text-base md:text-lg font-bold text-gray-600">
        Federal Ministry of Agriculture and Food Security
      </p>

      {/* Information Section */}
      <div className="mt-6 p-2 bg-gray-100 rounded-lg shadow-md w-full">
        {singleRequest ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="font-bold text-base sm:text-lg">
              Farmer Name:{" "}
              <span className="font-normal">
                {singleRequest?.farmer?.profile?.firstName || "N/A"}
              </span>
            </p>
            <p className="font-bold text-base sm:text-lg">
              Email:{" "}
              <span className="font-normal ">
                {singleRequest?.farmer?.email || "N/A"}
              </span>
            </p>
            <p className="font-bold text-base sm:text-lg">
              Phone:{" "}
              <span className="font-normal">
                {singleRequest?.farmer?.profile?.phoneNumber || "N/A"}
              </span>
            </p>
            <p className="font-bold text-base sm:text-lg">
              Agent:{" "}
              <span className="font-normal">
                {singleRequest?.agent?.profile?.lastName +
                  " " +
                  singleRequest?.agent?.profile?.firstName || "N/A"}
              </span>
            </p>
            <p className="font-bold text-base sm:text-lg">
              State:{" "}
              <span className="font-normal">
                {singleRequest?.land?.location?.state || "N/A"}
              </span>
            </p>
            <p className="font-bold text-base sm:text-lg">
              Status:{" "}
              <span className="font-normal">
                {singleRequest?.status || "N/A"}
              </span>
            </p>
          </div>
        ) : (
         <PageLaoding />
        )}
      </div>
    </div>
  );
};

export default SingleTest;
