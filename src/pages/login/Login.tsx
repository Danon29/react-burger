import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { loginUser } from "../../services/auth/authSlice";
import Spinner from "../../components/Spinner/Spinner";

const Login: React.FC = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, user } = useAppSelector((store) => store.auth);

  useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email: emailValue, password: passwordValue }));
  };

  return (
    <form onSubmit={handleSubmit} className="page-form">
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <EmailInput
        placeholder="E-mail"
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        extraClass="mb-6"
        name="email"
      />
      <PasswordInput
        placeholder="Пароль"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        extraClass="mb-6"
        name="password"
      />
      {loading ? (
        <div className="pt-4 pb-10">
          <Spinner />
        </div>
      ) : (
        <Button
          htmlType="submit"
          type="primary"
          extraClass="mb-20"
          disabled={loading}
        >
          {"Войти"}
        </Button>
      )}

      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы — новый пользователь?{" "}
        <Link className="page-link" to={"/register"}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{" "}
        <Link className="page-link" to={"/forgot-password"}>
          Восстановить пароль
        </Link>
      </p>

      {error && <p>{error}</p>}
    </form>
  );
};
export default Login;
