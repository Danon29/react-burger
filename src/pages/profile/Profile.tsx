import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { logOut } from "../../services/slices/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Spinner from "../../components/Spinner/Spinner";

function Profile() {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.auth.loading);
  return (
    <main className="page-container page-container-profile">
      <div className="page-container-profile-wrapper">
        <nav className="page-container-profile-sidebar ml-5 mr-15">
          <ul>
            <li>
              <NavLink to="" end>
                {({ isActive }) => (
                  <span
                    className={`text text_type_main-medium ${
                      isActive ? "text_color_primary" : "text_color_inactive"
                    }`}
                  >
                    Профиль
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to={"orders"}>
                {({ isActive }) => (
                  <span
                    className={`text text_type_main-medium ${
                      isActive ? "text_color_primary" : "text_color_inactive"
                    }`}
                  >
                    История заказов
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              {isLoading ? (
                <Spinner />
              ) : (
                <button
                  onClick={() => dispatch(logOut())}
                  type="button"
                  className="text text_type_main-medium text_color_inactive btn-as-link pt-3"
                  style={{ background: "none", border: "none" }}
                >
                  Выход
                </button>
              )}
            </li>
          </ul>
          <p className="text text_type_main-default text_color_dark mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </nav>

        <Outlet />
      </div>
    </main>
  );
}

export default Profile;
