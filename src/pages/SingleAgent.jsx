import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const SingleAgent = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: { Authorization: `Bearer ${storedUser.token}` },
    };
    const { id } = useParams();
    const base_url = import.meta.env.VITE_API_URL;

    const [singleAgent, setSingleAgent] = useState(null);

    useEffect(() => {
        const getSingleAgent = async () => {
            try {
                const res = await axios.get(`${base_url}/admin/agent/${id}`, config);
                console.log(res.data.data);
                setSingleAgent(res.data.data); 
            } catch (error) {
                console.error("Error fetching farmer data:", error);
            }
        };
        getSingleAgent();
    }, [id]);

  return (
    <div>SingleAgent</div>
  )
}

export default SingleAgent