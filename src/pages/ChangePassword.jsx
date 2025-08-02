import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_URL;

  const { state, dispatch } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [adminCredentials, setAdminCredentials] = useState({
    userId: "",
    currentPassword: "",
    newPassword: "",
  });

  // Set userId after user is loaded
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch({ type: "SET_USER", payload: parsedUser });
      setAdminCredentials((prev) => ({
        ...prev,
        userId: parsedUser?.user?.id || "",
      }));
    } else {
      navigate("/");
    }
  }, [dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (adminCredentials.newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${base_url}/auth/change-password`, adminCredentials);
      // Reset state
      setAdminCredentials({
        userId: adminCredentials.userId,
        currentPassword: "",
        newPassword: "",
      });
      setConfirmPassword("");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while changing password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-md rounded-md w-full max-w-[400px] sm:max-w-[500px] h-auto mx-auto mt-10 p-6 sm:p-8">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>

          {error && (
            <div className="text-red-500 text-sm mb-4">{error}</div>
          )}

          {/* Old Password */}
          <div className="mb-4">
            <label className="block text-sm sm:text-base font-medium py-2">
              Old Password
            </label>
            <input
              type="password"
              value={adminCredentials.currentPassword}
              onChange={(e) =>
                setAdminCredentials({ ...adminCredentials, currentPassword: e.target.value })
              }
              className="bg-[#f6f6f6] rounded-xl outline-none w-full pl-3 py-3 text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
              placeholder="Old Password"
              required
            />
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-sm sm:text-base font-medium py-2">
              New Password
            </label>
            <input
              type="password"
              value={adminCredentials.newPassword}
              onChange={(e) =>
                setAdminCredentials({ ...adminCredentials, newPassword: e.target.value })
              }
              className="bg-[#f6f6f6] rounded-xl outline-none w-full pl-3 py-3 text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
              placeholder="New Password"
              required
            />
          </div>

          {/* Confirm New Password */}
          <div className="mb-6">
            <label className="block text-sm sm:text-base font-medium py-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-[#f6f6f6] rounded-xl outline-none w-full pl-3 py-3 text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
              placeholder="Confirm New Password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#16a349] text-white font-semibold rounded-full px-7 py-2 text-base sm:text-lg w-full sm:w-auto ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
