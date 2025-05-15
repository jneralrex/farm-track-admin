import { Button, Input, Table } from "antd";
import arrowDown from "../assets/arrow-down.png";
import search from "../assets/search-normal.png";
import user from "../assets/user_img.png";
import verify from "../assets/verify.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PageLaoding from "../components/PageLoading";

const LandPage = () => {
  const [landsData, setLandsData] = useState([]);
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
        const res = await axios.get(`${base_url}/admin/lands`, config);
        if (Array.isArray(res.data.data)) {
          setLandsData(res.data.data);
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

  return (
    <div className="bg-white rounded-md p-3">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-[12px] md:text-lg font-semibold">All Land</h1>
        <div className="flex gap-5">
          <div className="flex items-center rounded-full w-full border px-3">
            <img src={search} className="w-4 h-4 cursor-pointer" />
            <Input
              placeholder="Search lands....."
              className="ml-2 border-none"
            />
          </div>
        </div>
      </div>

      {landsData.length == 0 ? (
        <PageLaoding />
      ) : (
        <div className="mt-8 overflow-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2 text-left">S/N</th>
                <th className="border border-gray-300 p-2 text-left">Naame</th>
                <th className="border border-gray-300 p-2 text-left">Size</th>
                <th className="border border-gray-300 p-2 text-left">Crop</th>
                <th className="border border-gray-300 p-2 text-left">
                  Location{" "}
                </th>
                <th className="border border-gray-300 p-2 text-left">Type</th>
                <th className="border border-gray-300 p-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {landsData.map((data, index) => (
                <tr key={data._id}>
                  <td className="border border-gray-300 p-2">
                    {index + 1 || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data?.name || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data?.totalArea?.value + " " + data?.totalArea?.unit ||
                      "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data?.currentCrop || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data?.location?.address || "N/A"} <br />
                    {"Lat - " +
                      data?.location?.coordinates?.latitude +
                      ",  Long" +
                      data?.location?.coordinates?.longitude || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data?.landType || "N/A"}
                  </td>
                  {/* <td className="border border-gray-300 p-2">
                    <Link
                      to={`/land-details/${data._id}`}
                      className="text-green-500 hover:underline"
                    >
                      view
                    </Link>
                   
                    <div className=" shadow-lg z-10 group-hover:block">
              <div className="rounded-lg md:w-[150px] p-4 flex flex-col gap-2 text-start">
                <Link
                  to="/about"
                  className="block text-[10px] md:text-[12px] hover:text-[#c3671a]"
                >
                  About us
                </Link>
                <Link
                  to="/safety"
                  className="block text-[10px] md:text-[12px] hover:text-[#c3671a]"
                >
                  Safety & Compliance
                </Link>
                <Link
                  to="/contact"
                  className="block text-[10px] md:text-[12px] hover:text-[#c3671a]"
                >
                  Contact Us
                </Link>
              </div>
            </div>
                  </td> */}
                  <td className="border border-gray-300 p-2">
                    <td className="border border-gray-300 p-2">
                      <div className="relative dropdown-container">
                        <Button
                          className="bg-gray-200"
                          onClick={() => toggleDropdown(index)}
                        >
                          Actions
                        </Button>
                        {dropdownVisible === index && (
                          <div className="absolute bg-white border rounded shadow-lg mt-1 z-10">
                            <ul className="py-1">
                              <li>
                                <Link
                                  to={`/land-details/${data._id}`}
                                  className="block px-4 py-2 text-green-500 hover:bg-gray-100"
                                >
                                  View
                                </Link>
                              </li>
                              <li>
                                <button
                                  onClick={() => handleApprove(data._id)}
                                  className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
                                >
                                  Approve
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => handleDecline(data._id)}
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

export default LandPage;
