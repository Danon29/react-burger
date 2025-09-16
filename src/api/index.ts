const DATA_URL = "https://norma.nomoreparties.space/api/ingredients";

export const getData = () => {
  return fetch(DATA_URL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then((res) => {
      if (!res.success) {
        throw new Error("Some error");
      }
      if (res.data && res.data.length > 0) {
        return res.data;
      } else {
        throw new Error("No valid data returned");
      }
    });
};
