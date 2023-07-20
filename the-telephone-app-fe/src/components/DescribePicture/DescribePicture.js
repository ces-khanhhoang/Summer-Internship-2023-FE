import "../Draw/Draw.css";
import "./DescribePicture.css";
import "../../assets/index.css";
import imgLogo from "../../assets/image-no-bg.png";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IP } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { SENTENCES } from "../../config/config";
import LoadingEffect from "../LoadingEffect/LoadingEffect";

const DescribePicture = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const turn = location.state?.turn;
  const totalTurn = location.state?.data.length;
  const id_room = location.state?.id_room;
  const mode = location.state?.mode;
  const currentName = location.state?.name;
  const dataReceive = location.state?.dataReceive;
  let image = dataReceive.value;
  const [timer, setTimer] = useState(60);
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
    let dataSend = content.replace(new RegExp(" ", "g"), "_");
    if (timer !== 0) {
      setIsWaiting(true);
      setIsLoading(true);
      const response = await axios.post(
        IP + `user/done/${id_room}/${dataReceive.receiver}/${dataSend}/${turn}`
      );
    }
  };

  const handleDraw = async () => {
    navigate("/draw", {
      state: { dataReceive, id_room, turn, totalTurn, mode },
    });
  };

  useEffect(() => {
    if (content.trim() === "") {
      const randomContent =
        SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
      setContent(randomContent);
    }
  }, [content]);

  image = image.replace(
    "(1)",
    "https://firebasestorage.googleapis.com/v0/b/ces-telephone.appspot.com/o/images%"
  ); //1
  image = image.replace("(2)", "?alt=media&token="); //2

  const [isLoading, setIsLoading] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="container-fluid app-bg">
      <LoadingEffect loading={isLoading} waiting={isWaiting} />
      <div className="row">
        <div className="col-8 center-block">
          <div className="row mt-5">
            <div className="col-1 custom-font pt-4">
              {turn >= totalTurn ? totalTurn : turn} / {totalTurn}
            </div>
            <div className="col-10 mt-4">
              <div className="card draw-header">
                <img className="header-image" src={imgLogo}></img>
                <p className="custom-font">
                  NOW IT'S YOUR TURN TO DESCRIBE THIS SCENE
                </p>
              </div>
              <div className="card draw-paper position-relative">
                <div className="align-self-center ">
                  <img className="drawn-picture" src={image}></img>
                </div>
              </div>
            </div>
            <div className="col-1 custom-font pt-4">{timer}</div>

            <div className="row mt-4">
              <div className="col-12 center align">
                {mode !== "KNOCK_OFF" && (
                  <input
                    type="text"
                    onChange={handleChangeContent}
                    className="ws-input"
                    placeholder="Type your description for this scene here ..."
                  ></input>
                )}
                {mode === "KNOCK_OFF" ? (
                  <button className="d-btn-done" onClick={handleDraw}>
                    <BsFillCheckCircleFill /> DRAW!
                  </button>
                ) : (
                  <button
                    ref={buttonDoneRef}
                    className="d-btn-done"
                    onClick={handleDone}
                  >
                    <BsFillCheckCircleFill /> DONE!
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescribePicture;
