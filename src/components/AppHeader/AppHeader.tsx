import IconLink from "../IconLink/IconLink";
import styles from "./AppHeader.module.scss";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <IconLink href="/" icon={BurgerIcon} isLinkActive>
            Конструктор
          </IconLink>
          <IconLink href="/" icon={ListIcon}>
            Лента заказов
          </IconLink>
        </div>

        <div className={styles.center}>
          <Logo />
        </div>

        <div className={styles.right}>
          <IconLink href="/" icon={ProfileIcon}>
            Личный кабинет
          </IconLink>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
