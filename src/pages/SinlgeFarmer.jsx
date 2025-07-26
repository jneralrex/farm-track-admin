import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLaoding from '../components/PageLoading';

const SingleFarmer = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: { Authorization: `Bearer ${storedUser.token}` },
    };
    const { id } = useParams();
    const base_url = import.meta.env.VITE_API_URL;

    const [singleFarmer, setSingleFarmer] = useState(null);

    useEffect(() => {
        const getSingleFarmer = async () => {
            try {
                const res = await axios.get(`${base_url}/admin/user/${id}`, config);
                setSingleFarmer(res.data.data);  // Assuming `data` contains the user info
            } catch (error) {
                console.error("Error fetching farmer data:", error);
            }
        };
        getSingleFarmer();
    }, [id]);

    if (!singleFarmer) {
        return <PageLaoding />; 
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold text-gray-800">Farmer Details</h2>

            <div className="bg-white p-4 mt-4 shadow rounded-lg">
                <h3 className="text-xl font-bold text-gray-700">
                    {singleFarmer.profile.firstName} {singleFarmer.profile.middleName} {singleFarmer.profile.lastName}
                </h3>
                <p className="text-gray-600"><strong>Email:</strong> {singleFarmer.email}</p>
                <p className="text-gray-600"><strong>Role:</strong> {singleFarmer.role}</p>

                <h4 className="text-lg font-semibold mt-4">Location</h4>
                <p className="text-gray-600"><strong>Address:</strong> {singleFarmer.location.address}</p>
                <p className="text-gray-600"><strong>LGA:</strong> {singleFarmer.location.lga}</p>
                <p className="text-gray-600"><strong>State:</strong> {singleFarmer.location.state}</p>
                <p className="text-gray-600"><strong>Ward:</strong> {singleFarmer.location.ward}</p>

                <h4 className="text-lg font-semibold mt-4">Contact Info</h4>
                <p className="text-gray-600"><strong>Phone:</strong> {singleFarmer.profile.contact}</p>
            </div>
        </div>
    );
};

export default SingleFarmer;
