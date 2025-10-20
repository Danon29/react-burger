import React, { useEffect } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getIsAuthChecked } from "../../services/auth/authSlice";

interface ProtectedRouteProps {
  onlyAuthedAccess?: boolean;
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  onlyAuthedAccess = true,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthChecked = useAppSelector(getIsAuthChecked);

  const { error, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [error, navigate, location]);

  if (!isAuthChecked) {
    return <h1>Загрузка...</h1>;
  }

  if (onlyAuthedAccess && !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!onlyAuthedAccess && user) {
    const from = (location.state as any)?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return <>{element}</>;
};

export const AuthedRoute = ProtectedRoute;
export const UnauthedRoute: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => <ProtectedRoute onlyAuthedAccess={false} element={element} />;
