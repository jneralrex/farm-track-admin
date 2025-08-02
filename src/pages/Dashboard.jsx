import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import followers from "../assets/followers.png";
import following from "../assets/following.png";
import community from "../assets/community.png";
import arrowRight from "../assets/arrow-right.png";
import axios from "axios";
import { useUserContext } from "../context/UserContext.jsx";
import BarChart from "../components/FarmerBar.jsx";
import FarmBarChart from "../components/FarmBarChart.jsx";
import AgentBarChart from "../components/AgentBarChart.jsx";
import TestBarChart from "../components/TestBarChart.jsx";
import LandBarChart from "../components/LandBarChart.jsx";
import PageLaoding from "../components/PageLoading.jsx";
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);
const Dashboard = () => {
  const base_url = import.meta.env.VITE_API_URL;
  const { state } = useUserContext();
  const [farmersData, setFarmersData] = useState([]);
  const [agentsData, setAgentsData] = useState([]);
  const [landData, setLandsData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: { Authorization: `Bearer ${storedUser.token}` },
  };

  useEffect(() => {
    // If no user, navigate to login
    if (!storedUser) {
      navigate("/login");
    } else {
      // Fetch data only if user exists

      const getFamers = async () => {
        try {
          const res = await axios.get(`${base_url}/admin/users/farmer`, config);

          setFarmersData(res.data.data || []);
        } catch (err) {
          setError(err.message);
        }
      };

      const getAgents = async () => {
        try {
          const res = await axios.get(`${base_url}/admin/users/agent`, config);
          console.log("agent", res.data.data)
          if (Array.isArray(res.data.data)) {
            setAgentsData(res.data.data);
          }
        } catch (err) {
          setError(err.message);
        }
      };

      const getTestData = async () => {
        try {
          const res = await axios.get(`${base_url}/admin/requests`, config);
          if (Array.isArray(res.data.data)) {
            console.log(res.data.data);
            setTestData(res.data.data);
          }
        } catch (err) {
          setError(err.message);
        }
      };

      const getLandData = async () => {
        try {
          const res = await axios.get(`${base_url}/admin/lands`, config);
          if (Array.isArray(res.data.data)) {
            console.log(res.data.data)
            setLandsData(res.data.data);
          }
        } catch (err) {
          setError(err.message);
        }
      };
      getFamers();
      getAgents();
      getTestData();
      getLandData();
    }
  }, []);

  // Define data for the grid
  const data = [
    {
      key: 1,
      small_title: "Farmers",
      content: `${farmersData.length} Farmers`,
      img: followers,
      from: "",
    },
    {
      key: 2,
      small_title: "Lands",
      content: `${landData.length} Lands`,
      img: following,
      from: "",
    },
    {
      key: 3,
      small_title: "Tests Requests",
      content: `${testData.length} Requests`,
      img: community,
      from: "",
    },
    {
      key: 4,
      small_title: "Agents",
      content: `${agentsData.length} Agents`,
      img: followers,
      from: "",
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two digits
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    return `${year}/${month}/${day}`;
  };

  return (
    <div>
      <div className="mt-2 grid grid-cols-2 lg:grid-cols-4 items-center justify-between flex-wrap gap-3">
        {data.map((e, index) => (
          <div
            className="bg-white w-full mt-3 p-2 md:p-4 rounded-md flex flex-col h-[115px] md:h-[inherit]"
            key={index}
          >
            <p className="mb-2 text-center w-full md:text-start">
              {e.small_title}
            </p>
            <div className="flex gap-2 items-center justify-between">
              <div className="flex gap-2 items-center flex-col md:flex-row  w-full justify-center md:justify-start">
                <img src={e.img} className="w-7" alt="icon" />
                <p className="font-semibold text-[12px]  md:text-lg">
                  {e.content}
                </p>
              </div>
              <div>
                <img src={arrowRight} alt="arrow-right" className="" />
              </div>
            </div>
            <div className="bg-[#EDFEF6] mt-3 w-28 rounded flex items-center justify-center">
              <p className="text-[#55E8AD] text-xs">{e.from}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div className="w-full bg-white rounded-md shadow-lg p-5 max-h-[400px]">
          {farmersData.length > 0 ? (
            <FarmBarChart farmersData={farmersData} />
          ) : (
            <PageLaoding />)}
        </div>
        <div className="w-full bg-white rounded-md shadow-lg p-5 max-h-[400px] ">
          {agentsData.length > 0 ? (
            <AgentBarChart agentsData={agentsData} />
          ) : (
            <PageLaoding />)}
        </div>
      </div>

      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div className="w-full bg-white rounded-md shadow-lg p-5 max-h-[400px] flex flex-col items-center justify-center">
          {testData.length > 0 ? (
            <TestBarChart testData={testData} />
          ) : (
            <PageLaoding />)}
        </div>
        <div className="w-full bg-white rounded-md shadow-lg p-5  max-h-[400px]">
          {landData.length > 0 ? (
            <LandBarChart landData={landData} />
          ) : (
            <PageLaoding />)}
        </div>
      </div>

      <div className="mt-[20px]">
        <p className="w-full text-center"> Test request</p>
        {testData.length == 0 ? (
          <PageLaoding />
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-2 text-left">S/N</th>
                  <th className="border border-gray-300 p-2 text-left">
                    Agent
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Famer
                  </th>
                  <th className="border border-gray-300 p-2 text-left">Land</th>
                  <th className="border border-gray-300 p-2 text-left">
                    Source{" "}
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Status
                  </th>
                  <th className="border border-gray-300 p-2 text-left">Date</th>
                  <th className="border border-gray-300 p-2 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {testData.slice(0, 5).map((data, index) => (
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

      <div className="mt-[20px]">
        <p className="w-full text-center"> Famers</p>
        {farmersData.length == 0 ? (
          <PageLaoding />
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-2 text-left">S/N</th>
                  <th className="border border-gray-300 p-2 text-left">Name</th>
                  <th className="border border-gray-300 p-2 text-left">
                    Email
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Phone
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    State{" "}
                  </th>
                  <th className="border border-gray-300 p-2 text-left">Lga</th>
                  <th className="border border-gray-300 p-2 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {farmersData.slice(0, 5).map((farmer, index) => (
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
                      <Link
                        to={`/single-farmer/${farmer._id}`}
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

      <div className="mt-[20px]">
        <p className="w-full text-center"> Agents</p>
        {agentsData.length == 0 ? (
          <PageLaoding />
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-2 text-left">S/N</th>
                  <th className="border border-gray-300 p-2 text-left">Name</th>
                  <th className="border border-gray-300 p-2 text-left">Role</th>
                  <th className="border border-gray-300 p-2 text-left">
                    Email
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Phone
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    State{" "}
                  </th>
                  <th className="border border-gray-300 p-2 text-left">Lga</th>
                  <th className="border border-gray-300 p-2 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {agentsData.slice(0, 5).map((agent, index) => (
                  <tr key={agent._id}>
                    <td className="border border-gray-300 p-2">
                      {index + 1 || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {agent.profile?.firstName +
                        " " +
                        agent.profile?.lastName || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {agent?.role || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {agent?.email || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {agent?.profile?.contact || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {agent?.location?.state || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {agent?.location?.lga || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <Link
                        to={`/single-agent/${agent._id}`}
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

      <div className="mt-[20px]">
        <p className="w-full text-center"> Land</p>
        {landData.length == 0 ? (
          <PageLaoding />
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-2 text-left">S/N</th>
                  <th className="border border-gray-300 p-2 text-left">Farmer</th>
                  <th className="border border-gray-300 p-2 text-left">Land type</th>
                  <th className="border border-gray-300 p-2 text-left">
                    Cureent crop
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Location
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Coordinate
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Ownership
                  </th>
                  <th className="border border-gray-300 p-2 text-left">Total area</th>
                  <th className="border border-gray-300 p-2 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {landData.slice(15, 20).map((land, index) => (
                  <tr key={land._id}>
                    <td className="border border-gray-300 p-2">
                      {index + 1 || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {land.name || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {land?.landType || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {land?.currentCrop || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {land?.location?.state || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {land?.location?.coordinates?.latitude || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {land?.ownership || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {`${land.totalArea.value},${land.totalArea.unit}` || "N/A"}
                    </td>

                    <td className="border border-gray-300 p-2">
                      <Link
                        to={`/land-details/${land._id}`}
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
    </div>
  );
};

export default Dashboard;
