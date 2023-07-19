import "./JoinRoom.css";
import "../../assets/index.css";
import React, { useState, useEffect } from "react";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { BsFillSendXFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { BiLogIn, BiXCircle } from "react-icons/bi";
import { BiCrown } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import imgLogo from "../../assets/logo.png";
import axios from "axios";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import { IP } from "../../config/config";
import { INVITE } from "../../config/config";
import Avatar from "../Avatar";
import LoadingEffect from "../LoadingEffect/LoadingEffect";

const JoinRoom = () => {
  const location = useLocation();
  const role = location.state?.role;
  const [users, setUsers] = useState(location.state?.data);
  const [avatarId, setAvatarId] = useState(location.state?.data.id_image);

  useEffect(() => {
    if (Array.isArray(location.state.data)) {
      setAvatarId(location.state?.data[0].id_image);
      setCurrentPlayersNumber(location.state?.data.length);
      setMaxPlayersNumber(location.state?.data[0].maxPlayer);
    }
    setUsers(location.state?.data);
  }, [location.state?.data]);

  useEffect(() => {
    const options = document.querySelectorAll("option");
    options.forEach((option) => {
      const optionValue = parseInt(option.value);
      const personNumber = users.length === undefined ? 1 : users.length;
      option.style.display = optionValue >= personNumber ? "block" : "none";
    });
  }, [users]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timerId);
  }, []);

  const id_room = location.state?.id_room;
  const currentName = location.state?.name;
  const navigate = useNavigate();
  const [roomLink, setRoomLink] = useState("");

  const handleInviteClick = () => {
    const link = `${INVITE}/${id_room}`;
    setRoomLink(link);
    navigator.clipboard.writeText(link);
  };

  const handleKick = async (nickname) => {
    const response = await axios.post(
      IP + `user/delete/${id_room}/${nickname}`
    );
    setUsers(response.data);
  };

  const [selectedMode, setSelectedMode] = useState('IN_PROGRESS');

  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
  };

  const handlePlay = async (event) => {
    const response = await axios.post(
      IP + `user/start/${id_room}/${selectedMode}`
    );
  };

  const handleButtonBack = async () => {
    if (role === 1) {
      if (users.length > 1) {
        for (let i = 0; i < users.length; i++) {
          await handleKick(users[i].nickname);
        }
      } else {
        await handleKick(currentName);
      }
    }
    if (role === 0) {
      await handleKick(currentName);
      navigate("/exit");
    }
  };

  const handleSelectChange = (event) => {
    let value = event.target.value;
    const response = axios.post(IP + `user/play/${value}/${id_room}`);
  };

  const [maxPlayersNumber, setMaxPlayersNumber] = useState(4);
  const [currentPlayersNumber, setCurrentPlayersNumber] = useState(1);

  return (
    <div className="all">
      <LoadingEffect loading={isLoading} />
      <div className="main">
        <div className="row h-20">
          <div className="col-2 center align">
            <button className="button" onClick={handleButtonBack}>
              <BsFillCaretLeftFill className="icon" />
              BACK
            </button>
          </div>
          <div className="col-8 center align">
            <img src={imgLogo} alt="" className="img-logo" />
          </div>
        </div>
        <div className="row h-80">
          <div className="col-4 flex-column section">
            <div className="row h-13 align center text-title">
              PLAYERS {currentPlayersNumber} / {maxPlayersNumber}
            </div>
            <div className="row h-10 align px-4">
              {role == 1 ? (
                <select
                  className="form-select custom-select"
                  onChange={handleSelectChange}
                  name=""
                  id=""
                >
                  <option value="4">4 PLAYERS</option>
                  <option value="5">5 PLAYERS</option>
                  <option value="6">6 PLAYERS</option>
                  <option value="7">7 PLAYERS</option>
                  <option value="8">8 PLAYERS</option>
                  <option value="9">9 PLAYERS</option>
                  <option value="10">10 PLAYERS</option>
                  <option value="12">12 PLAYERS</option>
                  <option value="14">14 PLAYERS</option>
                  <option value="16">16 PLAYERS</option>
                  <option value="18">18 PLAYERS</option>
                  <option value="20">20 PLAYERS</option>
                  <option value="30">30 PLAYERS</option>
                  <option value="50">50 PLAYERS</option>
                </select>
              ) : (
                <div className="text">
                  {users[0].maxPlayer !== 0 ? users[0].maxPlayer : 4} PLAYERS
                </div>
              )}
            </div>
            <div className="row h-2"></div>
            <div className="row h-70 px-2">
              <div className="scrollable-100">
                {users && users.length >= 1 ? (
                  users.map((user, index) => (
                    <div key={user.nickname} className="row h-20 tag-name">
                      <div className="flex-row align">
                        <Avatar
                          displayAvatar={true}
                          showAvatarId={user.id_image}
                        />
                        <div className="text-ava">{user.nickname}</div>
                        <i className="icon-ava">
                          {user.role[0].name == "ROLE_HOST" ? (
                            <BiCrown />
                          ) : (
                            role == 1 && (
                              <BiXCircle
                                onClick={() => handleKick(user.nickname)}
                              />
                            )
                          )}
                        </i>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="row h-20 tag-name">
                    <div className="flex-row align">
                      <Avatar displayAvatar={true} showAvatarId={avatarId} />
                      <div className="text-ava">{users.nickname}</div>
                      <div className="icon-ava">
                        <BiCrown />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-1 section-sub"></div>
          <div className="col-7 section">
            <div className="row h-80">
              <div className="col-6">
                <div>
                  <label className="button">
                    <input type="radio" name="mode" value="IN_PROGRESS" checked = {selectedMode === "IN_PROGRESS"} onChange={handleModeChange} />
                    NORMAL
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div>
                  <label className="button">
                    <input type="radio" name="mode" value="KNOCK_OFF" checked = {selectedMode === "KNOCK_OFF"} onChange={handleModeChange} />
                    KNOCK-OFF
                  </label>
                </div>
              </div>
            </div>
            {role == 1 && (
              <div className="row h-25 align">
                <div className="col-6">
                  <button
                    className="button float-end me-1"
                    onClick={handleInviteClick}
                  >
                    <BsFillSendXFill className="icon" />
                    INVITE
                  </button>
                </div>
                <div className="col-6">
                  <button className="button ms-1" onClick={handlePlay}>
                    <BsFillArrowRightSquareFill className="icon" />
                    START
                  </button>
                </div>
              </div>
            )}
            {role == 0 && (
              <div className="row h-20 align">
                <div className="center text">
                  WAITING FOR THE HOST TO SET UP AND TO START THE GAME
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
