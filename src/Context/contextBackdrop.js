import { createContext, useState, useContext } from "react";

export const DataBackdrop = createContext(); 

export const useBackdrop = () => useContext(DataBackdrop);

export const BackDropProvider = ({children}) => {

    const [openBackdrop, setOpenBackdrop] = useState(false)

    return (
        <DataBackdrop.Provider value={{openBackdrop, setOpenBackdrop}}> 
            {children}
        </DataBackdrop.Provider>
    )
}