import { useState } from "react";
import styles from "./ConfigBtn.module.scss";

function ConfigBtn(props) {
  const [selected, setSelected] = useState(false);

  function toggleSelected() {
    setSelected((prev) => !prev);
  }

  let bgColor = {};
  if (props.color) {
    bgColor = { background: props.color };
  }

  return (
    <div
      onClick={toggleSelected}
      className={`${styles.btn} ${selected ? styles.selected : ""} ${
        props.color ? styles.color : ""
      }`}
      style={bgColor}
    >
      {!props.color && <p>{props.name}</p>}
    </div>
  );
}

export default ConfigBtn;
