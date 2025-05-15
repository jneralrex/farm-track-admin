import { Button, Input, Modal } from "antd";
import search from "../assets/search-normal.png";
import { useEffect, useState } from "react";
import axios from "axios";
import PageLaoding from "../components/PageLoading";
import { Link } from "react-router-dom";

const FarmersManagement = () => {
  const base_url = import.meta.env.VITE_API_URL;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(null);

  const [farmersData, setFarmersData] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${storedUser.token}` },
  };

  // Fetch Farmers
  const getfarmers = async () => {
    try {
      const res = await axios.get(`${base_url}/admin/users/farmer`, config);
      console.log(res.data.data);

      setFarmersData(res.data.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete Coupon Function
  const handleDelete = async (userId) => {
    if (!userId) {
      setError("Invalid user ID provided for deletion.");
      return;
    }
    try {
      const payload = { user_id: userId };
      const res = await axios.post(`${base_url}/user/cancel-coupon`, payload);
      if (res.data.status) {
        alert("Coupon deleted successfully.");
        getfarmers();
      } else {
        setError(res.data.message || "Failed to delete coupon");
      }
    } catch (err) {
      setError(
        `Failed to delete: ${err.response?.data?.message || err.message}`
      );
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        { action: "approve" },
        config
      );
      getfarmers();

    } catch (err) {
      console.error("Approval error:", err);
    }
  };

  const giveDecline = async (id) => {
    try {
      const res = await axios.put(
        `${base_url}/admin/access/${id}`,
        { action: "decline" },
        config
      );
      getfarmers();

    } catch (err) {
      console.error("Decline error:", err);
    }
  };

  useEffect(() => {
    getfarmers();
  }, []);

  return (
    <div className="bg-white rounded-md p-3">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-[12px] md:text-lg font-semibold">All farmers</h1>
        <div className="flex gap-5">
          <div className="flex items-center rounded-full w-full border px-3">
            <img src={search} className="w-4 h-4 cursor-pointer" />
            <Input
              placeholder="Search farmer....."
              className="ml-2 border-none"
            />
          </div>
        </div>
      </div>

      {farmersData.length == 0 ? (
        <PageLaoding></PageLaoding>
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
                <th className="border border-gray-300 p-2 text-left">Status </th>

                <th className="border border-gray-300 p-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {farmersData.map((farmer, index) => (
                <tr key={farmer._id}>
                  <td className="border border-gray-300 p-2">
                    {index + 1 || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {farmer.profile?.firstName +
                      " " +
                      farmer.profile?.lastName || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {farmer?.email || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {farmer?.profile?.contact || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {farmer?.location?.state || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {farmer?.location?.lga || "N/A"}
                  </td>

                   <td className="border border-gray-300 p-2">
                    {farmer?.status === true ? <span className="text-green-400">Approved</span> : <span className="text-red-400">Declined</span> }
                  </td>

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
                                to={`/single-farmer/${farmer._id}`}
                                className="block px-4 py-2 text-green-500 hover:bg-gray-100"
                              >
                                View
                              </Link>
                            </li>
                            <li>
                              <button
                                onClick={() => giveApproval(farmer._id)}
                                className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
                              >
                                Approve
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => giveDecline(farmer._id)}
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
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default FarmersManagement;
