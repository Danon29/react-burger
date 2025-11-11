import { useEffect } from "react";
import "./App.scss";
import AppHeader from "../components/AppHeader/AppHeader";
import { fetchIngredients } from "../services/slices/ingredients/ingredientsSlice";
import { useAppDispatch } from "../hooks/reduxHooks";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
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
  OrderFeedPage,
} from "../pages";
import {
  AuthedRoute,
  UnauthedRoute,
} from "../components/ProtectedRoute/ProtectedRoute";
import IngredientDetailPage from "../pages/ingredient-detail/IngredientDetailPage";
import Modal from "../components/Modal/Modal";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import { fetchAuthUser } from "../services/slices/auth/authSlice";
import { OrderInfo } from "../components/OrderInfo/OrderInfo";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(fetchAuthUser());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };

  const OrderInfoModal = () => {
    const { number } = useParams<{ number: string }>();
    return (
      <Modal title={`#${number}`} onClose={handleModalClose}>
        <OrderInfo insideModal={true} />
      </Modal>
    );
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
            element={<AuthedRoute element={<OrderInfo />} />}
            path="/profile/orders/:number"
          ></Route>

          <Route path="/ingredients/:id" element={<IngredientDetailPage />} />

          <Route path="/feed" element={<OrderFeedPage />} />
          <Route path="/feed/:number" element={<OrderInfo />}></Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal title="Детали ингредиента" onClose={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route path="/feed/:number" element={<OrderInfoModal />} />

            <Route
              path="/profile/orders/:number"
              element={<OrderInfoModal />}
            />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
