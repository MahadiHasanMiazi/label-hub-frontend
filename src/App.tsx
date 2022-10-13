import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

import { useMatch, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
const dashboardRoute = useMatch("/");
useEffect(() => {
  if (dashboardRoute) {
    navigate("/dashboard");
  }
}, [dashboardRoute, navigate]);
  return (
    <>
      <AppRoutes></AppRoutes>
      <ToastContainer />
    </>
  );
}

export default App;
