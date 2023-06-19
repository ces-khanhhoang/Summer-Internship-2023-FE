import StartGame from "./components/StartGame";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import WriteASentence from "./components/WriteASentence";
import DrawAPicture from "./components/DrawAPicture/DrawAPicture";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<StartGame />}></Route>
        <Route path={"/sentence"} element={<WriteASentence />}></Route>
        <Route path={"/draw"} element={<DrawAPicture
          width={'950 rem'}
          height={'405 rem'} />}></Route>
      </Routes>
    </>
  );
}

export default App;
