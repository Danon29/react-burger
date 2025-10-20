import styles from "./Spinner.module.scss";

const Spinner: React.FC = () => {
  return (
    <div className={styles.loadingState}>
      <div className={styles.loading}></div>
    </div>
  );
};

export default Spinner;
