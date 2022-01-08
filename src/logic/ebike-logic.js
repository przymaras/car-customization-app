export const ebikeLogic = (
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
  } else if (
    (thisBtnCatName === "Color" || thisBtnCatName === "Brake sensor") &&
    currentConfig["Model"]
  ) {
    //If user already selected frame model, then enable color, and brake sensor selector
    disabled = false;
  } else if (thisBtnCatName === "Motor" && currentConfig["Model"]) {
    //If user already selected frame model, then enable motor selector
    //Not all motors can fit all frames so we check it also here.
    //Motor type is presented by string
    //Motor dropout is presented by integer
    //Motor can not be fitted to frame if its type is not present in array of allowed drives in Engine database
    //Motor can not be fitted to frame if its dropout is greater than allowed for this frame
    const allowedDriveType = cfgCats
      .find((cat) => cat.name === "Model")
      .options.find((opt) => opt.id === currentConfig["Model"].id).allowedDrive;

    const thisBtnDriveType = cfgCats
      .find((cat) => cat.name === "Motor")
      .options.find((opt) => opt.id === thisBtnOptId).driveType;

    const driveIsAllowed = allowedDriveType.some(
      (type) => type === thisBtnDriveType
    );

    const allowedDropout = cfgCats
      .find((cat) => cat.name === "Model")
      .options.find(
        (opt) => opt.id === currentConfig["Model"].id
      ).maxMotorDropout;

    const thisBtnMotorDropout = cfgCats
      .find((cat) => cat.name === "Motor")
      .options.find((opt) => opt.id === thisBtnOptId).dropout;

    const dropoutIsAllowed = thisBtnMotorDropout <= allowedDropout;

    disabled = !(driveIsAllowed && dropoutIsAllowed);
  } else if (thisBtnCatName === "Rims" && currentConfig["Motor"]) {
    //If user already selected motor model, then enable rims selector
    //Not all rims can fit all motors so we check it also here.
    //Rims type is presented by string
    //Rims can not be fitted to motor if its type is not present in array of allowed types in Motor database
    const thisBtnRimType = cfgCats
      .find((cat) => cat.name === "Rims")
      .options.find((opt) => opt.id === thisBtnOptId).type;

    const allowedRims = cfgCats
      .find((cat) => cat.name === "Motor")
      .options.find((opt) => opt.id === currentConfig["Motor"].id).allowedRims;

    disabled = !allowedRims.some((type) => type === thisBtnRimType);
  }

  return disabled;
};
