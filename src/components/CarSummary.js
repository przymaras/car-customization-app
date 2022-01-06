import styles from "./CarSummary.module.scss";
import { ReactComponent as Car } from "../img/models/car-solid.svg";
import CarSummaryCfgOpt from "./CarSummaryCfgOpt";

function CarSummmary(props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Summary</h2>
      <div className={styles.image} style={{ color: "red" }}>
        {<Car />}
      </div>
      {props.confData.options.map((option) => (
        <CarSummaryCfgOpt
          key={option.id}
          name={option.name}
          selected={option.items[0].name}
        />
      ))}

      <div className={styles.price}>
        <CarSummaryCfgOpt name="Price" selected="$234" />
      </div>
    </div>
  );
}

export default CarSummmary;
