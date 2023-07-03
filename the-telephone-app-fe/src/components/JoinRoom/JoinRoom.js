import "./JoinRoom.css";
import React, { useState, useEffect } from "react";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { BsFillSendXFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { BiXCircle } from "react-icons/bi";
import { BiCrown } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import imgAvatar from "../../assets/avatar-1.svg";
import imgLogo from "../../assets/gartic-phone.svg";
import imgNormal from "../../assets/normal.svg";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";

const JoinRoom = () => {
  let ip = "http://192.168.101.180:9090/";

  const location = useLocation();
  const role = location.state?.role;
  const [users, setUsers] = useState(location.state?.data);
  useEffect(() => {
    setUsers(location.state?.data);
  }, [location.state?.data]);
  const id_room = location.state?.id_room;
  const currentName = location.state?.name;
  const navigate = useNavigate();
  const [roomLink, setRoomLink] = useState("");
  const handleInviteClick = () => {
    const link = `http://localhost:3000/${id_room}`;
    setRoomLink(link);
    navigator.clipboard.writeText(link);
  };
  const handleKick = async (nickname) => {
    const response = await axios.post(
      ip + `user/delete/${id_room}/${nickname}`
    );
    setUsers(response.data);
  };
  const checkNicknameExistence = (nickname) => {
    console.log(users);
    if (users.length > 1) {
      return users.some((user) => user.nickname === nickname);
    }
    if (role == 1) {
      return true;
    }
  };
  const handleNavigateKick = () => {
    let mess, title;
    if (role === 1) {
      mess = "You canceled the room";
      title = "CENCEL PLAYROOM";
    } else {
      mess = "You have been kicked out from the room by the host";
      title = "KICKED OUT";
    }
    confirmAlert({
      title: title,
      message: mess,
      buttons: [
        {
          label: "OK",
          onClick: () => navigate("/"),
        },
      ],
    });
  };
  const handlePlay = async () => {
    const response = await axios.post(ip + `user/start/${id_room}`);
  };
  const handleButtonBack = () => {
    if (role === 1) {
      for (let i = 0; i < users.length; i++) {
        handleKick(users[i].nickname);
      }
    } else {
      handleKick(currentName);
    }
  };

  return checkNicknameExistence(currentName) ? (
    <div className="jr-screen">
      <div className="jr-content">
        <div className="jr-header">
          <Link to={"/"}>
            <button className="jr-btn-back" onClick={handleButtonBack}>
              <BsFillCaretLeftFill />
              Back
            </button>
          </Link>
          <img src={imgLogo} alt="logo" className="jr-img-logo" />
          <button className="jr-btn-sound">
            <BsFillVolumeUpFill size={"24px"} />
          </button>
        </div>
        <div className="jr-center">
          <div className="jr-left">
            <h4 className="jr-left-player">PLAYERS</h4>
            <div className="jr-user">
              <span className="jr-choice-number">
                <select name="" id="">
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
                  <option value="20">4 PLAYERS</option>
                  <option value="30">30 PLAYERS</option>
                  <option value="50">50 PLAYERS</option>
                </select>
              </span>
              <div className="jr-player">
                {users && users.length >= 1 ? (
                  users.map((user, index) => (
                    <div className="jr-detail-player">
                      <img
                        src={imgAvatar}
                        alt="avatar"
                        className="jr-img-avatar"
                      />
                      <span className="jr-text">{user.nickname}</span>
                      <i className="jr-icon">
                        {user.role[0].name == "ROLE_HOST" ? (
                          // role ==1 ?(
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
                  ))
                ) : (
                  <div className="jr-detail-player">
                    <img
                      src={imgAvatar}
                      alt="avatar"
                      className="jr-img-avatar"
                    />
                    <span className="jr-text">{users.nickname}</span>
                    <i className="jr-icon">
                      <BiCrown />
                    </i>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="jr-right">
            <div className="jr-setting">
              <div className="jr-tab">
                <h4 className="jr-column">PRESET</h4>
                <h4 className="jr-column">CUSTOM SETTINGS</h4>
              </div>
              <div className="jr-data">
                <div className="jr-detail">
                  <div className="jr-detail-setting">
                    <img
                      src={imgNormal}
                      alt="img-setting"
                      className="jr-img-setting"
                    />
                    <span className="jr-box"></span>
                  </div>
                </div>
              </div>
            </div>

            {role == 1 && (
              <div className="jr-action">
                <button className="jr-btn-action" onClick={handleInviteClick}>
                  <BsFillSendXFill className="jr-btn-icon" />
                  Invite
                </button>

                <button className="jr-btn-action" onClick={handlePlay}>
                  <BsFillArrowRightSquareFill className="jr-btn-icon" />
                  Start
                </button>
              </div>
            )}
            {role == 0 && (
              <div className="jr-action ">
                <div className="jr-text-player">
                  WAITING FOR THE HOST TO SET UP AND TO START THE GAME
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    handleNavigateKick()
  );
};

export default JoinRoom;
