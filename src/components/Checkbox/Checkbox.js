import React from "react";
import CheckboxController from "@mui/material/Checkbox";
import { red, blue } from "@mui/material/colors";

const Checkbox = (props) => {
  const {setCheckboxArrays,digitalInformation,checked, key} = props
  function HandleArrayChecked(array) {
    return array.map((element) => {
      return {
        ...element,
        checked : true
      }
    }
    );
  }

  function HandleArrayUnChecked() {
    return []
  }

  const handleCheck = (isChecked, index) => {
  
    if (isChecked === true) {

      const arrayData = HandleArrayChecked(digitalInformation?.condiciones, index)
      setCheckboxArrays(arrayData)

      console.log(arrayData, 'arrayDataaa')
    }
    else {
      const arrayData = HandleArrayUnChecked(digitalInformation?.condiciones, index)
      setCheckboxArrays(arrayData)
    }
  }
  console.log(key)
  return (
    <CheckboxController
      checked={checked}
      onChange={(e) => handleCheck(e.target.checked, key)}
      sx={{
        color: process.env.REACT_APP_COMPANY !== 'OCEANICA' ? red[600] : blue[600],
        "&.Mui-checked": {
          color: process.env.REACT_APP_COMPANY !== 'OCEANICA' ? red[600] : blue[600],
        },
      }}
    />
  );
};

export default Checkbox;
