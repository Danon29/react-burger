import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../services/store";
import { registerUser } from "../../services/auth/authSlice";
import Spinner from "../../components/Spinner/Spinner";

const Register: React.FC = () => {
  const [name, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, user } = useAppSelector((store) => store.auth);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({ email: emailValue, password: passwordValue, name: name }),
    );
  };

  return (
    <form onSubmit={handleSubmit} className="page-form">
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => setNameValue(e.target.value)}
        value={name}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
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
          {"Зарегистрироваться"}
        </Button>
      )}

      <p className="text text_type_main-default text_color_inactive mb-4">
        Уже зарегистрированы?{" "}
        <Link className="page-link" to={"/login"}>
          Войти
        </Link>
      </p>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Register;
