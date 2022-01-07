import { useSelector } from "react-redux";
import ConfigBtnsWrapper from "./ConfigBtnsWrapper";
import styles from "./ConfigButtons.module.scss";

function ConfigButtons(props) {
  const confData = useSelector((state) => state.car.configData);
  return (
    <div className={styles.container}>
      <h2
        className={styles.title}
      >{`${confData.configName} ${confData.configVersion}`}</h2>
      {confData.options.map((option) => (
        <ConfigBtnsWrapper key={option.id} configOption={option} />
      ))}
    </div>
  );
}

export default ConfigButtons;
