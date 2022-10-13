import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface IPrivateprop {
  children: JSX.Element;
}
const ProtectedRoute = ({ children }: IPrivateprop) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default ProtectedRoute;
