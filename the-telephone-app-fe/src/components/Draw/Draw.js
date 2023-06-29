import '../DescribePicture/DescribePicture.css';
import './Draw.css';
import imgLogo from '../../assets/gartic.svg';
import imgGalaxy from '../../assets/galaxy.jpg';
import { BsClockFill } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import { useOnDraw } from '../Hooks'
import { useEffect, useState } from 'react';
// import { collection, onSnapshot } from 'firebase/firestore';
import { storage } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';

const Draw = ({
    width = '670%',
    height = '300%'
}) => {
    const location = useLocation();
    const turn = location.state?.turn;
    const id_room = location.state?.id_room;
    const currentName = location.state?.name;
    const dataReceive = location.state?.dataReceive;

    console.log(dataReceive);
    const [picture, setPicture] = useState(null);
    const uploadPicture = () => {
        if (picture == null) return;
        const canvas = document.getElementById('myCanvas');
        // const imageDataURL = canvas.toDataURL('image/png');
        const pictureRef = ref(storage, 'picture/${picture.name +}');
        uploadBytes(pictureRef, picture).then(() => {
            alert("Picture uploaded");
        })
    };

    const testing = () => {
        const canvas = document.getElementById('myCanvas');
        const imageDataURL = canvas.toDataURL('image/png');
        document.write('<img src="' + imageDataURL + '"/>');
        console.log(canvas.toDataURL('image/png'));
    }
    const {
        onMouseDown,
        setCanvasRef
    } = useOnDraw(onDraw);


    function onDraw(ctx, point, prevPoint) {
        drawLine(prevPoint, point, ctx, '#000000', 5);
    }

    function drawLine(
        start,
        end,
        ctx,
        color,
        width
    ) {
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

        // ctx.stroke();
        ctx.fill();
        // ctx.stroke();
    }

    return ( 
        <div className="dp-screen">
            <div className="dp-content">
                <div className="dp-sub-left">
                    ?/?
                </div>
                <div className="dp-main">
                    <div className="dp-header">
                        <div className="dp-logo">
                            <img src={imgLogo} alt="" className='dp-img-logo-gartic'/>
                        </div>
                        <div className="d-title">
                        HEY, IT'S TIME TO DRAW!
                        </div>
                        <div className="d-text">
                        {dataReceive.value}
                        </div>
                    </div>
                    <div className="dp-main-content">
                        <canvas
                            id="myCanvas"
                            width={width}
                            height={height}
                            onMouseDown={onMouseDown}
                            // style={canvasStyle}
                            ref={setCanvasRef}
                        />
                    </div>
                    <div className="dp-action">
                        <button className='d-btn-done'>DONE!</button>
                    </div>
                </div>
                <div className="dp-sub-right">
                    <BsClockFill size= '30px'/>
                </div>
            </div>
        </div>
     );
}
 
export default Draw;