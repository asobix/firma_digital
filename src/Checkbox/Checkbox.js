import React from "react";
import CheckboxController from "@mui/material/Checkbox";
import { red } from "@mui/material/colors";

const Checkbox = () => {
  return (
    <CheckboxController
      sx={{
        color: red[600],
        "&.Mui-checked": {
          color: red[600],
        },
      }}
    />
  );
};

export default Checkbox;
