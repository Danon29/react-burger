import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.scss";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";

const Modal: React.FC<Props> = ({ title, children, onClose }) => {
  const checkEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", checkEsc, false);

    return () => {
      document.removeEventListener("keydown", checkEsc, false);
    };
  }, [checkEsc]);

  const modalRoot = document.getElementById("react-modals");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles.dialog}>
        <div className={`${styles.header} mt-10 mr-10 ml-10`}>
          {title && (
            <div className={`${styles.title} text text_type_main-large`}>
              {title}
            </div>
          )}
          <div className={styles["close-button"]}>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
        </div>
        <div className={styles.content}>{children}</div>
      </div>

      <ModalOverlay onClose={onClose} />
    </div>,
    modalRoot
  );
};

export default Modal;

interface Props {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
}
