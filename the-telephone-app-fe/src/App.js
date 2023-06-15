import StartGame from "./Components/StartGame";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Lobby from "./Components/Lobby";
import WriteASentence from "./Components/WriteASentence";
import Canvas from "./Components/Canvas";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<StartGame />}></Route>
        <Route path={"/lobby"} element={<Lobby />}></Route>
        <Route path={"/sentence"} element={<WriteASentence />}></Route>
        <Route path={"/draw"} element={<Canvas 
        width={700}
        height={500} />}></Route>
      </Routes>
    </>


export default App;
