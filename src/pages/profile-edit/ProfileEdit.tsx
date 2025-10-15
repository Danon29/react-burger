import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { updateUser } from "../../services/auth/authSlice";
import Spinner from "../../components/Spinner/Spinner";

const ProfileEdit = () => {
  const { user } = useAppSelector((store) => store.auth);

  const [name, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [showActionBtns, setShowActionsBtns] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      setNameValue(user.name ?? "");
      setEmailValue(user.email ?? "");
      setPasswordValue("mockData");
    }
  }, [user]);

  const inputChangeHandler = (
    inputName: "name" | "email" | "password",
    event: ChangeEvent,
  ) => {
    const value = (event.target as HTMLInputElement).value;
    let haveChanges = false;
    if (inputName === "name") {
      setNameValue(value);
      haveChanges = value !== user?.name;
    }
    if (inputName === "email") {
      setEmailValue(value);
      haveChanges = value !== user?.email;
    }
    if (inputName === "password") {
      setPasswordValue(value);
      haveChanges = value !== "mockData";
    }

    setShowActionsBtns(haveChanges);
  };

  const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(
        updateUser({
          name,
          email: emailValue,
          password: passwordValue,
        } as {
          name: string;
          email: string;
          password: string;
        }),
      ).unwrap();
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setIsLoading(false);

      setShowActionsBtns(false);
    }
  };

  const cancelChangesBtnHandler = () => {
    setNameValue(user?.name ?? "");
    setEmailValue(user?.email ?? "");
    setPasswordValue("mockData");
    setShowActionsBtns(false);
  };

  return (
    <form className="page-container-inner" onSubmit={formSubmitHandler}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => inputChangeHandler("name", e)}
        value={name}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        icon="EditIcon"
      />
      <EmailInput
        placeholder="E-mail"
        value={emailValue}
        onChange={(e) => inputChangeHandler("email", e)}
        extraClass="mb-6"
        name="email"
        isIcon
      />
      <PasswordInput
        extraClass="mb-6"
        name="password"
        value={passwordValue}
        onChange={(e) => inputChangeHandler("password", e)}
        icon="EditIcon"
        placeholder="Пароль"
      />

      {showActionBtns &&
        (isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spinner />
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={cancelChangesBtnHandler}
              htmlType="button"
              type="secondary"
              size="medium"
              extraClass="ml-2"
            >
              Отмена
            </Button>
            <Button
              disabled={!(name && emailValue && passwordValue)}
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass="ml-2"
            >
              Сохранить
            </Button>
          </div>
        ))}
    </form>
  );
};

export default ProfileEdit;
