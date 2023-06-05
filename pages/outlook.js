import useShipper from '@/components/context'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import AudioPlayer from '@/components/AudioPlayer'
//import {ForwardIcon} from '@heroicons/react/24/outline/'
const Tracks =[
    {
        Artiste:'StoneBwoy',
        Title:"Bawasaba",
        Song:"https://www.hitxgh.com/php_system/uploads/2018/01/StoneBwoy-Bawasaaba-Prod.-by-StreetBeat-www.hitxgh.com_.mp3?_=1"
    },
    {
        Artiste:'Naira Marley',
        Title:'Body',
        Song:'https://www.hitxgh.com/php_system/uploads/2023/05/Naira_Marley_-_Body_5Bwww.hitxgh.com5D.mp3?_=1'
    },
    {
        Artiste:'Davido ft Musah Keys',
        Title:'Unavailable',
        Song:'https://www.hitxgh.com/php_system/uploads/2023/04/Davido_-_Unavailable_Ft_Musa_Keys_www.hitxgh.com_.mp3?_=1'
    },
    // {
    //     Artiste:'',
    //     Title:'',
    //     Song:''
    // },

]



const Data =[
    {
        title:"Hip Hop",
        image:"https://iconcollective.edu/wp-content/uploads/LL-Cool-J-2-652x435.jpg"
    },
    {
        title:"Country Music",
        image:"https://static01.nyt.com/images/2018/12/30/arts/30yearend-pop2/merlin_147857643_8e0c5c65-4549-4946-b51d-49425b9dcf24-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
    },
    {
        title:"Rap ",
        image:"https://media.wired.com/photos/5955a8975992c54331ac1589/master/w_2560%2Cc_limit/Eminem_42-27383443.jpg"
    },{
        title:"Afrobeat",
        image:"https://cdn.standardmedia.co.ke/images/wysiwyg/images/3YZfLcXPIxG8ygaYEKUm1tJoKW2bL0s4uIBUz8JE.jpg"
    },
    {
        title:"Amapiano",
        image:"https://www.okayafrica.com/media-library/image.jpg?id=24976829&width=980"
    },
   
]

const outlook = () => {
    const {selectedAirlines}=useShipper()
    const [searchValue,setSearchValue]=useState('')
    const [movies,setMovies]=useState([])
    const [loaded,setLoaded]=useState([])
    const [currentSong, setCurrentSong] = useState(0);
    const [startVideo,setStartVideo]=useState(false)
    

    const musicFinder = Tracks?.find((item) => item.Title  === searchValue);
     
   



  const handleNextSong = () => {
    setCurrentSong((prevSong) => (prevSong + 1) % Tracks.length);
    setStartVideo(true)
  };

  const handlePrevSong = () => {
    setCurrentSong((prevSong) => (prevSong + Tracks.length - 1) % Tracks.length);
    setStartVideo(true)
  }; 


    const getMovieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
        const response = await fetch(url);
        const responseJson = await response.json();
        if (responseJson.Search) {
          setMovies(responseJson.Search);
        }
      };
      const staticRequest = async () => {
        const url = `http://www.omdbapi.com/?s=movie&apikey=263d22d8`;
        const response = await fetch(url);
        const responseJson = await response.json();
        if (responseJson.Search) {
          setLoaded(responseJson.Search);
        }
      };
      
    
      

      useEffect(() => {
        getMovieRequest(searchValue);
        staticRequest()
        
      }, [searchValue]);
  return (
   <main className=' bg-white  '>
    <div className='  shadow-lg sticky top-0 z-30 bg-slate-200 '>
        <div className=' max-w-screen-xl mx-auto flex justify-between items-center' >
        <div className='bg-gray-300 rounded-full '>
            <Image src="/pesewa.png" height={70} width={70} alt="logo" className='rounded-full'/>
        </div>
        <div className='w-4/5 flex border rounded-full border-red-400 justify-center items-center'>
<input type='text' className='bg-white w-full rounded-full h-10 pl-5' placeholder='Search here..' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>

        </div>
        <div className=' bg-red-100 border rounded-full relative'>
            <Image src="https://w7.pngwing.com/pngs/68/693/png-transparent-bell-percussion-computer-icons-bell-hat-handbell-silhouette-thumbnail.png" height={35} width={35} alt="notify" className='rounded-full'/>
        <div className='bg-green-300 rounded-full border-2 border-white items-center justify-center flex h-5 w-5 absolute bottom-1 left-5'>
            {/* {selectedAirlines.length} */}
        </div>
        </div>

        </div>
        


    </div>
    {searchValue ? (
  movies.map((item, index) => (
    <div key={index} className="flex text-center border-b max-w-screen-sm mx-auto z-50">
      <div className="px-5">{item.Title}</div>
      <div className="px-5">{item.Year}</div>
    </div>
  ))
) : null}
   
    <section className="relative h-96"  style={{ overflow:"hidden"}}>
      
       <video playsInline autoPlay={startVideo} muted loop>
        <source src='/06.mp4'/>
       </video>
       
       <div className='w-3/5 absolute top-[25%] left-[20%] bg-white p-5 rounded-lg flex justify-center'>
        <div className='w-full space-y-5'>
        <div className='flex items-center' >
            <p className='font-black text-3xl'>Playing Now :</p>
        
            <p className='text-xl italic pl-5'>{Tracks[currentSong].Artiste}_{Tracks[currentSong].Title}.mp3 </p>
        </div>
        <div className='w-full'>
        {/* <audio controls  className='w-full'>
        <source src={Tracks[currentSong]}/>
       </audio> */}
       <AudioPlayer src={ musicFinder?.Song || Tracks[currentSong].Song} />
       <div className='flex justify-center space-x-4'>
       <button onClick={handlePrevSong} className='space-x-1 flex'>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
</svg>

        <p className='underline'>Previous</p>
        
        </button>
      <button onClick={handleNextSong} className=' flex space-x-1'>
        <p className='underline'>Next</p>
      
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
</svg>

      </button>
       </div>
        </div>
       
        </div>
      
      
       </div>
    </section>
    <section className='h-[70vh] p-2' style={{backgroundImage: "url(https://www.freightos.com/wp-content/uploads/2022/03/Webcargo-homepage-07.png)",backgroundPosition: "center",backgroundRepeat:"no-repeat" ,overflow:"hidden",backgroundSize:"contain"}}>

    <div className='max-w-screen-xl mx-auto py-3'>
        <p className='font-normal text-2xl italic'>Popular genres</p>
    </div>
<div className='grid grid-cols-3 gap-5 max-w-screen-xl mx-auto'>
   
{Data?.map((item)=>(
    <div className="col-span-1 h-36  rounded-lg shadow-xl flex bg-white " key={item.image}>
    <div className='w-full sm:w-1/2 border rounded-md shadow-md flex  bg-white relative ' >
        <Image src={item.image} fill alt="breakfast" className='rounded-md relative'/>
        <p className='bg-black p-3 text-white absolute bottom-1 sm:hidden'>{item.title}</p>
    </div>
    <div className='hidden  sm:flex items-center  justify-center font-black text-2xl p-2 '>
        <p className='text-center border-b-4'>{item.title}</p>
        
    </div>

</div>
))}
<div>
    
    
{/* {fun.map((item, index) => (
    <div key={index} className="flex text-center border-b max-w-screen-sm mx-auto z-50">
      <div className="px-5">{item.Title}</div>
      <div className="px-5">{item.Year}</div>
    </div>
  ))} */}
   
   </div>







</div>

        
    </section>
    <section className='mb-7'>
    <div className='max-w-screen-xl mx-auto py-3 '>
        <p className='font-normal text-2xl italic'>Popular Movies</p>
    </div>
    <div className='max-w-screen-xl mx-auto py-3 px-2 h-96 w-2/4 grid grid-cols-5 gap-x-4 gap-y-1' style={{backgroundImage:"url(https://developers.elementor.com/marketing/wp-content/uploads/sites/7/2021/12/cover-1-1024x538.png)"}}>
     {loaded?.map((item,index)=>(
        <div key={index} className='border rounded-lg  relative' >
            <Image src={item.Poster} fill />
            <p className='bg-black p-2 text-white'>{item.Title}</p>
        </div>
     ))}
    </div>
    </section>
   

    <section className='h-60 w-full bg-black/90 text-white '>
<div className='max-w-screen-xl mx-auto flex justify-between'>
<div>
    <p className='font-black mt-5 mb-2'>Customer Care</p>
    <p>Contact Us</p>
    <p>FAQs</p>
    <p>Terms of Service</p>
    <p>Privacy Policy</p>
</div>
<div className='flex justify-center items-center'>
    <Image src="/pesewa.png" width={70} height={70} alt="logo"/>
</div>
<div>
    <p className='font-black mt-5 mb-2'>My Account</p>
    <p>Sign/Register</p>
    <p>My Wishlist</p>
    <p>Cart</p>
</div>

</div>
    </section>
   </main>
  )
}

export default outlook