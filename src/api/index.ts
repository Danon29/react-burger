const DATA_URL = "https://norma.nomoreparties.space/api/ingredients";

export const getData = () => {
  return fetch(DATA_URL)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("Data fetching error");
      }
      return res.json();
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
