import { Button, Input, Table } from "antd";
import arrowDown from "../assets/arrow-down.png";
import search from "../assets/search-normal.png";
import user from "../assets/user_img.png";
import verify from "../assets/verify.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PageLaoding from "../components/PageLoading";

const AgentPage = () => {
  const [agentData, setAgentData] = useState([]);
  const [error, setError] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const base_url = import.meta.env.VITE_API_URL;
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${storedUser.token}` },
  };

  useEffect(() => {
    const getLandData = async () => {
      try {
        const res = await axios.get(`${base_url}/admin/users/agent`, config);
        if (Array.isArray(res.data.data)) {
          setAgentData(res.data.data);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    getLandData();
  }, []);

  const toggleDropdown = (index) => {
    setDropdownVisible((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setDropdownVisible(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

const giveApproval = async (id) => {
  try {
    const res = await axios.put(
      `${base_url}/admin/access/${id}`,
      { action: "approve" }, // ✅ Boolean
      config
    );
    console.log("Approved:", res.data);
  } catch (err) {
    console.error("Approval error:", err);
  }
};

const giveDecline = async (id) => {
  try {
    const res = await axios.put(
      `${base_url}/admin/access/${id}`,
      { action: "decline" }, // ✅ Boolean
      config
    );
    console.log("Declined:", res.data);
  } catch (err) {
    console.error("Decline error:", err);
  }
};


  return (
    <div className="bg-white rounded-md p-3">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-[12px] md:text-lg font-semibold">All Agents</h1>
        <div className="flex gap-5">
          <div className="flex items-center rounded-full w-full border px-3">
            <img src={search} className="w-4 h-4 cursor-pointer" />
            <Input
              placeholder="Search Agents....."
              className="ml-2 border-none"
            />
          </div>
        </div>
      </div>

      {agentData.length == 0 ? (
        <PageLaoding />
      ) : (
        <div className="mt-8 overflow-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2 text-left">S/N</th>
                <th className="border border-gray-300 p-2 text-left">Name</th>
                <th className="border border-gray-300 p-2 text-left">Email</th>
                <th className="border border-gray-300 p-2 text-left">Phone</th>
                <th className="border border-gray-300 p-2 text-left">State </th>
                <th className="border border-gray-300 p-2 text-left">Lga</th>
                <th className="border border-gray-300 p-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {agentData.map((data, index) => (
                <tr key={data._id}>
                  <td className="border border-gray-300 p-2">
                    {index + 1 || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data.profile?.firstName + " " + data.profile?.lastName + " " + data?._id ||
                      "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data?.email || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data?.profile?.contact || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data?.location?.state || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data?.location?.lga || "N/A"}
                  </td>
                  {/* <td className="border border-gray-300 p-2">
                    <Link
                      to={`/single-agent/${data._id}`}
                      className="text-green-500 hover:underline"
                    >
                      view
                    </Link>
                  </td> */}
                 <td className="border border-gray-300 p-2">
  <div className="relative dropdown-container">
    <Button className="bg-gray-200" onClick={() => toggleDropdown(index)}>
      Actions
    </Button>
    {dropdownVisible === index && (
      <div className="absolute bg-white border rounded shadow-lg mt-1 z-10">
        <ul className="py-1">
          <li>
            <Link
              to={`/single-agent/${data._id}`}
              className="block px-4 py-2 text-green-500 hover:bg-gray-100"
            >
              View
            </Link>
          </li>
          <li>
            <button
              onClick={() => giveApproval(data._id)}
              className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
            >
              Approve
            </button>
          </li>
          <li>
            <button
              onClick={() => giveDecline(data._id)}
              className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
            >
              Decline
            </button>
          </li>
        </ul>
      </div>
    )}
  </div>
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

export default AgentPage;
