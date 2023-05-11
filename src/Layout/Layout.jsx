import React from 'react'
import { Navbar } from "../Navbar/Navbar";
import { PiramideBrand } from "../Brands/PiramideBrand/PiramideBrand";
import { OceanicaBrand } from "../Brands/OceanicaBrand/OceanicaBrand";


const Layout = ({children}) => {
  return (
    <div>
        <Navbar
        brand={
          process.env.REACT_APP_COMPANY !== "OCEANICA" ? (
            <PiramideBrand width="85%" height="85%" />
          ) : (
            <OceanicaBrand width="85%" height="85%" />
          )
        }
      />
      <main>{children}</main>
    </div>
  )
}

export default Layout