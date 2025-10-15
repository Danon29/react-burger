import styles from "./NotFound.module.scss";

const NotFound: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-large">404</h1>
      <h3 className="text text_type_main-medium pt-10">страница не найдена</h3>
    </div>
  );
};
export default NotFound;
