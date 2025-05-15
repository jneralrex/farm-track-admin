import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const SingleLand = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: { Authorization: `Bearer ${storedUser.token}` },
    };
    const { id } = useParams();
    const base_url = import.meta.env.VITE_API_URL;

    const [singleFamr, setSingleFarm] = useState(null);

    useEffect(() => {
        const getSingleFarm = async () => {
            try {
                const res = await axios.get(`${base_url}/admin/lands/${id}`, config);
                console.log(res.data.data);
                setSingleFarm(res.data.data); 
            } catch (error) {
                console.error("Error fetching farmer data:", error);
            }
        };
        getSingleFarm();
    }, [id]);
  return (
    <div>SingleFarm</div>
  )
}

export default SingleLand