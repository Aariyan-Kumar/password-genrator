import "./index.css";
import { useCallback, useEffect, useState, useRef } from 'react';

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setpassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed)
    {
      str = str + "0123456789";
    }
    
    if (characterAllowed) {
      str = str + "!@#$%^&*(){}[]`~?><,.\|+_-"
    }



    for (let i = 1; i <= length; i++) {
      
      let char = Math.floor(Math.random() * str.length + 1);

      pass = pass + str.charAt(char);
      
    }

    setpassword(pass);

  },[length, numberAllowed, characterAllowed, setpassword]) 


  const copyToClipboard = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(() => {
    passwordGenrator()
  }, [length, numberAllowed, characterAllowed, setpassword])
  

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500 ">
        <h1 className="text-white text-3xl text-center my-3">Password Genrator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="w-full py-1 px-3 outline-none"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyToClipboard}
          >copy</button>
        </div>

        <div>
          <div className='flex text-sm gap-x-2'>
            <div className="flex items-center gap-x-1 text-white">
              <input
                type="range"
                min={8}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => { setLength(e.target.value) }}
              />
              <label>Length: {length}</label>
            </div>

            <div className="flex items-center gap-x-1 text-white">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>

            
            <div className="flex items-center gap-x-1 text-white">
              <input
                type="checkbox"
                defaultChecked={characterAllowed}
                id="characterInput"
                onChange={() => {
                  setCharacterAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput">Character</label>
            </div>


          </div>
        </div>

      </div>
    </>
  )
}

export default App
