import "./DescribePicture.css";
import imgLogo from "../../assets/gartic.svg";
import imgGalaxy from "../../assets/galaxy.jpg";
import { BsClockFill } from "react-icons/bs";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const DescribePicture = () => {
  const location = useLocation();
  const id_room = location.state?.id_room;
  const currentName = location.state?.name;
  const turn = location.state?.turn;

  const [content, setContent] = useState("");
  const handleChangeContent = (event) => {
    setContent(event.target.value);

    // console.log("turn" + turn);
  };
  const handleDone = async () => {
    // console.log("done" + content);
    const response = await axios.post(
      `http://192.168.101.177:9090/user/done/${id_room}/${currentName}/${content}/${turn}`
    );
  };

  return (
    <div className="dp-screen">
      <div className="dp-content">
        <div className="dp-sub-left">?/?</div>
        <div className="dp-main">
          <div className="dp-header">
            <div className="dp-logo">
              <img src={imgLogo} alt="" className="dp-img-logo-gartic" />
            </div>
            <div className="dp-title">
              NOW IT'S YOUR TURN TO DESCRIBE THIS SCENE
            </div>
          </div>
          <div className="dp-main-content">
            <img src={imgGalaxy} alt="img-content" className="dp-img-content" />
          </div>
          <div className="dp-action">
            <input
              type="text"
              className="dp-input"
              placeholder="Type your description for this scene here ..."
              onInput={handleChangeContent}
            />
            <button onClick={handleDone} className="dp-btn-done">
              DONE!
            </button>
          </div>
        </div>
        <div className="dp-sub-right">
          <BsClockFill size="30px" />
        </div>
      </div>
    </div>
  );
};

export default DescribePicture;
