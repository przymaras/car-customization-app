import { useSelector } from "react-redux";

import styles from "./ConfigCategories.module.scss";

import ConfigCategory from "./ConfigCategory";

function ConfigCategories(props) {
  const confData = useSelector((state) => state.config.configData);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {`${confData.configName} ${confData.configVersion}`}
      </h2>

      {confData.categories.map((category) => (
        <ConfigCategory key={category.id} category={category} />
      ))}
    </div>
  );
}

export default ConfigCategories;
