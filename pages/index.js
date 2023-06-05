import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import bcrypt from'bcryptjs'
import { useRouter } from 'next/router'


export default function Home() {
  const router = useRouter()
const [view,setView]=useState(false)
const [email,setEmail]=useState("")
const [pass,setPass]=useState("")
const [hashee,setHashee]=useState("")
const [checkee,setCheckee]=useState('')
const hasher =async(e)=>{
  e.preventDefault()
  const salt = await bcrypt.genSalt(10)
const hashedPass = bcrypt.hashSync(pass,salt)
setHashee(hashedPass)
console.log(hashedPass)

}
const checker=(e)=>{
  e.preventDefault()
  router.push("/view")
  const seen =bcrypt.compareSync(pass,hashee)
  setCheckee(seen)
  console.log(seen)
}
  return (
    <main
      className="bg-white flex justify-center items-center"
    >
     <form className='mt-40 border rounded-md p-5' >
      <div >
      <label htmlFor='email' className='block'>Email</label>
      
      <input type='email' className='bg-blue-300 px-3 block' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      {email.includes("@" && ".com") &&   <div>
      <div>
      <label htmlFor='password' className='block'>password</label>
      <input type={view ? "text":"password"} className='bg-red-300 px-3' name='password' value={pass} onChange={(e)=>setPass(e.target.value)}/>

      </div>
      <div className='flex justify-end space-x-2'>
      <label>View password</label>
       <input type='checkbox'  className='ring-1  ring-blue-500 focus:ring-red-400 ' value={view} onClick={()=>setView(!view)}/>

      </div>
      </div>}
      
    <button onClick={hasher} className='bg-green-300 h-10 rounded-full px-16'>Enter </button>
    <p>{hashee}</p>
<button onClick={checker}> Check</button>
<p>{checkee ? "Valid" : "invalid"}</p>
     </form>
    </main>
  )
}
