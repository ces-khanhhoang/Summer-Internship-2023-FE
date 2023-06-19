import StartGame from "./components/StartGame";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import WriteASentence from "./components/WriteASentence";
import DrawAPicture from "./components/DrawAPicture";
import JoinRoom from './components/JoinRoom/JoinRoom';
import ShowResult from './components/ShowResult/ShowResult'

function App() {
  return (
    <>
      <Routes>

        <Route path={"/"} element={<StartGame />}></Route>
        <Route path={"/join"} element={<JoinRoom />}></Route>
        <Route path={"/result"} element={<ShowResult />}></Route>

        <Route path={"/sentence"} element={<WriteASentence />}></Route>
        <Route path={"/draw"} element={<DrawAPicture
          width={700}
          height={500} />}></Route>
      </Routes>
    </>   
  );
}

export default App;
