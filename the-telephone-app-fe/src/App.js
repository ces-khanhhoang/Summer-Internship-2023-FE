import StartGame from "./components/StartGame";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import WriteASentence from "./components/WriteASentence";
import DrawAPicture from "./components/DrawAPicture";
import JoinRoom from './components/JoinRoom/JoinRoom';
import ShowResult from './components/ShowResult/ShowResult'
import DescribePicture from "./components/DescribePicture/DescribePicture";


function App() {
  return (
    <>
      <Routes>

        <Route path={"/"} element={<StartGame />}></Route>
        <Route path={"/lobby"} element={<JoinRoom />}></Route>
        <Route path={"/book"} element={<ShowResult />}></Route>
        <Route path={"/write_describe"} element={<DescribePicture />}></Route>
        <Route path={"/start"} element={<WriteASentence />}></Route>
        <Route path={"/draw"} element={<DrawAPicture
          width={700}
          height={500} />}></Route> 
          width={'950 rem'}
          height={'405 rem'} />}></Route>
      </Routes>
    </>   
  );
}

export default App;
