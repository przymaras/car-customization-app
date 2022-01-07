import { useDispatch, useSelector } from "react-redux";

import styles from "./ConfigBtn.module.scss";

import { carActions } from "../store/car-slice";

function ConfigBtn(props) {
  const dispatch = useDispatch();
  const confOpts = useSelector((state) => state.car.configData.options);
  const currentConfig = useSelector((state) => state.car.currentConfig);

  const { name: optName } = confOpts.find((opt) => opt.id === props.optId);

  const {
    id: cfgId,
    name: cfgName,
    price: cfgPrice,
  } = confOpts
    .find((opt) => opt.id === props.optId)
    .items.find((item) => item.id === props.cfgId);

  let selected;
  if (currentConfig[optName]) {
    selected = currentConfig[optName].name === cfgName;
  }

  function modifyConfigHandler() {
    if (!selected) {
      dispatch(
        carActions.modifyCurrentConfig({
          option: optName,
          selected: { id: cfgId, name: cfgName, price: cfgPrice },
        })
      );
    }
  }

  let bgColor = {};
  if (props.color) {
    bgColor = { background: props.color };
  }

  return (
    <button
      onClick={modifyConfigHandler}
      className={`${styles.btn} ${selected ? styles.selected : ""} ${
        props.color ? styles.color : ""
      }`}
      style={bgColor}
    >
      {!props.color && <p>{cfgName}</p>}
    </button>
  );
}

export default ConfigBtn;
