export type IngreditentsData = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TOrder = {
  _id: string;
  name: string;
  status: keyof typeof orderStatusesTranslation;
  number: number;
  createdAt: string;
  updatedAt: string;
  ingredients: string[];
};

export enum orderStatusesTranslation {
  done = "Выполнен",
  pending = "Готовится",
  created = "Создан",
}

export const OrderStatusPending = "pending";
export const OrderStatusDone = "done";
export const OrderStatusCreated = "created";

export enum WebSocketStatus {
  ONLINE,
  OFFLINE,
}
