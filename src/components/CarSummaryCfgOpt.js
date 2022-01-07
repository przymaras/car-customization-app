import styles from "./CarSummaryCfgOpt.module.scss";

function CarSummaryCfgOpt(props) {
  return (
    <div className={styles.option}>
      <p>{props.name}</p>
      <p>{props.value}</p>
    </div>
  );
}

export default CarSummaryCfgOpt;
