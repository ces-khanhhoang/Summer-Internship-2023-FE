import { useOnDraw } from './Hooks'
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { storage } from './firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from "uuid";
const Canvas = ({
    width,
    height
}) => {

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


    // const canvas = document.getElementById('myCanvas');
    // const imageDataURL = canvas.toDataURL('image/png');


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
        <div className='container-fluid'>
            <canvas
                id="myCanvas"
                width={width}
                height={height}
                onMouseDown={onMouseDown}
                style={canvasStyle}
                ref={setCanvasRef}
            />
            <button onClick={testing}>Done</button>
        </div>
    )
}

export default Canvas;

const canvasStyle = {
    border: "1px solid black",
}