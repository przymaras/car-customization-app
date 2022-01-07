import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import styles from "./App.module.scss";

import {
  fetchCarConfigData,
  storeCurrentSession,
  restoreLastSession,
} from "./store/car-actions";
import ConfigButtons from "./components/ConfigButtons";
import CarSummmary from "./components/CarSummary";
import Notification from "./components/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const confChanged = useSelector((state) => state.car.configChanged);
  const currentConfig = useSelector((state) => state.car.currentConfig);
  const confDataAvailable = useSelector(
    (state) => state.car.configDataIsAvailable
  );
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCarConfigData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(restoreLastSession());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (confChanged) {
      dispatch(storeCurrentSession(currentConfig));
    }
  }, [confChanged, currentConfig, dispatch]);

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
        <h1 className={styles.title}>Car customization app</h1>
        {confDataAvailable && <ConfigButtons />}
      </div>
      {confDataAvailable && <CarSummmary />}
    </div>
  );
}

export default App;
