import { useDispatch, useSelector } from "react-redux";

import styles from "./ConfigBtn.module.scss";

import { configActions } from "../store/config-slice";
import { carLogic } from "../logic/car-logic";
import { useEffect } from "react";

function ConfigBtn(props) {
  const dispatch = useDispatch();
  const subject = useSelector((state) => state.config.configData.subject);
  const cfgCats = useSelector((state) => state.config.configData.categories);
  const currentConfig = useSelector((state) => state.config.currentConfig);

  //Extract category name to which this button belongs
  const { name: thisBtnCatName } = cfgCats.find(
    (cat) => cat.id === props.catId
  );

  //Extract properties of config options for this button
  const {
    id: thisBtnOptId,
    name: thisBtnOptName,
    price: thisBtnOptPrice,
  } = cfgCats
    .find((cat) => cat.id === props.catId)
    .options.find((opt) => opt.id === props.optId);

  //Check if option of this button is currently selected
  let selected;
  if (currentConfig[thisBtnCatName]) {
    selected = currentConfig[thisBtnCatName].name === thisBtnOptName;
  }

  //By default all options are not allowed to be selected hence are disabled.
  let disabled;

  //Check if current option/button is allowed to be selected. If yes then enable this option/button.
  switch (subject) {
    case "Car":
      disabled = carLogic(
        thisBtnCatName,
        thisBtnOptId,
        thisBtnOptName,
        currentConfig,
        cfgCats
      );
      break;

    default:
      disabled = true;
  }

  //Conditional CSS
  const cssClasses = `${styles.btn} 
  ${selected ? styles.selected : ""} 
  ${props.color ? styles.color : ""} 
  ${disabled ? styles.disabled : ""}`;

  let bgColor = {};
  if (props.color && !disabled) {
    bgColor = { background: props.color };
  }

  //If this option/button was previously selected but it is currently not allowed to be selected - unselect it
  useEffect(() => {
    if (selected && disabled) {
      dispatch(configActions.deleteDisabledConfig(thisBtnCatName));
    }
  }, [selected, disabled, dispatch, thisBtnCatName]);

  function modifyConfigHandler() {
    if (!selected) {
      dispatch(
        configActions.modifyCurrentConfig({
          option: thisBtnCatName,
          selected: {
            id: thisBtnOptId,
            name: thisBtnOptName,
            price: thisBtnOptPrice,
          },
        })
      );
    }
  }

  return (
    <button
      onClick={modifyConfigHandler}
      className={cssClasses}
      style={bgColor}
      disabled={disabled}
    >
      {!props.color && <p>{thisBtnOptName}</p>}
    </button>
  );
}

export default ConfigBtn;
