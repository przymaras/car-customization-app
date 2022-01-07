import { useSelector } from "react-redux";
import styles from "./CarSummary.module.scss";

import { ReactComponent as Car0 } from "../img/models/car-solid.svg";
import { ReactComponent as Car1 } from "../img/models/car-side-solid.svg";
import { ReactComponent as Car2 } from "../img/models/truck-pickup-solid.svg";
import { ReactComponent as Car3 } from "../img/models/truck-solid.svg";

import CarSummaryCfgOpt from "./CarSummaryCfgOpt";

function CarSummmary(props) {
  const carOpts = useSelector((state) => state.car.configData.options);
  const currentConfig = useSelector((state) => state.car.currentConfig);

  const currConfKeys = Object.keys(currentConfig);
  const configPrice = currConfKeys.reduce(
    (sum, currKey) => (sum += currentConfig[currKey].price),
    0
  );

  let currColor = "#dfdfdf";
  if (currentConfig["Color"]) {
    currColor = carOpts
      .find((opt) => opt.name === "Color")
      .items.find((item) => item.id === currentConfig["Color"].id).hex;
  }

  let CarImage = Car3;
  if (currentConfig["Model"]) {
    switch (currentConfig["Model"].id) {
      case 0:
        CarImage = Car0;
        break;
      case 1:
        CarImage = Car1;
        break;
      case 2:
        CarImage = Car2;
        break;
      case 3:
        CarImage = Car3;
        break;
      default:
        CarImage = Car3;
        break;
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Summary</h2>
      <div className={styles.image} style={{ color: currColor }}>
        {<CarImage />}
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
        <CarSummaryCfgOpt name="Price" value={`$${configPrice}`} />
      </div>
    </div>
  );
}

export default CarSummmary;
