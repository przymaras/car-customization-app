import styles from "./CarSummary.module.scss";
import { ReactComponent as Car } from "../img/models/car-solid.svg";

function CarSummmary(props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Summary</h2>
      <div className={styles.image} style={{ color: "red" }}>
        {<Car />}
      </div>
      <div className={styles.option}>
        <p>Model</p>
        <p>PRO RS3</p>
      </div>
      <div className={styles.option}>
        <p>Engine</p>
        <p>5.2L 532BHP</p>
      </div>
      <div className={styles.option}>
        <p>Gearbox</p>
        <p>Automatic</p>
      </div>
      <div className={styles.option}>
        <p>Color</p>
        <p>Red</p>
      </div>
      <div className={`${styles.option} ${styles.price}`}>
        <p>Price</p>
        <p>$255</p>
      </div>
    </div>
  );
}

export default CarSummmary;
