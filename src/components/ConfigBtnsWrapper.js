import ConfigBtn from "./ConfigBtn";
import styles from "./ConfigBtnsWrapper.module.scss";

function ConfigBtnsWrapper(props) {
  const isColor = props.configOption.type === "color";

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{props.configOption.name}</h2>
      <div className={`${styles.wrapper} ${isColor ? styles.color : ""}`}>
        {props.configOption.items.map((item) => (
          <ConfigBtn
            key={item.id}
            color={isColor && item.hex}
            optId={props.configOption.id}
            cfgId={item.id}
          />
        ))}
      </div>
    </div>
  );
}

export default ConfigBtnsWrapper;
