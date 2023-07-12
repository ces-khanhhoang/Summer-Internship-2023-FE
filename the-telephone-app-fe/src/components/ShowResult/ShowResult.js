import "./ShowResult.css";
import { BsFillCaretLeftFill } from "react-icons/bs";
import imgLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import imgAvatar from "../../assets/avatar-1.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BiCrown } from "react-icons/bi";
const ShowResult = () => {
  const navigate = useNavigate();

  const handleButtonHome = () => {
    navigate("/");
  };

  const nextPlayer = () => {
    setPlayer((player += 1));
    getResult();
  };
  const previousPlayer = () => {
    setPlayer((player -= 1));
    getResult();
  };

  let ip = "http://192.168.101.180:9090/";

  const getResult = async () => {
    const response = await axios.post(
      ip +
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
    return <img className="sr-content-img" src={data}></img>; //2
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
    const response = await axios.post(ip + `user/again/${id_room}`);
  };

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
                  <div key={user.nickname} className="row h-20 tag-name">
                    <div className="flex-row align">
                      <img className="img-ava" src={imgAvatar} alt="avatar" />
                      <div className="text-ava">{user.nickname}</div>
                      <i className="icon-ava">
                        {user.role[0].name == "ROLE_HOST" && <BiCrown />}
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
                  <div>
                    {index % 2 == 0 ? (
                      <div>
                        <div className="message mess-right">
                          <div className="mess-content">
                            <div className="content-name">
                              {result.namePlay}
                            </div>
                            <div className="content-text">{result.data}</div>
                          </div>
                          <img src={imgAvatar} alt="" className="mess-avatar" />
                        </div>
                      </div>
                    ) : (
                      <div className="message mess-left">
                        <div className="mess-content">
                          <div className="content-name">{result.namePlay}</div>
                          <div className="content-img">
                            <ConvertUrl data={result.data} />
                          </div>
                        </div>
                        <img src={imgAvatar} alt="" className="mess-avatar" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {role == 1 && (
              <div className="row h-20 align">
                <div className="col-6 right">
                  {player == 0 ? (
                    <button disabled className="button">
                      Back
                    </button>
                  ) : (
                    <button onClick={previousPlayer} className="button">
                      Back
                    </button>
                  )}
                </div>
                <div className="col-6 left">
                  {player == location.state?.data.length - 1 ? (
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

export default ShowResult;
