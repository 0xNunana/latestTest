import { createContext,useContext, useState } from "react";

import React from 'react'
const ShipperContext = createContext({})
const Data = {
    name:"paul",
    age:27,
    id:1,
    location:"Accra"
}
const animal =[{
    name:'Jack',
    age:17,
},
{
    name:'Franky',
    age:15,
},{
    name:'Louis',
    age:7,
}
]
export const ShipperProvider =({children})=>{
    const [shipperInfo,setShipperinfo]=useState("")
    const [date,setDate]=useState("")
    const [selectedAirlines,setSelectedAirlines]=useState([])
    return(
        <ShipperContext.Provider value={{data:Data,animal:animal,setShipperinfo,shipperInfo,date,setDate,selectedAirlines,setSelectedAirlines}}>
            {children}
        </ShipperContext.Provider>
    )
}

export default function useShipper(){
    return useContext(ShipperContext)
}