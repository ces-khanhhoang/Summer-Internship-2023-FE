import "./ShowResult.css";
import { BsFillCaretLeftFill } from "react-icons/bs";
import imgLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { BiCrown } from "react-icons/bi";
import { IP } from "../../config/config";
import Avatar from "../Avatar";

const ShowResult = () => {
  const navigate = useNavigate();

  const handleButtonHome = () => {
    navigate("/");
  };

  const [currentTurn, setCurrentTurn] = useState(0);

  const nextPlayer = () => {
    setPlayer((player += 1));
    if (player > currentTurn) {
      setTimer(0);
      setCurrentTurn(player);
    }
    getResult(player);
  };
  const previousPlayer = () => {
    setPlayer((player -= 1));
    getResult(player);
  };

  const getResult = async (player) => {
    const response = await axios.post(
      IP +
        `user/result/${location.state?.data[player].nickname}/${location.state?.id_room}`
    );
    const responseResult = response.data;
    setPlayerName(responseResult[0].namePlay);
    setResult(responseResult);
  };
  function ConvertUrl({ data }) {
    data = data.replace(
      "(1)",
      "https://firebasestorage.googleapis.com/v0/b/ces-telephone.appspot.com/o/images%"
    ); //1
    data = data.replace("(2)", "?alt=media&token=");
    return <img className="sr-content-img" alt="result" src={data}></img>; //2
  }

  const location = useLocation();
  const [users, setUsers] = useState(location.state?.data);
  const role = location.state?.role;
  const [results, setResult] = useState([]);
  let [player, setPlayer] = useState(0);
  const resultSet = location.state?.dataReceive;
  const [playerName, setPlayerName] = useState();
  useEffect(() => {
    setUsers(location.state?.data);
    setResult(resultSet);
    setPlayerName(resultSet[0].namePlay);
  }, [location.state?.data]);

  const handlePlayAgain = async () => {
    let id_room = users[0].id_room;
    const response = await axios.post(IP + `user/again/${id_room}`);
  };

  const [timer, setTimer] = useState(0);
  const scrollPoint = useRef(null);
  const scrollPoint2 = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
      if (timer % 2 === 0) {
        scrollPoint.current?.scrollIntoView({ behavior: "smooth" });
      } else if (timer % 2.5 === 0) {
        scrollPoint2.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);

    if (timer === resultSet.length * 5) {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

  return (
    <div className="all">
      <div className="main">
        <div className="row h-20">
          <div className="col-2 center align">
            <button onClick={handleButtonHome} className="button">
              <BsFillCaretLeftFill className="icon" />
              HOME
            </button>
          </div>
          <div className="col-8 center align">
            <img src={imgLogo} alt="" className="img-logo" />
          </div>
          <div className="col-2"></div>
        </div>
        <div className="row h-80">
          <div className="col-4 flex-column section">
            <div className="row h-13 align center text-title">PLAYERS</div>
            <div className="row h-2"></div>
            <div className="row h-80 px-2 ">
              <div className=" scrollable-100">
                {users.map((user) => (
                  <div
                    key={user.nickname}
                    className={`row h-20 ${
                      user.nickname === playerName
                        ? "selected-tag-name"
                        : "tag-name"
                    }`}
                  >
                    <div className="flex-row align">
                      <Avatar
                        displayAvatar={true}
                        showAvatarId={user.id_image}
                      />
                      <div className="text-ava">{user.nickname}</div>
                      <i className="icon-ava">
                        {user.role[0].name === "ROLE_HOST" && <BiCrown />}
                      </i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-1 section-sub"></div>
          <div className="col-7 section">
            <div className="row h-13 align center text-title">
              {playerName}'S ALBUM
            </div>
            <div className="row h-67">
              <div className="scrollable">
                {results.map((result, index) => (
                  <div key={index}>
                    {index % 2 === 0 ? (
                      <div>
                        {timer >= (index + 1) * 3 ? (
                          <div className="message mess-right">
                            <div className="mess-content">
                              <div className="content-name">
                                {result.namePlay}
                              </div>
                              {timer >= (index + 2) * 3 ? (
                                <>
                                  <div className="content-text">
                                    {result.data}
                                  </div>
                                  <div ref={scrollPoint}></div>
                                </>
                              ) : (
                                <div className="chat-bubble bubble-right">
                                  <div className="typing">
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <Avatar
                              displayAvatar={true}
                              showAvatarId={result.id_image}
                              resultAvatar={true}
                            />
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    ) : (
                      <div>
                        {timer >= (index + 1) * 3 ? (
                          <div className="message mess-left">
                            <div className="mess-content">
                              <div className="content-name">
                                {result.namePlay}
                              </div>
                              {timer >= (index + 2) * 3 ? (
                                <>
                                  <div className="content-img">
                                    <ConvertUrl data={result.data} />
                                  </div>
                                  <div ref={scrollPoint2}></div>
                                </>
                              ) : (
                                <div className="chat-bubble bubble-left">
                                  <div className="typing">
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <Avatar
                              displayAvatar={true}
                              showAvatarId={result.id_image}
                              resultAvatar={true}
                            />
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {timer - 1 >= resultSet.length * 4 ? (
              <div className="mt-4">
                {role === 1 && (
                  <div className="row h-20 align">
                    <div className="col-6 right">
                      {player === 0 ? (
                        <div></div>
                      ) : (
                        <button onClick={previousPlayer} className="button">
                          Back
                        </button>
                      )}
                    </div>
                    <div className="col-6 left">
                      {player === location.state?.data.length - 1 ? (
                        <button className="button" onClick={handlePlayAgain}>
                          Play Again
                        </button>
                      ) : (
                        <button onClick={nextPlayer} className="button">
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                )}
                {role === 0 && (
                  <div className="row h-20 align">
                    <div className="center text">
                      WAITING FOR THE HOST TO SET UP AND TO START THE GAME
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowResult;
