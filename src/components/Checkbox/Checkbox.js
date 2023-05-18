import React from "react";
import CheckboxController from "@mui/material/Checkbox";
import { red, blue } from "@mui/material/colors";

const Checkbox = () => {
  return (
    <CheckboxController
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
