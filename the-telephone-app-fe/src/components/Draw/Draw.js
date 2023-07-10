import "../DescribePicture/DescribePicture.css";
import "./Draw.css";
import imgLogo from "../../assets/gartic.svg";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useOnDraw } from "../Hooks";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../firebase";
import axios from "axios";
import "../style.css";
import { RxPencil1 } from "react-icons/rx";
import { BsFillEraserFill } from "react-icons/bs";

const Draw = ({ width = "815rem", height = "350rem" }) => {
  let ip = "http://192.168.101.180:9090/";
  const location = useLocation();
  const turn = location.state?.turn;
  const id_room = location.state?.id_room;
  const currentName = location.state?.name;
  const dataReceive = location.state?.dataReceive;
  const [timer, setTimer] = useState(30);
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
    "white",
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

  // ===== To draw using Canvas

  const { onMouseDown, setCanvasRef } = useOnDraw(onDraw);

  const [eraserMode, setEraserMode] = useState(false);

  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, drawColor, 5);
  }

  function drawLine(start, end, ctx, color, width) {
    start = start ?? end;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    if (eraserMode === false) {
      ctx.lineWidth = width;
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    } else if (eraserMode === true) {
      ctx.clearRect(start.x, start.y, 24, 24);
    }
  }

  // ===== Change drawMode to Eraser...

  const drawModes = [
    { id: 1, modeIcon: <RxPencil1 size={"1.8rem"} key={"draw"} /> },
    { id: 2, modeIcon: <BsFillEraserFill size={"1.8rem"} key={"eraser"} /> },
  ];

  const [drawModeId, setDrawModeId] = useState(1);
  const drawModeClass = "draw-cursor";
  const eraseModeClass = "eraser-cursor";
  const [cursorMode, setCursorMode] = useState(drawModeClass);
  const changeMode = (mode) => {
    if (mode.modeIcon.key === "eraser") {
      setCursorMode(eraseModeClass);
      setEraserMode(true);
    }
    if (mode.modeIcon.key === "draw") {
      setCursorMode(drawModeClass);
      setEraserMode(false);
    }
    setDrawModeId(mode.id);
  };

  return (
    <div className="container-fluid app-bg vh-100">
      <div className="row">
        <div className="col-2">
          <div className="row mt-5">
            <div className="col-12 mt-5">
              <div className="card app-bg mw-100 border-4 mt-5">
                <div className="card-body">
                  <div className="row">
                    {colors.map((color) => (
                      <div key={color} className="col-3">
                        <div
                          style={
                            color === drawColor
                              ? {
                                  backgroundColor: color,
                                  border: "inset white 3.5px",
                                }
                              : {
                                  backgroundColor: color,
                                }
                          }
                          className="color-square mt-2"
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
            <div className="card border-4 app-bg">
              <div className="row">
                <div className="col-1 mt-3 fw-bold">?/?</div>
                <div className="col-10 mt-2">
                  <div className="card draw-header mt-3">
                    <img className="header-image" src={imgLogo}></img>
                    <p className="text-center w-100 fw-bold">
                      HEY, IT'S TIME TO DRAW!
                    </p>
                    <p className="text-center w-100 fw-bold">
                      {dataReceive.value}
                    </p>
                  </div>
                  <div className="card draw-paper">
                    <canvas
                      className={cursorMode}
                      id="myCanvas"
                      width={width}
                      height={height}
                      onMouseDown={onMouseDown}
                      ref={setCanvasRef}
                    />
                  </div>
                </div>
                <div className="col-1 mt-3 fw-bold">{timer}</div>

                <div className="row mt-3 mb-3">
                  <div className="col-8"></div>
                  <div className="col-3">
                    {isClicked ? (
                      <button disabled className="d-btn-done">
                        DONE!
                      </button>
                    ) : (
                      <button
                        ref={buttonDoneRef}
                        onClick={convertToImage}
                        className="d-btn-done"
                      >
                        DONE!
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
            <div className="col-12 mt-5">
              <div className="card app-bg mw-100 border-4 mt-5">
                <div className="card-body">
                  <div className="row">
                    {drawModes.map((mode, index) => (
                      <div key={index} className="col-6">
                        <div
                          style={
                            mode.id === drawModeId
                              ? { border: "solid 2px" }
                              : {}
                          }
                          className="draw-mode-square ms-3"
                        >
                          <div className="draw-mode-inside-square">
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
