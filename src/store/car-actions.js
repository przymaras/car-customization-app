import { carActions } from "./car-slice";
import { uiActions } from "./ui-slice";

const fetchData = async (url) => {
  const response = await fetch(url);

  if (!response.ok) throw new Error("Could not fetch data!");

  const data = await response.json();

  return data;
};

export const fetchCarConfigData = () => {
  return async (dispatch) => {
    try {
      const carConfigData = await fetchData("/dummyData.json");
      dispatch(carActions.replaceCarConfig(carConfigData));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching car config data failed!",
        })
      );
    }
  };
};
