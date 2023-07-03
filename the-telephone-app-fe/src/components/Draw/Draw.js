import "../DescribePicture/DescribePicture.css";
import "./Draw.css";
import imgLogo from "../../assets/gartic.svg";
import { BsClockFill } from "react-icons/bs";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useOnDraw } from "../Hooks";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../firebase";
import axios from "axios";

const Draw = ({ width = '670%', height = '300%' }) => {
  const ip = 'http://192.168.101.180:9090/';

  const location = useLocation();
  const turn = location.state?.turn;
  const id_room = location.state?.id_room;
  const currentName = location.state?.name;
  const dataReceive = location.state?.dataReceive;

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
    image = image.replace("https://firebasestorage.googleapis.com/v0/b/ces-telephone.appspot.com/o/images%", "(1)");//1
    image = image.replace("?alt=media&token=", "(2)");//2

    console.log(image);
    const response = await axios.post(
      ip+`user/done/${id_room}/${nickname}/${image}/${turn}`
    );


  };

  const { onMouseDown, setCanvasRef } = useOnDraw(onDraw);

  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, "#000000", 5);
  }

  function drawLine(start, end, ctx, color, width) {
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="dp-screen">
      <div className="dp-content">
        <div className="dp-sub-left">?/?</div>
        <div className="dp-main">
          <div className="dp-header">
            <div className="dp-logo">
              <img src={imgLogo} alt="" className="dp-img-logo-gartic" />
            </div>
            <div className="d-title">HEY, IT'S TIME TO DRAW!</div>
            <div className="d-text">{dataReceive.value}</div>
          </div>
          <div className="dp-main-content">
            <canvas
              id="myCanvas"
              width={width}
              height={height}
              onMouseDown={onMouseDown}
              ref={setCanvasRef}
            />
          </div>
          <div className="dp-action">
            {isClicked ? (
              <button disabled className="d-btn-done">
                DONE!
              </button>
            ) : (
              <button onClick={convertToImage} className="d-btn-done">
                DONE!
              </button>
            )}
          </div>
        </div>
        <div className="dp-sub-right">
          <BsClockFill size="30px" />
        </div>
      </div>
    </div>
  );
};

export default Draw;