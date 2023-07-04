import "./ShowResult.css";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { BsFillVolumeUpFill } from "react-icons/bs";
import imgLogo from "../../assets/gartic-phone.svg";
import { useNavigate } from "react-router-dom";
import imgAvatar from "../../assets/avatar-1.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const ShowResult = () => {
  const location = useLocation();
  const currentName = location.state?.name;
  let ip = "http://192.168.101.180:9090/";

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

  const getResult = async () => {
    const response = await axios.post(
      ip +
        `user/result/${location.state?.data[player].nickname}/${location.state?.id_room}`
    );
    const responseResult = response.data;
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

  const [users, setUsers] = useState(location.state?.data);
  const role = location.state?.role;
  const [results, setResult] = useState([]);
  let [player, setPlayer] = useState(0);
  const resultSet = location.state?.dataReceive;

  useEffect(() => {
    setUsers(location.state?.data);
    setResult(resultSet);
  }, [location.state?.data]);
  const handleButtonPlayAgain = async () => {
    let id_room = users[0].id_room;
    const response = await axios.post(ip + `user/again/${id_room}`);
  };
  return (
    <div className="sr-screen">
      <div className="sr-content">
        <div className="sr-header">
          <button className="sr-btn-back font-roboto" onClick={handleButtonHome}>
            <BsFillCaretLeftFill />
            HOME
          </button>
          <img src={imgLogo} alt="logo" className="sr-img-logo" />
          <button className="sr-btn-sound">
            <BsFillVolumeUpFill size={"24px"} />
          </button>
        </div>
        <div className="sr-sub-header">
          <div className="sr-sub-left font-roboto">PLAYERS</div>
          <div className="sr-sub-right font-roboto">
            {location.state?.data[player].nickname}'S ALBUM
          </div>
        </div>
        <div className="sr-center">
          <div className="sr-left">
            {users.map((user) => (
              <div className="sr-player">
                <img className="sr-img-avatar" src={imgAvatar} alt="avatar" />
                <span className="sr-name font-roboto">{user.nickname}</span>
              </div>
            ))}
          </div>
          <div className="sr-right">
            {results.map((result, index) => (
              <div>
                {index % 2 == 0 ? (
                  <div>
                    <div className="sr-message sr-mess-right ">
                      <div className="sr-mess-content">
                        <div className="sr-content-name font-roboto">{result.namePlay}</div>

                        <div className="sr-content-text font-roboto">{result.data}</div>
                      </div>
                      <img src={imgAvatar} alt="" className="sr-mess-avatar" />
                    </div>
                  </div>
                ) : (
                  <div className="sr-message sr-mess-left ">
                    <div className="sr-mess-content">
                      <div className="sr-content-name font-roboto">{result.namePlay}</div>
                      <div className="sr-content-img">
                        <ConvertUrl data={result.data} />
                      </div>
                    </div>
                    <img src={imgAvatar} alt="" className="sr-mess-avatar" />
                  </div>
                )}
              </div>
            ))}

            {role == 0 ? (
              ""
            ) : (
              <div>
                {player == 0 ? (
                  <button disabled className="sr-next-button font-roboto">
                    Back
                  </button>
                ) : (
                  <button onClick={previousPlayer} className="sr-next-button font-roboto">
                    Back
                  </button>
                )}

                {player == location.state?.data.length - 1 ? (

                  <button
                    className="sr-next-button font-roboto"
                    onClick={handleButtonPlayAgain}
                  >
                    Play Again
                  </button>
                ) : (
                  <button onClick={nextPlayer} className="sr-next-button font-roboto">
                    Next
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowResult;
