import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+=-*/?`~";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="w-full max-w-md bg-neutral-900 text-white rounded-2xl shadow-2xl p-6 space-y-6 border border-neutral-800">

      <h1 className="text-xl font-semibold tracking-wide text-center text-neutral-200">
        Password Generator
      </h1>

      <div className="flex rounded-xl overflow-hidden border border-neutral-700 bg-neutral-800 focus-within:ring-2 focus-within:ring-white transition">
        <input
          type="text"
          value={password}
          ref={passwordRef}
          readOnly
          placeholder="Generated password"
          className="w-full bg-transparent px-4 py-3 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none"
        />
        <button
          onClick={copyPasswordToClipboard}
          className="bg-white text-black px-5 text-sm font-medium hover:bg-neutral-200 active:scale-95 transition-all duration-150"
        >
          Copy
        </button>
      </div>

      <div className="space-y-5">

        {/* Length Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-neutral-400">
            <span>Password Length</span>
            <span className="text-white font-medium">{length}</span>
          </div>

          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-white cursor-pointer"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex gap-6 text-sm text-neutral-300">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(prev => !prev)}
              className="accent-white w-4 h-4"
            />
            Numbers
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
              className="accent-white w-4 h-4"
            />
            Symbols
          </label>
        </div>

      </div>
    </div>
  </div>
)

}

export default App;
