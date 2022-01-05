import ConfigBtnsWrapper from "./ConfigBtnsWrapper";
import styles from "./ConfigButtons.module.scss";

function ConfigButtons(props) {
  return (
    <div className={styles.container}>
      <h2
        className={styles.title}
      >{`${props.confData.configName} ${props.confData.configVersion}`}</h2>
      {props.confData.options.map((option) => (
        <ConfigBtnsWrapper key={option.id} configOption={option} />
      ))}
    </div>
  );
}

ConfigButtons.defaultProps = {
  confData: {
    options: [],
  },
};

export default ConfigButtons;
