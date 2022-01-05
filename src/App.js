import ConfigButtons from "./components/ConfigButtons";
import { useDataFetcher } from "./hooks/useDataFetcher";

import styles from "./App.module.scss";
import CarSummmary from "./components/CarSummary";

function App() {
  const [confData, confDataAvailable] = useDataFetcher("/dummyData.json");
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
      {confDataAvailable && <CarSummmary />}
    </div>
  );
}

export default App;
