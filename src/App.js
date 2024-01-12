import { useEffect, useState } from "react";
import CreateTask from "./Components/CreateTask";
import Listtasks from "./Components/Listtasks";
import MainDragdrop from "./MainDragdrop";

 

function App() {
  const [tasks, settasks] = useState([])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('storeddata'));
    if(Array.isArray(storedData)){
      settasks(storedData); 
    }
}, []);


  return (
    <div className="bg-slate-100   max-w-screen-lg m-0 mx-auto pt-3 gap-16">
<CreateTask tasks={tasks} settasks={settasks}/>
<hr className="m-5"/>
<Listtasks tasks={tasks} settasks={settasks}/>
<MainDragdrop/>
    </div>
  );
}

export default App;
