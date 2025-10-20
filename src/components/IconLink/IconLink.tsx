import styles from "./IconLink.module.scss";
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";
import { NavLink } from "react-router-dom";

const IconLink: React.FC<Props> = ({ icon: Icon, href, children }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.active : ""} pt-4 pb-4 pl-5 pr-5 mt-4 mb-4`
      }
    >
      {({ isActive }) => (
        <>
          <div className="pr-2">
            <Icon type={isActive ? "primary" : "secondary"} />
          </div>
          <span
            className={`text text_type_main-default ${
              isActive ? "text_color_primary" : "text_color_inactive"
            }`}
          >
            {children}
          </span>
        </>
      )}
    </NavLink>
  );
};

interface Props {
  children: React.ReactNode;
  icon: React.FC<TIconProps>;
  href: string;
}

export default IconLink;
