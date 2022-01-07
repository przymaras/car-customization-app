import styles from "./CarSummary.module.scss";
import { ReactComponent as Car } from "../img/models/car-solid.svg";
import CarSummaryCfgOpt from "./CarSummaryCfgOpt";
import { useSelector } from "react-redux";

function CarSummmary(props) {
  const carOpts = useSelector((state) => state.car.configData.options);
  const currentConfig = useSelector((state) => state.car.currentConfig);

  const currConfKeys = Object.keys(currentConfig);

  const configPrice = currConfKeys.reduce(
    (sum, currKey) => (sum += currentConfig[currKey].price),
    0
  );

  let currColor;
  if (currentConfig["Color"]) {
    currColor = carOpts
      .find((opt) => opt.name === "Color")
      .items.find((item) => item.id === currentConfig["Color"].id).hex;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Summary</h2>
      <div
        className={styles.image}
        style={{ color: `${currColor ? currColor : "#dfdfdf"}` }}
      >
        {<Car />}
      </div>
      {carOpts.map((option) => (
        <CarSummaryCfgOpt
          key={option.id}
          name={option.name}
          value={
            currentConfig[option.name]
              ? currentConfig[option.name].name
              : "Not selected"
          }
        />
      ))}

      <div className={styles.price}>
        <CarSummaryCfgOpt name="Price" value={configPrice} />
      </div>
    </div>
  );
}

export default CarSummmary;
