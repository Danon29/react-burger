import IconLink from "../IconLink/IconLink";
import styles from "./AppHeader.module.scss";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <IconLink href="/" icon={BurgerIcon}>
            Конструктор
          </IconLink>
          <IconLink href="/feed" icon={ListIcon}>
            Лента заказов
          </IconLink>
        </div>

        <div className={styles.center} onClick={() => navigate("/")}>
          <Logo />
        </div>

        <div className={styles.right}>
          <IconLink href="/profile" icon={ProfileIcon}>
            Личный кабинет
          </IconLink>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
