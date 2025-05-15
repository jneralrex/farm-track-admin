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
                    <td className="border border-gray-300 p-2">
                      <Link
                        to={`/single-farmer/${farmer._id}`}
                        className="text-green-500 hover:underline"
                      >
                        view
                      </Link>
                    </td>
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
