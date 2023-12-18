import { useState,useCallback, useEffect,useRef} from 'react'


function App() {
 
  const [length,setLength]=useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [character,setCharacter]=useState(false)
  const [password,setPassword]=useState("")

  //use Ref hook

  const passwordRef=useRef(null)

 
 
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(character) str+="!@#$%^&*(){}=-~"

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char) 

    }
    setPassword(pass)




  },[length,numberAllowed,character,setPassword])
 

  const copyPasswordToClipboard= useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)
  },[password])
useEffect(()=>{
  passwordGenerator()
},[length,numberAllowed,character,passwordGenerator])
  return (
    <>

     <div className='w-full max-w-md mx-auto shadow-md rounded-lg  my-8 text-pink-500
      bg-purple-900'>
           <h1 className='text-4xl text-center text-white my-3'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
            <input type='text'value={password} className='outline-none w-full py-1 px-3'placeholder='Password'
            readOnly
              ref={passwordRef}
            />

            <button onClick={copyPasswordToClipboard}
             className='outline-none bg-blue-700 text-white
            px-3 py-.5 shrink-0 hover:text-blue-400 
            '
            >Copy</button>

          </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-centergap-x-1'>

          <input type='range'
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>length:{length}</label>

        </div>

        <div className='flex items-center gap-x-1'>
          <input 
            type='checkbox'
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={()=>{
              setNumberAllowed((prev)=>!prev)
            }}
          />
          <label htmlFor='numberInput'>Numbes</label>

        </div> 
        
        <div className='flex items-center gap-x-1'>
          <input 
            type='checkbox'
            defaultChecked={character}
            id='characterInput'
            onChange={()=>{
              setCharacter((prev)=>!prev)
            }}
          />
          <label htmlFor='characterInput'>characters</label>

        </div>
      </div>

     </div>

    </>
  )
} 
  
export default App
