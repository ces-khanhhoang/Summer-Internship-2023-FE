import "./DescribePicture.css";
import imgLogo from "../../assets/gartic.svg";
import imgGalaxy from "../../assets/galaxy.jpg";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const DescribePicture = () => {
  let ip = "http://192.168.101.180:9090/";
  const location = useLocation();
  let turn = location.state?.turn;
  const id_room = location.state?.id_room;
  const currentName = location.state?.name;
  const dataReceive = location.state?.dataReceive;
  let image = dataReceive.value;
  const [timer, setTimer] = useState(30);
  const buttonDoneRef = useRef(null);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(intervalId);
      buttonDoneRef.current.click();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);
  const [content, setContent] = useState("");
  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };
  const handleDone = async () => {
    const response = await axios.post(
      ip + `user/done/${id_room}/${dataReceive.receiver}/${content}/${turn}`
    );
  };
  image = image.replace(
    "(1)",
    "https://firebasestorage.googleapis.com/v0/b/ces-telephone.appspot.com/o/images%"
  ); //1
  image = image.replace("(2)", "?alt=media&token="); //2
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
            <img src={image} alt="img-content" className="dp-img-content" />
          </div>
          <div className="dp-action">
            <input
              type="text"
              onChange={handleChangeContent}
              className="dp-input"
              placeholder="Type your description for this scene here ..."
            />
            <button
              ref={buttonDoneRef}
              className="dp-btn-done"
              onClick={handleDone}
            >
              DONE!
            </button>
          </div>
        </div>
        <div className="dp-sub-right">{timer}</div>
      </div>
    </div>
  );
};

export default DescribePicture;
