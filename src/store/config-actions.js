import { configActions } from "./config-slice";
import { uiActions } from "./ui-slice";

const fetchData = async (url) => {
  const response = await fetch(url);

  if (!response.ok) throw new Error("Could not fetch data!");

  const data = await response.json();

  return data;
};

export const fetchConfigData = (url) => {
  return async (dispatch) => {
    try {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Loading ...",
          message: "Fetching config data ...",
        })
      );
      const configData = await fetchData(url);
      dispatch(configActions.replaceConfigData(configData));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching config data failed!",
        })
      );
      return;
    }

    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "Data loaded!",
        message: "Fetching config data finished with success!",
      })
    );

    setTimeout(() => {
      dispatch(uiActions.hideNotification());
    }, 2500);
  };
};

export const storeCurrentSession = (currentConfig, configName) => {
  return (dispatch) => {
    localStorage.setItem(configName, JSON.stringify(currentConfig));
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Saving data...",
        message: "Saving config data ...",
      })
    );
    setTimeout(() => {
      dispatch(uiActions.hideNotification());
    }, 1000);
  };
};

export const restoreLastSession = (configName) => {
  return (dispatch) => {
    const lastData = JSON.parse(localStorage.getItem(configName));
    if (lastData) {
      dispatch(configActions.replaceCurrentConfig(lastData));
    }
  };
};
