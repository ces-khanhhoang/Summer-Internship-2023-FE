import StartGame from "./components/StartGame/StartGame";
import { Route, Routes } from "react-router-dom";
import JoinRoom from "./components/JoinRoom/JoinRoom";
import ShowResult from "./components/ShowResult/ShowResult";
import DescribePicture from "./components/DescribePicture/DescribePicture";
import Draw from "./components/Draw/Draw";
import WriteSentence from "./components/WriteSentence/WriteSentence";
import WebFont from "webfontloader";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Droid Sans", "Roboto", "Chilanka"],
      },
    });
  }, []);
  return (
    <>
      <Routes>
        <Route path={"/lobby"} element={<JoinRoom />}></Route>
        <Route path={"/:id_room?"} element={<StartGame />}></Route>
        <Route path={"/start"} element={<WriteSentence />}></Route>
        <Route path={"/draw"} element={<Draw />}></Route>
        <Route path={"/write"} element={<DescribePicture />}></Route>
        <Route path={"/book"} element={<ShowResult />}></Route>
      </Routes>
    </>
  );
}

export default App;
