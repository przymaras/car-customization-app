import styles from "./SummaryRow.module.scss";

function SummaryRow(props) {
  return (
    <div className={styles.row}>
      <p>{props.name}</p>
      <p>{props.value}</p>
    </div>
  );
}

export default SummaryRow;
