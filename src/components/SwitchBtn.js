import { useDispatch, useSelector } from "react-redux";
import { fetchConfigData } from "../store/config-actions";
import { configActions } from "../store/config-slice";

import styles from "./SwitchBtn.module.scss";

function SwitchBtn(props) {
  const dispatch = useDispatch();
  const subject = useSelector((state) => state.config.configData.subject);

  //Fetch config data from database (demo app is using /dummyCarData.json file)
  function handleSwitch() {
    setTimeout(() => {
      // clear current config to prevent mixing subjects before load new subject
      dispatch(configActions.clearCurrentConfig());
      subject === "Car"
        ? dispatch(fetchConfigData("/dummyEbikeData.json"))
        : dispatch(fetchConfigData("/dummyCarData.json"));
    }, 300);
  }

  const btnText =
    subject === "Car" ? "Switch subject to eBike" : "Switch subject to Car";

  return (
    <div className={styles.container}>
      <p>
        This is demo app. You can switch between two subjects: Car and eBike.
      </p>
      <button onClick={handleSwitch} className={styles.btn}>
        {btnText}
      </button>
    </div>
  );
}

export default SwitchBtn;
