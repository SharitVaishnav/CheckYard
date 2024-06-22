import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import MachineRegister from "./pages/MachineRegister";
import Dashboard from "./pages/Dashboard";
import Machine from "./pages/Machine";


function App() {
  return (
    <div>
      <Navbar/>

    <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/signup" element = {<Signup/>}/>
      <Route path="/dashboard" element = {<Dashboard/>}/>
      <Route path="/machineRegister" element = {<MachineRegister/>}/>
      <Route path="/machine/:machineId" element = {<Machine/>}/>
    </Routes>
    </div>
  );
}

export default App;
