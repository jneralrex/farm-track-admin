import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import DashbordLayout from "./layout/DashbordLayout";
import Dashboard from "./pages/Dashboard"; 
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
 import AdminLogin from "./pages/AdminLogin";
 import LandPage from "./pages/LandPage";
import FarmersManagement from "./pages/Famers";
import AgentPage from "./pages/Agentpage";
import RequestPage from "./pages/RequestPage";
import SingleTest from "./pages/SingleTest";
import SingleFarmer from "./pages/SinlgeFarmer";
import SingleAgent from "./pages/SingleAgent";
import SingleLand from "./pages/SingleLand";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin/>}/>
      <Route path="" element={<DashbordLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/farmers" element={<FarmersManagement />} />
        <Route path="/lands" element={<LandPage />} />
        <Route path="/agents" element={<AgentPage />} />
        <Route path="/requests" element={<RequestPage />} />
        <Route path="/single-agent/:id" element={<SingleAgent />} />
        <Route path="/single-request/:id" element={<SingleTest />} />
        <Route path="/single-farmer/:id" element={<SingleFarmer />} />
        <Route path="/land-details/:id" element={<SingleLand />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
}


export default App;
