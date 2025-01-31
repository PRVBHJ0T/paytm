import Heading from "./components/Heading"
import { InputBox } from "./components/InputBox"
import SubHeading from "./components/SubHeading"

function App() {

  return (
    <div className="flex  flex-col justify-around items-center bg-slate-500 ">
      <div className="w-80 shadow-2xl bg-amber-50 mt-3 mb-4  rounded-lg">
        <Heading label={"Sign-up"}/>
        <SubHeading label={"woh kehti party mei aaa"} />
        <InputBox label={"teri bandi "} placeholder={"first name"} />
        <InputBox label={"teri bandi "} placeholder={"first name"} />
        <InputBox label={"teri bandi "} placeholder={"first name"} />
        <InputBox label={"teri bandi "} placeholder={"first name"} />
      </div>
    </div>
  )
}

export default App
