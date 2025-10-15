import { useEffect } from "react";
import "./App.scss";
import AppHeader from "../components/AppHeader/AppHeader";
import { fetchIngredients } from "../services/ingredients/ingredientsSlice";
import { useAppDispatch } from "../hooks/reduxHooks";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  MainPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  ProfileEditPage,
  NotFoundPage,
  ProfileOrdersPage,
} from "../pages";
import {
  AuthedRoute,
  UnauthedRoute,
} from "../components/ProtectedRoute/ProtectedRoute";
import IngredientDetailPage from "../pages/ingredient-detail/IngredientDetailPage";
import Modal from "../components/Modal/Modal";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import { useAppSelector } from "../hooks/reduxHooks";
import { IngreditentsData } from "../types";
import { fetchAuthUser } from "../services/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const detailedItem = useAppSelector(
    (state) => state.currentIngredient.ingredient,
  );

  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(fetchAuthUser());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className="App">
      <AppHeader />
      <main>
        <Routes location={background || location}>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/login"
            element={<UnauthedRoute element={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<UnauthedRoute element={<RegisterPage />} />}
          />
          <Route
            path="/forgot-password"
            element={<UnauthedRoute element={<ForgotPasswordPage />} />}
          />
          <Route
            path="/reset-password"
            element={<UnauthedRoute element={<ResetPasswordPage />} />}
          />
          <Route path="/profile" element={<ProfilePage />}>
            <Route
              index
              element={<AuthedRoute element={<ProfileEditPage />} />}
            />
            <Route
              path="orders"
              element={<AuthedRoute element={<ProfileOrdersPage />} />}
            />
          </Route>
          <Route
            path="/ingredients/:id"
            element={<AuthedRoute element={<IngredientDetailPage />} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal title="Детали ингредиента" onClose={handleModalClose}>
                  <IngredientDetails item={detailedItem as IngreditentsData} />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
