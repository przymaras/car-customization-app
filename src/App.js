import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import styles from "./App.module.scss";

import { fetchCarConfigData } from "./store/car-actions";
import ConfigButtons from "./components/ConfigButtons";
import CarSummmary from "./components/CarSummary";

function App() {
  const dispatch = useDispatch();
  const confDataAvailable = useSelector(
    (state) => state.car.carConfigIsAvailable
  );
  const confData = useSelector((state) => state.car.carConfigData);

  useEffect(() => {
    dispatch(fetchCarConfigData());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Car customization app</h1>
        {confDataAvailable ? (
          <ConfigButtons confData={confData} />
        ) : (
          <p>Loading ...</p>
        )}
      </div>
      {confDataAvailable && <CarSummmary confData={confData} />}
    </div>
  );
}

export default App;
