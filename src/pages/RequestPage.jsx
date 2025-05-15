import { Button, Input, Table } from "antd";
import arrowDown from "../assets/arrow-down.png";
import search from "../assets/search-normal.png";
import user from "../assets/user_img.png";
import verify from "../assets/verify.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PageLaoding from "../components/PageLoading";

const RequestPage = () => {
  const [requestData, setRequestData] = useState([]);
  const [error, setError] = useState([]);
  const base_url = import.meta.env.VITE_API_URL;
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${storedUser.token}` },
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two digits
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    return `${year}/${month}/${day}`;
  };

  useEffect(() => {
    const getLandData = async () => {
      try {
        const res = await axios.get(`${base_url}/admin/requests`, config);
        if (Array.isArray(res.data.data)) {
          setRequestData(res.data.data);
          console.log(res.data.data);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    getLandData();
  }, []);

  return (
    <div className="bg-white rounded-md p-3">
      <div className="flex flex-col md:flex-row justify-between items-center">
                 <h1 className="text-[12px] md:text-lg font-semibold">All Request</h1>
                  <div className="flex gap-5">
                    <div className="flex items-center rounded-full w-full border px-3">
                      <img src={search} className="w-4 h-4 cursor-pointer" />
                      <Input
                        placeholder="Search Request....."
                        className="ml-2 border-none"
                      />
                    </div>
                  </div>
                </div>

      {requestData.length == 0 ? (
        <PageLaoding />
      ) : (
        <div className="mt-8 overflow-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2 text-left">S/N</th>
                <th className="border border-gray-300 p-2 text-left">Agent</th>
                <th className="border border-gray-300 p-2 text-left">Famer</th>
                <th className="border border-gray-300 p-2 text-left">Land</th>
                <th className="border border-gray-300 p-2 text-left">
                  Source{" "}
                </th>
                <th className="border border-gray-300 p-2 text-left">Status</th>
                <th className="border border-gray-300 p-2 text-left">Date</th>
                <th className="border border-gray-300 p-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {requestData.map((data, index) => (
                <tr key={data._id}>
                  <td className="border border-gray-300 p-2">
                    {index + 1 || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data?.agent.profile.firstName +
                      " " +
                      data?.agent.profile.lastName || "N/A"}{" "}
                    <br />
                    {data?.agent.email || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data?.farmer.profile.firstName +
                      " " +
                      data?.farmer.profile.lastName || "N/A"}{" "}
                    <br />
                    {data?.farmer.email || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data?.land.name || "N/A"} <br />
                    {data?.land.location.state || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data?.source || "N/A"} <br />
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data?.status || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {formatDate(data?.requestDate) || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <Link
                      to={`/single-request/${data._id}`}
                      className="text-green-500 hover:underline"
                    >
                      view
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestPage;
