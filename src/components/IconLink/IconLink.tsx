import styles from "./IconLink.module.scss";
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

const IconLink: React.FC<Props> = ({
  icon: Icon,
  href,
  children,
  isLinkActive = false,
}) => {
  return (
    <a
      href={href}
      className={`${styles.link} ${
        isLinkActive ? styles.active : ""
      } pt-4 pb-4 pl-5 pr-5 mt-4 mb-4`}
    >
      <div className="pr-2">
        <Icon type={`${isLinkActive ? "primary" : "secondary"}`} />
      </div>
      <span
        className={`text text_type_main-default ${
          isLinkActive ? "text_color_primary" : "text_color_inactive"
        }`}
      >
        {children}
      </span>
    </a>
  );
};

interface Props {
  children: React.ReactNode;
  icon: React.FC<TIconProps>;
  href: string;
  isLinkActive?: boolean;
}

export default IconLink;
