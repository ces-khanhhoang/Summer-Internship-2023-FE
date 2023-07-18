import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imgLogo from "../../assets/logo.png";
import htp1 from "../../assets/friends.png";
import htp2 from "../../assets/htp-write.png";
import htp3 from "../../assets/htp-draw.png";
import htp4 from "../../assets/htp-g.png";
import htp5 from "../../assets/htp-re.png";
import { BsFillCaretRightFill } from "react-icons/bs";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useParams } from "react-router-dom";
import "../../assets/index.css";
import { IP } from "../../config/config";
import Avatar from "../Avatar";

const StartGame = () => {
  const [name, setName] = useState(
    "name0" + Math.round(Math.random() * 100000)
  );

  const [avatarId, setAvatarId] = useState(0);

  const handleAvatarChange = (newId) => {
    setAvatarId(newId);
  };

  let turn = 1;
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
  let mode;
  const onConnected = (id_room, data, role) => {
    client.subscribe("/topic/" + id_room, function (response) {
      data = JSON.parse(response.body);
      navigate("/lobby", { state: { data, id_room, role, name } });
      if (data.length > 0) {
        startGame = data[0].status;
        if (startGame === "IN_PROGRESS") {
          mode = "NORMAL";
          navigate("/start", { state: { id_room, name, turn, data, mode } });
        }
        if (startGame === "AGAIN") {
          turn = 1;
          navigate("/lobby", {
            state: { data, id_room, role, name },
          });
        }
        if (startGame === "MAX") {
          navigate("/lobby", {
            state: { data, id_room, role, name },
          });
        }
        if (startGame === "KNOCK_OFF") {
          mode = "KNOCK_OFF";
          navigate("/draw", {
            state: { id_room, name, turn, data, mode },
          });
        }
      } else {
        if (role === 1) {
          navigate("/cancel");
        }
        if (role === 0) {
          navigate("/exit");
        }
      }
    });

    client.subscribe("/topic/" + name, function (response) {
      const dataReceive = JSON.parse(response.body);
      startGame = dataReceive.status;
      if (startGame === "WRITE") {
        turn = turn + 1;
        navigate("/draw", {
          state: { dataReceive, id_room, name, turn, data },
        });
      }
      if (startGame === "KNOCK_OFF") {
        turn = turn + 1;
        navigate("/write", {
          state: { dataReceive, id_room, name, turn, data, mode },
        });
      }
      if (startGame === "DRAW") {
        turn = turn + 1;
        navigate("/write", {
          state: { dataReceive, id_room, name, turn, data },
        });
      }
      if (Array.isArray(dataReceive)) {
        navigate("/book", {
          state: { data, id_room, role, name, dataReceive, turn, mode },
        });
        turn = 0;
      }
      if (turn > dataReceive.number) {
        axios.post(IP + `user/result/${data[0].nickname}/${id_room}`);
      }
    });
    navigate("/lobby", { state: { data, id_room, role, name } });
  };

  const handleStartClick = async () => {
    const response = await axios.post(IP + `user/create/${name}/${avatarId}`);
    const host = response.data;
    var Sock = new SockJS(IP + "gameplay");
    client = over(Sock);
    client.connect({}, () => onConnected(host.id_room, host, 1), onError);
  };

  const handleJoinClick = async () => {
    try {
      const response = await axios.post(
        IP + `user/join/${id_room}/${name}/${avatarId}`
      );
      const users = response.data;
      if (Array.isArray(users)) {
        var Sock = new SockJS(IP + "gameplay");
        client = over(Sock);
        client.connect({}, () => onConnected(id_room, users, 0), onError);
      } else {
        if (users === "room does not exist") {
          navigate("/error");
        }
        if (users === "the room is full") {
          navigate("/full");
        }
      }
    } catch {
      navigate("/error");
    }
  };
  const imgs = [htp1, htp2, htp3, htp4, htp5];
  const titles = [
    "JOIN GAME",
    "TIME TO WRITE",
    "TIME TO DRAW",
    "WHAT IS IT?",
    "SEE WHAT HAPPENED",
  ];
  const contents = [
    "Invite your friends",
    "Each player must write a quirky sentence",
    "You are gonna receive a bizzare sentence to draw",
    "Try to describe one of the crazy drawings",
    "Watch the hilarious results of the telephone game",
  ];
  const [currentGuide, setCurrentGuide] = useState(0);

  const handleHowToPlay = (index) => {
    setCurrentGuide(index);
  };

  return (
    <div className="all">
      <div className="main">
        <div className="row h-20">
          <div className="col-4"></div>
          <div className="col-4 center align">
            <img src={imgLogo} alt="" className="img-logo" />
          </div>
          <div className="col-4"></div>
        </div>
        <div className="row h-80">
          <div className="col-7 section">
            <div className="row h-20 center align text-title">WELCOME!</div>
            <div className="row h-70">
              <div className="col-6 center align">
                <Avatar
                  onAvatarChange={handleAvatarChange}
                  displayAvatar={false}
                />
              </div>
              <div className="col-6 center align flex-column">
                <div className="text">CHOOSE A CHARACTER AND A NICKNAME</div>
                <div className="pt-4">
                  <input
                    type="text"
                    placeholder={name}
                    className=""
                    onChange={handleNameChange}
                  />
                </div>
              </div>
              <div className="row h-10 center align">
                <div className="center mt-4">
                  {id_room ? (
                    <button className="button" onClick={handleJoinClick}>
                      <BsFillCaretRightFill className="icon" />
                      JOIN
                    </button>
                  ) : (
                    <button className="button" onClick={handleStartClick}>
                      <BsFillCaretRightFill className="icon" />
                      START
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-1 section-sub"></div>
          <div className="col-4 section h-100">
            <div className="row h-20 center align text-title">HOW TO PLAY</div>
            <div className="row h-70 center align">
              <img src={imgs[currentGuide]} alt="" className="htp-img" />
              <div className="htp-title text-title">{titles[currentGuide]}</div>
              <div className="htp-content">{contents[currentGuide]}</div>
            </div>
            <div className="row h-10 center align">
              {imgs.map((img, index) => (
                <div className="col-2 center" key={index}>
                  <div>
                    <button
                      className={`htp-button button ${
                        index === currentGuide ? "active" : ""
                      }`}
                      onClick={() => handleHowToPlay(index)}
                    ></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartGame;
