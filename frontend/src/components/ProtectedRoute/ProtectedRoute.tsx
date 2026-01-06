import { useGetAdminQuery } from "../../redux/slices/quizApiSlice";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { data, isLoading, isError } = useGetAdminQuery({});
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError || !data) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
