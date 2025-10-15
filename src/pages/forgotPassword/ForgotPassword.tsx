import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../utils/authApi";
import { useAppSelector } from "../../hooks/reduxHooks";

const ForgotPassword: React.FC = () => {
  const [emailValue, setEmailValue] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          const result = await forgotPassword(emailValue);
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
      <EmailInput
        placeholder="Укажите e-mail"
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        extraClass="mb-6"
        name="email"
      />

      {loading ? (
        <h1>Загрузка...</h1>
      ) : (
        <Button htmlType="submit" type="primary" extraClass="mb-20">
          Восстановить
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
