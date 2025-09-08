import styles from "./OrderDetails.module.scss";
import Modal from "../Modal/Modal";
import img from "../../images/done.jpg";

const OrderDetails: React.FC<Props> = ({ onClose, orderNumber }) => {
  return (
    <Modal onClose={onClose}>
      <div className={`${styles.container} mt-10`}>
        <p
          className={`${styles["order-number"]} text text_type_digits-large mb-8`}
        >
          {orderNumber}
        </p>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <img src={img} className={`${styles.image} mb-15`} alt="Заказ принят" />
        <p className="text text_type_main-default mb-2">
          Ваш заказ начали готовить
        </p>
        <p
          className={`${styles["last-p"]} text text_type_main-default text_color_inactive mb-30`}
        >
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </Modal>
  );
};

export default OrderDetails;

interface Props {
  onClose: () => void;
  orderNumber: string;
}
