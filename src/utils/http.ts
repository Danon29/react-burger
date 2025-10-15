import { BASE_URL } from "../api";

export function checkResponse<T = any>(res: Response): Promise<T> {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    throw new Error(err.message);
  });
}

export function customRequest<T = any>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
}
