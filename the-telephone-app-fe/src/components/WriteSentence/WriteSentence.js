import "../DescribePicture/DescribePicture.css";
import "./WriteSentence.css";
import "../Draw/Draw.css";
import imgLogo from "../../assets/logo.png";
import imgWrite from "../../assets/w.png";
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IP } from "../../config/config";

const WriteSentence = () => {
  const location = useLocation();
  const id_room = location.state?.id_room;
  const currentName = location.state?.name;
  const turn = location.state?.turn;
  const totalTurn = location.state?.data.length;
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
    const response = await axios.post(
      IP + `user/done/${id_room}/${currentName}/${content}/${turn}`
    );
  };

  return (
    <div className="all">
      <div className="main">
        <div className="row h-20">
          <div className="col-2 left align custom-font">
            {turn}/{totalTurn}
          </div>
          <div className="col-8 center align">
            <img src={imgLogo} alt="" className="img-logo" />
          </div>
          <div className="col-2 ws-time-padding align custom-font">{timer}</div>
        </div>
        <div className="row h-80 section me-5">
          <div className="row h-80">
            <div className="col-3"></div>
            <div className="col-6 center">
              <img className="img-write align" src={imgWrite} alt="" />
            </div>
            <div className="col-3"></div>
          </div>
          <div className="row h-20 align">
            <div className="col-2"></div>
            <div className="col-6 right">
              <input
                type="text"
                className="w-100"
                placeholder=" ... "
                onChange={handleChangeContent}
              />
            </div>
            <div className="col-3 left">
              <button
                ref={buttonDoneRef}
                className="button"
                onClick={handleDone}
              >
                <BsFillCheckCircleFill className="icon" />
                DONE!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteSentence;
