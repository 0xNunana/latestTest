import React, { useState } from 'react'
import useShipper from '@/components/context'
import Rates from '@/components/Rates';
import { useRouter } from 'next/router';


const shipments = [
    { airline: "Delta", rates: [22, 23, 24,25] },
    { airline: "United", rates: [22, 25, 26,28] },
    { airline: "American Airlines", rates: [24, 26, 27,30] }
  ];
const dates ={days:["Dates",21,22,23,24]}
const getColor = (airline) => {
    switch (airline) {
      case "Delta":
        return "bg-blue-300";
      case "United":
        return "bg-red-300";
      case "American Airlines":
        return "bg-green-300";
      default:
        return "bg-white";
    }
  };
  
 
const Data =[{
    id:1,
    Airline:"KLM",
    fare:"20cedis"
},
{id:2,
Airline:"Qatar",
fare:"60cedis"},
{id:3,
Airline:"British",
fare:"70 per"}
]

function view() {
    const router =useRouter()
    const {name,age,location,date,setDate,setSelectedAirlines,selectedAirlines} = useShipper()
    const handleSelect = (e) => {
        const airline = e.target.value;
        if (!selectedAirlines.includes(airline)) {
          setSelectedAirlines((prevSelected) => [...prevSelected, airline]);
        }
      };

    console.log(selectedAirlines)
 
  return (<div>
 <div>{name}+{age},{location}</div>
 <div>
    <label htmlFor='date'>Date</label>
    <input type='date' name='date' value={date} onChange={(e)=>setDate(e.target.value)}/>
 </div>
 {date}
 {Data?.map((item)=>(
    <div key={item.id} >
        
        <button onClick={handleSelect} className='bg-blue-400 p-3 flex items-center my-4' value={item.Airline }>{item.Airline}</button>
    </div>
  ))}
   <div className='h-24 w-24 rounded-full border border-black relative m-5'>
    {selectedAirlines.length ? (<div className='border-2 h-3 w-3 rounded border-black flex justify-center p-2  absolute bottom-0 right-0 items-center  bg-green-300'>{selectedAirlines.length}</div>):null}
   
   
   </div>
   <button onClick={()=>setSelectedAirlines([])}>Reset</button>
   <button onClick={()=>router.push('/outlook')}>Next Page</button>

   <div className='max-w-screen-lg mx-auto'>
   <div className='flex justify-start bg-red-300 space-x-40 px-4'>
    {dates?.days.map(date=>(
<div key={date} className="flex bg-slate-300 px-3">{date}</div>
    ))}
   </div>

   <div>
      {shipments.map(shipment => (
        <Rates key={shipment.airline} airline={shipment.airline} rates={shipment.rates} color={getColor(shipment.airline)}/>
      ))}
    </div>

   </div>
  
  </div>
 

  )
}

export default view