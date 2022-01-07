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
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Loading ...",
          message: "Fetching car config data ...",
        })
      );
      const carConfigData = await fetchData("/dummyData.json");
      dispatch(carActions.replaceConfigData(carConfigData));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching car config data failed!",
        })
      );
      return;
    }

    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "Data loaded!",
        message: "Fetching car config data finished with success!",
      })
    );

    setTimeout(() => {
      dispatch(uiActions.hideNotification());
    }, 2500);
  };
};

export const storeCurrentSession = (currentConfig) => {
  return (dispatch) => {
    localStorage.setItem("carConfig", JSON.stringify(currentConfig));
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Saving data...",
        message: "Saving car config data ...",
      })
    );
    setTimeout(() => {
      dispatch(uiActions.hideNotification());
    }, 1000);
  };
};

export const restoreLastSession = () => {
  return (dispatch) => {
    const lastData = JSON.parse(localStorage.getItem("carConfig"));
    if (lastData) {
      dispatch(carActions.replaceCurrentConfig(lastData));
    }
  };
};
