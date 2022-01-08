export const carLogic = (
  thisBtnCatName,
  thisBtnOptId,
  thisBtnOptName,
  currentConfig,
  cfgCats
) => {
  //By default all options are not allowed to be selected hence are disabled.
  let disabled = true;
  //Check if current option/button is allowed to be selected. If yes then enable this option/button.
  if (thisBtnCatName === "Model") {
    //Model is the first option user must select so it must be always enabled
    disabled = false;
  } else if (thisBtnCatName === "Color" && currentConfig["Model"]) {
    //If user already selected chassis model, then enable color selector
    disabled = false;
  } else if (thisBtnCatName === "Engine" && currentConfig["Model"]) {
    //If user already selected chassis model, then enable engine selector
    //Not all engines can fit all chassis so we check it also here.
    //Engine type is presented by integer
    //Engine can not be fitted to chassis if its type is greater than allowed type
    const maxAllowedEngine = cfgCats
      .find((cat) => cat.name === "Model")
      .options.find(
        (opt) => opt.id === currentConfig["Model"].id
      ).maxEngineType;

    const thisBtnEngineType = cfgCats
      .find((cat) => cat.name === "Engine")
      .options.find((opt) => opt.id === thisBtnOptId).type;

    disabled = thisBtnEngineType > maxAllowedEngine;
  } else if (thisBtnCatName === "Gearbox" && currentConfig["Engine"]) {
    //If user already selected engine model, then enable gearbox selector
    //Not all gearboxes can fit all engines so we check it also here.
    //Gearbox type is presented by string
    //Gearbox can not be fitted to engine if its type/name is not present in array of types in Engine database
    const allowedGearbox = cfgCats
      .find((cat) => cat.name === "Engine")
      .options.find(
        (opt) => opt.id === currentConfig["Engine"].id
      ).allowedGearbox;
    disabled = !allowedGearbox.some((type) => type === thisBtnOptName);
  }

  return disabled;
};
