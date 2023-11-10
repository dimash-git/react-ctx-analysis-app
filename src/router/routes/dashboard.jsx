import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard-wrapper">
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
