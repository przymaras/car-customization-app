import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import styles from "./App.module.scss";

import {
  fetchConfigData,
  storeCurrentSession,
  restoreLastSession,
} from "./store/config-actions";

import ConfigCategories from "./components/ConfigCategories";
import Summary from "./components/Summary";
import Notification from "./components/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const confData = useSelector((state) => state.config.configData);
  const confChanged = useSelector((state) => state.config.currentConfigChanged);
  const currentConfig = useSelector((state) => state.config.currentConfig);
  const confDataAvailable = useSelector(
    (state) => state.config.configDataIsAvailable
  );
  const notification = useSelector((state) => state.ui.notification);

  //Fetch config data from database (demo app is using /dummyCarData.json file)
  useEffect(() => {
    dispatch(fetchConfigData("/dummyCarData.json"));
  }, [dispatch]);

  //Load previously selected options (demo app is using localstorage)
  useEffect(() => {
    dispatch(
      restoreLastSession(`${confData.configName} ${confData.configVersion}`)
    );
  }, [dispatch, confData.configName, confData.configVersion]);

  //Save currently selected options (demo app is using localstorage)
  useEffect(() => {
    //Don't save if it is first run of this app
    if (isInitial) {
      isInitial = false;
      return;
    }

    //Don't save if app is restoring last session, only change if user changes something.
    if (confChanged) {
      dispatch(
        storeCurrentSession(
          currentConfig,
          `${confData.configName} ${confData.configVersion}`
        )
      );
    }
  }, [
    confChanged,
    currentConfig,
    dispatch,
    confData.configName,
    confData.configVersion,
  ]);

  return (
    <div className={styles.container}>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}

      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          {confDataAvailable
            ? `${confData.subject} customization app`
            : "Customization app"}
        </h1>
        {confDataAvailable && <ConfigCategories />}
      </div>

      {confDataAvailable && <Summary />}
    </div>
  );
}

export default App;
