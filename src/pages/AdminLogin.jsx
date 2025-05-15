import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext.jsx";
import { FaSpinner } from "react-icons/fa";


const AdminLogin = () => {
    const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_URL;
  const { dispatch } = useUserContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${base_url}/auth/login`,
        adminCredentials
      );
      setLoading(false);
      const userData = res.data.data;
      dispatch({ type: 'SET_USER', payload: userData });
      localStorage.setItem("user", JSON.stringify(userData));  // Persist user data
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-[rgb(165,165,165)] z-50 w-screen">
        <div className="bg-white w-full max-w-[400px] h-auto rounded-xl p-5">
          <h2 className="font-bold text-xl mb-3">AGRICULTURE ADMIN</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium py-2">
                Email:
              </label>
              <input
                type="email"
                name="email"
                className="p-3 outline-none bg-[#dedede] rounded-md w-full"
                placeholder="Email"
                value={adminCredentials.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium py-2"
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                className="p-3 outline-none bg-[#dedede] rounded-md w-full"
                placeholder="Password"
                value={adminCredentials.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {loading ? (
              <div className="flex justify-center items-center">
                <FaSpinner className="animate-spin text-green-500" />
              </div>
            ):( <button
              type="submit"
              className="bg-[#16A349] text-white py-2 px-10 rounded-md mt-4 w-full"
            >
              Login
            </button>)}
           
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
