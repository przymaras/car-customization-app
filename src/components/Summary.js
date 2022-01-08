import { useSelector } from "react-redux";

import styles from "./Summary.module.scss";

import SummaryRow from "./SummaryRow";

function Summary(props) {
  const cfgCats = useSelector((state) => state.config.configData.categories);
  const currentConfig = useSelector((state) => state.config.currentConfig);

  //calculate total price
  const currConfKeys = Object.keys(currentConfig);
  const configPrice = currConfKeys.reduce(
    (sum, currKey) => (sum += currentConfig[currKey].price),
    0
  );

  //set default Model image to "garage"
  let image =
    "<svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='warehouse' class='svg-inline--fa fa-warehouse fa-w-20' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'><path fill='currentColor' d='M504 352H136.4c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0 96H136.1c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0-192H136.6c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm106.5-139L338.4 3.7a48.15 48.15 0 0 0-36.9 0L29.5 117C11.7 124.5 0 141.9 0 161.3V504c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V256c0-17.6 14.6-32 32.6-32h382.8c18 0 32.6 14.4 32.6 32v248c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V161.3c0-19.4-11.7-36.8-29.5-44.3z'></path></svg>";
  if (currentConfig["Model"]) {
    //if model is selected then load it's model image/svg from configData
    image = cfgCats
      .find((cat) => cat.name === "Model")
      .options.find((opt) => opt.id === currentConfig["Model"].id).svg;
  }

  //default model color if no color selected
  let currColor = "#EFDFDF";
  //if color is selected - paint model with that color
  if (currentConfig["Color"]) {
    currColor = cfgCats
      .find((cat) => cat.name === "Color")
      .options.find((opt) => opt.id === currentConfig["Color"].id).hex;
  }

  //convert color hex to rgb and put that value into svg. It must be in rgb(r,g,b) format, not #_____ otherwise img will not be loaded.
  const rgb = hexToRgb(currColor);
  image = image.replace("currentColor", `rgb(${rgb.r},${rgb.g},${rgb.b})`);

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Summary</h2>

      <div className={styles.image} style={{ color: currColor }}>
        <img src={`data:image/svg+xml;utf8,${image}`} alt="Model" />
      </div>

      {cfgCats.map((category) => (
        <SummaryRow
          key={category.id}
          name={category.name}
          value={
            currentConfig[category.name]
              ? currentConfig[category.name].name
              : "Not selected"
          }
        />
      ))}

      <div className={styles.price}>
        <SummaryRow name="Price" value={`$${configPrice}`} />
      </div>
    </div>
  );
}

export default Summary;
