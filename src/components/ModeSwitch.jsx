import React, { useState } from "react";
import Switch from "react-switch";
import useDarkMode from "../hooks/useDarkMode";

const ModeSwitch = () => {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };
  return (
    <Switch
      onChange={toggleDarkMode}
      checked={darkSide}
      className="react-switch"
      uncheckedIcon={false}
      checkedIcon={false}
      onColor="#fffffff"
      offColor="#3C3E4D"
      onHandleColor="#4AB2A9"
    />
  );
};

export default ModeSwitch;
