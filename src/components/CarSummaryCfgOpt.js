import styles from "./CarSummaryCfgOpt.module.scss";

function CarSummaryCfgOpt(props) {
  return (
    <div className={styles.option}>
      <p>{props.name}</p>
      <p>{props.selected}</p>
    </div>
  );
}

export default CarSummaryCfgOpt;
