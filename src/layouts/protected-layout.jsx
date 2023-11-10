import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/loader";

const ProtectedLayout = () => {
  const { user, isLoading } = useAuth();
  // const { user } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (!user && !isLoading) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
