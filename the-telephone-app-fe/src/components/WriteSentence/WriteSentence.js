import "../DescribePicture/DescribePicture.css";
import "./WriteSentence.css";
import "../Draw/Draw.css";
import "../../assets/index.css";
import imgLogo from "../../assets/logo.png";
import imgWrite from "../../assets/w.png";
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IP } from "../../config/config";
import { SENTENCES } from "../../config/config";

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
    let dataSend = content.replace(new RegExp(" ", "g"), "_");
    const response = await axios.post(
      IP + `user/done/${id_room}/${currentName}/${dataSend}/${turn}`
    );
  };

  useEffect(() => {
    if (content.trim() === "") {
      const randomContent =
        SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
      setContent(randomContent);
    }
  }, [content]);
  return (
    <div className="container-fluid app-bg">
      <div className="row mt-5">
        <div className="col-10 center-block">
          <div className="row">
            <div className="col-2 left align custom-font">
              {turn} / {totalTurn}
            </div>
            <div className="col-8 center align">
              <img src={imgLogo} alt="" className="img-logo" />
            </div>
            <div className="col-2 ws-time-padding align custom-font">
              {timer}
            </div>
            <div className="row section">
              <div className="col-6 center-block">
                <img
                  className="img-write center-block mb-4"
                  src={imgWrite}
                  alt=""
                />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-8 d-flex center-block">
                <input
                  type="text"
                  className="ws-1-input center-block"
                  placeholder=" ... "
                  onChange={handleChangeContent}
                />
                <button
                  ref={buttonDoneRef}
                  className="button ms-5 center-block"
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
    </div>
  );
};

export default WriteSentence;
