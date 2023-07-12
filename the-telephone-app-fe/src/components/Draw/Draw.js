import "../DescribePicture/DescribePicture.css";
import "./Draw.css";
import imgLogo from "../../assets/header.png";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useOnDraw } from "../Hooks";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../firebase";
import axios from "axios";
import { RxPencil1 } from "react-icons/rx";
import { BsFillEraserFill } from "react-icons/bs";
import { BsFillCheckCircleFill } from "react-icons/bs";
import "../../assets/index.css";

const Draw = ({ width = "815rem", height = "350rem" }) => {
  let ip = "http://192.168.101.180:9090/";
  const location = useLocation();
  const turn = location.state?.turn;
  const totalTurn = location.state?.data.length;
  const id_room = location.state?.id_room;
  const currentName = location.state?.name;
  const dataReceive = location.state?.dataReceive;
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

  // ===== Convert Canvas to png file and upload to Firebase

  const convertToImage = () => {
    setIsClicked(true);
    const canvas = document.getElementById("myCanvas");
    const imageDataURL = canvas.toDataURL("image/png");
    const url = imageDataURL;
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "File name", { type: "image/png" });
        uploadImage(file);
      });
  };

  const uploadImage = (file) => {
    const storage = getStorage();
    const randomName = v4();
    const storageRef = ref(storage, "images/" + randomName);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log("Download link to your file: ", downloadURL);
        const image = downloadURL;
        handleUploadImage(id_room, currentName, image, turn);
      });
    });
  };

  const handleUploadImage = async (id_room, nickname, image, turn) => {
    image = image.replace(
      "https://firebasestorage.googleapis.com/v0/b/ces-telephone.appspot.com/o/images%",
      "(1)"
    ); //1
    image = image.replace("?alt=media&token=", "(2)"); //2

    console.log(image);
    const response = await axios.post(
      ip + `user/done/${id_room}/${dataReceive.receiver}/${image}/${turn}`
    );
  };

  // ===== Choose Color

  const colors = [
    "red",
    "whitesmoke",
    "blue",
    "black",
    "green",
    "gray",
    "pink",
    "yellow",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "navy",
    "orange",
    "purple",
    "violet",
  ];

  const [drawColor, setDrawColor] = useState("black");

  const changeColor = (color) => {
    setDrawColor(color);
  };

  const [isClicked, setIsClicked] = useState(false);

  // ===== Change line width

  const [lineWidth, setlineWidth] = useState(3);

  const widths = [3, 5, 7, 10, 13.5, 17];

  const changeLineWidth = (width) => {
    setlineWidth(width);
  };

  // ===== Draw using Canvas

  const { onMouseDown, setCanvasRef } = useOnDraw(onDraw);

  const [eraserMode, setEraserMode] = useState(false);

  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, drawColor, lineWidth);
  }

  function drawLine(start, end, ctx, color, width) {
    start = start ?? end;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    if (eraserMode) {
      ctx.clearRect(start.x, start.y, 16, 16);
    } else {
      ctx.lineWidth = width;
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(start.x, start.y, lineWidth / 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  // ===== Change drawMode to Eraser...

  const drawModes = [
    { id: 1, modeIcon: <RxPencil1 size={"1.8rem"} key={"draw"} /> },
    { id: 2, modeIcon: <BsFillEraserFill size={"1.8rem"} key={"eraser"} /> },
  ];

  const [drawModeId, setDrawModeId] = useState(1);
  const changeMode = (mode) => {
    if (mode.modeIcon.key === "eraser") {
      setEraserMode(true);
    }
    if (mode.modeIcon.key === "draw") {
      setEraserMode(false);
    }
    setDrawModeId(mode.id);
  };

  return (
    <div className="container-fluid app-bg vh-100">
      <div className="row">
        <div className="col-2">
          <div className="row mt-5">
            <div className="col-11 mt-5">
              <div className="card app-bg custom-border-color border-4 mt-5">
                <div className="card-body">
                  <div className="row">
                    {colors.map((color) => (
                      <div key={color} className="col-3">
                        <div
                          style={{ backgroundColor: color }}
                          className={`mt-2
                            ${
                              color === drawColor
                                ? "chosen-color-square"
                                : "color-square"
                            }
                          `}
                          onClick={() => changeColor(color)}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="row mt-5">
            <div className="card invisible-border border-4 app-bg">
              <div className="row">
                <div className="col-1 mt-3 pt-2 custom-font">
                  {turn}/{totalTurn}
                </div>
                <div className="col-10 mt-2">
                  <div className="card draw-header mt-3">
                    <img className="header-image" src={imgLogo}></img>
                    <p className="draw-header-font">HEY, IT'S TIME TO DRAW!</p>
                    <p className="written-sentence">{dataReceive.value}</p>
                  </div>
                  <div className="card draw-paper">
                    <canvas
                      className={eraserMode ? "eraser-cursor" : "draw-cursor"}
                      id="myCanvas"
                      width={width}
                      height={height}
                      onMouseDown={onMouseDown}
                      ref={setCanvasRef}
                    />
                  </div>
                </div>
                <div className="col-1 mt-3 ps-2 pt-2 custom-font">{timer}</div>

                <div className="row mt-3 mb-3">
                  <div className="col-5 width-change-area card">
                    <div className="row">
                      {widths.map((width) => (
                        <div key={width} className="col-2">
                          <div
                            style={
                              width === lineWidth
                                ? { borderColor: drawColor }
                                : {}
                            }
                            onClick={() => changeLineWidth(width)}
                            className={`m-3 position-relative
                              ${
                                width === lineWidth
                                  ? "chosen-width-button"
                                  : "width-button"
                              }`}
                          >
                            <div
                              style={
                                width === lineWidth
                                  ? {
                                      width: width + 2,
                                      height: width + 2,
                                      backgroundColor: drawColor,
                                    }
                                  : { width: width + 2, height: width + 2 }
                              }
                              className="width-button-size position-absolute top-50 start-50 translate-middle"
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-3">
                    {isClicked ? (
                      <button disabled className="d-btn-done">
                        <BsFillCheckCircleFill /> DONE!
                      </button>
                    ) : (
                      <button
                        ref={buttonDoneRef}
                        onClick={convertToImage}
                        className="d-btn-done"
                      >
                        <BsFillCheckCircleFill /> DONE!
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="row mt-5">
            <div className="col-11 ms-4 mt-5">
              <div className="card custom-border-color app-bg mw-100 border-4 mt-5">
                <div className="card-body">
                  <div className="row">
                    {drawModes.map((mode, index) => (
                      <div key={index} className="col-6">
                        <div
                          className={`ms-4 position-relative ${
                            mode.id === drawModeId
                              ? "chosen-draw-mode-square"
                              : "draw-mode-square"
                          }
                          `}
                        >
                          <div
                            className={
                              "draw-mode-inside-square position-absolute top-50 start-50 translate-middle"
                            }
                          >
                            <div
                              onClick={() => changeMode(mode)}
                              className="ps-2 pt-2"
                            >
                              {mode.modeIcon}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Draw;
