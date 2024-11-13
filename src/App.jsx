import { useCallback, useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(10)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*(){}[]/?"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [numberAllowed, charAllowed, length, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [charAllowed, numberAllowed, length, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-lg mx-auto p-8 my-8 bg-white shadow-md rounded-xl">
        <h1 className='text-4xl font-extrabold text-gray-800 text-center mb-8'>
          Password Generator
        </h1>

        <div className="flex items-center shadow-lg rounded-xl overflow-hidden mb-6 bg-gray-50">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-4 px-6 text-2xl font-medium text-gray-700 bg-gray-200 rounded-l-xl focus:ring-2 focus:ring-blue-400 transition duration-300"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-r-xl transition ease-in-out duration-300'
          >
            Copy
          </button>
        </div>

        <div className='flex items-center justify-between text-sm gap-x-4'>
          <div className='flex items-center gap-x-2'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer w-2/3'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label className="text-gray-700">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              className="accent-blue-500"
            />
            <label htmlFor="numberInput" className="text-gray-700">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
              className="accent-blue-500"
            />
            <label htmlFor="characterInput" className="text-gray-700">Special Chars</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
