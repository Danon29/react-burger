import { IngreditentsData } from "../types";
import { customRequest } from "../utils/http";

export const BASE_URL = "https://norma.nomoreparties.space/api";

export const getData = () => {
  return customRequest<{ success: boolean; data: IngreditentsData[] }>(
    "/ingredients",
  ).then((res) => {
    if (!res.success) throw new Error("Some error");
    if (!res.data || res.data.length === 0)
      throw new Error("Data array is empty");
    return res.data;
  });
};
