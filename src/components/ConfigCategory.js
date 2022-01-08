import styles from "./ConfigCategory.module.scss";

import ConfigBtn from "./ConfigBtn";

function ConfigCategory(props) {
  const isColor = props.category.type === "color";

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{props.category.name}</h2>

      <div className={`${styles.wrapper} ${isColor ? styles.color : ""}`}>
        {props.category.options.map((option) => (
          <ConfigBtn
            key={option.id}
            color={isColor && option.hex}
            catId={props.category.id}
            optId={option.id}
          />
        ))}
      </div>
    </div>
  );
}

export default ConfigCategory;
