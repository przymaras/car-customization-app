import { useDispatch, useSelector } from "react-redux";

import styles from "./ConfigBtn.module.scss";

import { carActions } from "../store/car-slice";
import { useEffect } from "react";

function ConfigBtn(props) {
  const dispatch = useDispatch();
  const confOpts = useSelector((state) => state.car.configData.options);
  const currentConfig = useSelector((state) => state.car.currentConfig);

  //Extract current configurable option name
  const { name: currOptName } = confOpts.find((opt) => opt.id === props.optId);

  //Extract current config properties
  const {
    id: cfgId,
    name: cfgName,
    price: cfgPrice,
  } = confOpts
    .find((opt) => opt.id === props.optId)
    .items.find((item) => item.id === props.cfgId);

  //Check if current config name is currently selected
  let selected;
  if (currentConfig[currOptName]) {
    selected = currentConfig[currOptName].name === cfgName;
  }

  //Check if current config is allowed to be selected. If not then disable this button.
  let disabled = true;
  if (currOptName === "Model") {
    disabled = false;
  } else if (currOptName === "Color" && currentConfig["Model"]) {
    disabled = false;
  } else if (currOptName === "Engine" && currentConfig["Model"]) {
    const maxAllowedEngine = confOpts
      .find((opt) => opt.name === "Model")
      .items.find(
        (model) => model.id === currentConfig["Model"].id
      ).maxEngineType;

    const currentEngineType = confOpts
      .find((opt) => opt.name === "Engine")
      .items.find((engine) => engine.id === cfgId).type;

    disabled = currentEngineType > maxAllowedEngine;
  } else if (currOptName === "Gearbox" && currentConfig["Engine"]) {
    const allowedGearbox = confOpts
      .find((opt) => opt.name === "Engine")
      .items.find(
        (engine) => engine.id === currentConfig["Engine"].id
      ).allowedGearbox;
    disabled = !allowedGearbox.some((type) => type === cfgName);
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

  //If current config was previously selected but is currently not allowed to be selected - unselect it
  useEffect(() => {
    if (selected && disabled) {
      dispatch(carActions.deleteDisabledConfig(currOptName));
    }
  }, [selected, disabled, dispatch, currOptName]);

  function modifyConfigHandler() {
    if (!selected) {
      dispatch(
        carActions.modifyCurrentConfig({
          option: currOptName,
          selected: { id: cfgId, name: cfgName, price: cfgPrice },
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
      {!props.color && <p>{cfgName}</p>}
    </button>
  );
}

export default ConfigBtn;
