import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "./../Navbar/Navbar";
import "./Layout.css";
const Layout = () => {
  return (
    <section className="layout-wrapper">
      <main className="dashboard">
        <Sidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
     
    </section>
  );
};
export default Layout;
