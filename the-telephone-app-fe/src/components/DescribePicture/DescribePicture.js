import "../Draw/Draw.css";
import "./DescribePicture.css";
import imgLogo from "../../assets/header.png";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BsFillCheckCircleFill } from "react-icons/bs";

const DescribePicture = () => {
  let ip = "http://192.168.101.180:9090/";
  const location = useLocation();
  let turn = location.state?.turn;
  const id_room = location.state?.id_room;
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
    <div className="container-fluid app-bg vh-100">
      <div className="row">
        <div className="col-8 center-block">
          <div className="row mt-5">
            <div className="card invisible-border border-4 app-bg">
              <div className="row">
                <div className="col-1 mt-3 fw-bold">
                  <div className="float-end">?/?</div>
                </div>
                <div className="col-10 mt-2">
                  <div className="card draw-header mt-3">
                    <img className="header-image" src={imgLogo}></img>
                    <p className="custom-font">
                      NOW IT'S YOUR TURN TO DESCRIBE THIS SCENE
                    </p>
                    <p className="text-center w-100 fw-bold"></p>
                  </div>
                  <div className="card draw-paper position-relative">
                    <div className="align-self-center ">
                      <img className="drawn-picture" src={image}></img>
                    </div>
                  </div>
                </div>
                <div className="col-1 mt-3 fw-bold">{timer}</div>
              </div>
            </div>
            <div className="row mt-3 mb-3">
              <div className="col-6 ms-10rem">
                <input
                  type="text"
                  onChange={handleChangeContent}
                  className="ws-input"
                  placeholder="Type your description for this scene here ..."
                ></input>
              </div>
              <div className="col-2">
                <button
                  ref={buttonDoneRef}
                  className="d-btn-done"
                  onClick={handleDone}
                >
                  <BsFillCheckCircleFill /> DONE!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescribePicture;
