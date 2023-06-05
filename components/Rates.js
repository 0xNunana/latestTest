import React,{useState} from 'react'

const Rates = ({ airline, rates,color }) => {
  const [selectedRate,setSelectedRate]=useState(null)
  console.log(selectedRate)
  return (
    <div className='flex  my-2 px-5 space-x-10'>
   
        <h2 className={`${color}  p-5 w-36 h-28 flex items-center justify-center`} >{airline}</h2>

        <div className='flex space-x-16'>
        
        {rates?.map((rate)=>(
            <div className='bg-blue-100 p-10 shadow-purple-200 shadow-lg' onClick={()=>setSelectedRate(rate)} key={rate} value={selectedRate}>$ {rate}/kg</div>
        ))}
    </div>
     
      </div>
  )
}

export default Rates

