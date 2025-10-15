import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../services/rootReducer";
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

  const isAuthChecked = useSelector(getIsAuthChecked);

  const { error, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [error, navigate, location]);

  if (!isAuthChecked) {
    return <h1>Загрузка...</h1>;
  }

  if (onlyAuthedAccess && !user) {
    return <Navigate to="/login" replace />;
  }

  if (!onlyAuthedAccess && user) {
    return <Navigate to={"/"} replace />;
  }

  return <>{element}</>;
};

export const AuthedRoute = ProtectedRoute;
export const UnauthedRoute: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => <ProtectedRoute onlyAuthedAccess={false} element={element} />;
