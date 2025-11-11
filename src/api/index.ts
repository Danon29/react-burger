import { IngreditentsData } from "../types";
import { fetchWithAuth } from "../utils/authApi";
import { customRequest } from "../utils/http";

export const BASE_URL = "https://norma.education-services.ru/api";
export const wsOrdersFeedUrl = "wss://norma.education-services.ru/orders/all";
export const wsOrdersUserUrl = "wss://norma.education-services.ru/orders";

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

export const loadOrderApi = async (number: number) => {
  return await fetchWithAuth(`/orders/${number}`, {
    method: "GET",
  });
};
