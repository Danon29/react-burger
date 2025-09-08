import styles from "./ModalOverlay.module.scss";

const ModalOverlay: React.FC<Props> = ({ onClose }) => {
  return <div className={styles.overlay} onClick={onClose}></div>;
};

interface Props {
  onClose: () => void;
}

export default ModalOverlay;
