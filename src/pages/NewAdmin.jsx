import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/coat.png";
import { FaSpinner } from "react-icons/fa";

const AdminSignup = () => {
    const navigate = useNavigate();
    const base_url = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "admin", // Default to admin
        firstName: "",
        lastName: "",
        middleName: "",
        contact: "",
        address: "",
        nin: "",
        longitude: "",
        latitude: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const payload = {
            ...formData,
            location: {
                type: "Point",
                coordinates: [
                    parseFloat(formData.longitude),
                    parseFloat(formData.latitude),
                ],
            },
        };

        try {
            const res = await axios.post(`${base_url}/auth/register`, payload);
            setFormData({
                email: "",
                password: "",
                role: "admin", // Default to admin
                firstName: "",
                lastName: "",
                middleName: "",
                contact: "",
                address: "",
                nin: "",
                longitude: "",
                latitude: "",
            });
               navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred during signup.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#f9fafb] z-50 w-screen">
            <div className="bg-white w-full max-w-[400px] h-[400px] rounded-xl p-5 overflow-auto">
                <div className="flex items-center justify-center mb-4 flex-col">
                    <h2 className="font-bold text-xl mb-3">ADMIN SIGNUP</h2>
                    <img src={logo} alt="logo" className="size-20" />
                </div>

                <form onSubmit={handleSignup} className="space-y-3">
                    {/* Personal Info */}
                    {[
                        { label: "First Name", name: "firstName" },
                        { label: "Middle Name", name: "middleName" },
                        { label: "Last Name", name: "lastName" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "Password", name: "password", type: "password" },
                        { label: "Contact", name: "contact" },
                        { label: "Address", name: "address" },
                        { label: "NIN", name: "nin" },
                        { label: "Longitude", name: "longitude" },
                        { label: "Latitude", name: "latitude" },
                    ].map(({ label, name, type = "text" }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium py-1">{label}:</label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                className="p-3 outline-none bg-[#dedede] rounded-md w-full"
                                required
                            />
                        </div>
                    ))}

                    {/* Role Selector */}
                    <div>
                        <label className="block text-sm font-medium py-1">Role:</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="p-3 outline-none bg-[#dedede] rounded-md w-full"
                            required
                        >
                            <option value="admin">Admin</option>
                            <option value="farmer">Farmer</option>
                            <option value="agent">Agent</option>
                        </select>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Submit Button */}
                    {loading ? (
                        <div className="flex justify-center items-center mt-4">
                            <FaSpinner className="animate-spin text-green-500" />
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className="bg-[#16A349] text-white py-2 px-10 rounded-md mt-4 w-full"
                        >
                            Sign Up
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AdminSignup;
