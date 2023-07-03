import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StartGame.css";
import imgLogo from "../../assets/gartic-phone.svg";
import { BsFillCaretRightFill } from "react-icons/bs";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useParams } from "react-router-dom";
const StartGame = () => {
  let ip = "http://192.168.101.180:9090/";

  const [name, setName] = useState(
    "name0" + Math.round(Math.random() * 100000)
  );
  let [turn, setTurn] = useState(1);
  let startGame;
  const handleNameChange = (e) => {
    if (e.target.value) {
      setName(e.target.value);
    } else {
      setName("Nickname" + Math.round(Math.random() * 1000));
    }
  };
  const navigate = useNavigate();
  const onError = (err) => {
    console.log(err);
  };
  const { id_room } = useParams();
  var client = null;
  const onConnected = (id_room, data, role) => {
    client.subscribe("/topic/" + id_room, function (response) {
      data = JSON.parse(response.body);
      navigate("/lobby", { state: { data, id_room, role, name } });
      if (data.length > 0) {
        startGame = data[0].status;
        if (startGame === "IN_PROGRESS") {
          navigate("/start", { state: { id_room, name, turn } });
        }
      } else {
        navigate("/");
      }
    });

    client.subscribe("/topic/" + name, function (response) {
      const dataReceive = JSON.parse(response.body);
      startGame = dataReceive.status;
      console.log(dataReceive);
      console.log(startGame);

      if (startGame === "WRITE") {
        turn = turn + 1;
        navigate("/draw", { state: { dataReceive, id_room, name, turn } });
      }
      if (startGame === "DRAW") {
        turn = turn + 1;
        navigate("/write", { state: { dataReceive, id_room, name, turn } });
      }
    });
    navigate("/lobby", { state: { data, id_room, role, name } });
  };

  const handleStartClick = async () => {
    const response = await axios.post(ip + `user/create/${name}`);
    const host = response.data;
    var Sock = new SockJS(ip + "gameplay");
    client = over(Sock);
    client.connect({}, () => onConnected(host.id_room, host, 1), onError);
  };

  const handleJoinClick = async () => {
    const response = await axios.post(ip + `user/join/${id_room}/${name}`);
    const users = response.data;
    var Sock = new SockJS(ip + "gameplay");
    client = over(Sock);
    client.connect({}, () => onConnected(id_room, users, 0), onError);
  };

  return (
    <div className="sg-screen">
      <div className="sg-content">
        <div className="sg-header">
          <img src={imgLogo} alt="" className="sg-img-logo" />
        </div>
        <div className="sg-center">
          <div className="sg-left">
            <div className="sg-title">ANONYMOUS</div>
            <div className="sg-left-main">
              <img src={imgLogo} alt="" className="sg-img-avatar" />
              <div className="sg-fill">
                <div className="sg-text">CHOOSE A CHARACTER AND A NICKNAME</div>
                <input
                  type="text"
                  placeholder={name}
                  className="sg-input"
                  onChange={handleNameChange}
                />
              </div>
            </div>
            <div className="sg-left-action">
              {id_room ? (
                <button className="sg-btn-start" onClick={handleJoinClick}>
                  <div className="">
                    <BsFillCaretRightFill className="sg-icon" />
                    JOIN
                  </div>
                </button>
              ) : (
                <button className="sg-btn-start" onClick={handleStartClick}>
                  <div className="">
                    <BsFillCaretRightFill className="sg-icon" />
                    START
                  </div>
                </button>
              )}
            </div>
          </div>
          <div className="sg-right">
            <div className="sg-title">HOW TO PLAY</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartGame;
