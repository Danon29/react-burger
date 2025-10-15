import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resetPasword } from "../../utils/authApi";

const ForgotPassword: React.FC = () => {
  const [codeValue, setCodeValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          const result = await resetPasword({
            password: passwordValue,
            code: codeValue,
          });
          if (result.message === "Reset email sent")
            navigate("/reset-password");
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }}
      className="page-form"
    >
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <PasswordInput
        placeholder="Введите новый пароль"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        extraClass="mb-6"
        name="password"
      />

      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={(e) => setCodeValue(e.target.value)}
        value={codeValue}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />

      {loading ? (
        <h1>Загрузка...</h1>
      ) : (
        <Button htmlType="submit" type="primary" extraClass="mb-20">
          Сохранить
        </Button>
      )}

      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?{" "}
        <Link className="page-link" to={"/login"}>
          Войти
        </Link>
      </p>
    </form>
  );
};
export default ForgotPassword;
