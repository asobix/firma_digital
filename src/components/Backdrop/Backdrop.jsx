import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import { useBackdrop } from '../../Context/contextBackdrop';
import CircularProgress from '@mui/material/CircularProgress';


const SimpleBackdrop = () => {
    const {openBackdrop} = useBackdrop();
  return (
    <div>
        <Backdrop
        sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 10000 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default SimpleBackdrop
