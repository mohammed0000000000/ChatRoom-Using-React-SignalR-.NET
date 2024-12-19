import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProp {
  isAuthenticated: boolean;
  redirectPath: string;
  children: ReactNode;
  data?: unknown;
}

const ProtectedRoute = ({
  isAuthenticated,
  redirectPath,
  children,
  data,
}: IProp) => {
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={redirectPath} replace state={data} />
  );
};

export default ProtectedRoute;
