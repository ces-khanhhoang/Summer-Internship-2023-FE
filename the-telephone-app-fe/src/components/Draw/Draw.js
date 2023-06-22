import '../DescribePicture/DescribePicture.css';
import './Draw.css';
import imgLogo from '../../assets/gartic.svg';
import { BsClockFill } from "react-icons/bs";

import { useOnDraw } from '../Hooks'
import { ref, uploadBytes, getStorage, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const Draw = ({
    width = '846 rem',
    height = '360 rem'
}) => {
    const convertToImage = () => {
        const canvas = document.getElementById('myCanvas');
        const imageDataURL = canvas.toDataURL('image/png');
        const url = imageDataURL;
        fetch(url)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], "File name", { type: "image/png" });
                uploadImage(file);
            })
    }



    const uploadImage = (file) => {
        const storage = getStorage();
        const randomName = v4();
        const storageRef = ref(storage, 'images/' + randomName);
        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(downloadURL => {
                console.log('Download link to your file: ', downloadURL);
            });
        });
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
        ctx.fill();
    }

    function clear() {
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
                            <img src={imgLogo} alt="" className='dp-img-logo-gartic' />
                        </div>
                        <div className="d-title">
                            HEY, IT'S TIME TO DRAW!
                        </div>
                        <div className="d-text">
                            Vetagarian confectioner in the sewer ... =)) ahihi
                        </div>
                    </div>
                    <div className="dp-main-content">
                        <canvas
                            id="myCanvas"
                            width={width}
                            height={height}
                            onMouseDown={onMouseDown}
                            // style={{ backgroundColor: 'yellow' }}
                            ref={setCanvasRef}
                        />
                    </div>
                    <div className="dp-action">
                        <div>
                            <button
                                className='btn btn-sm btn-outline-dark'
                                onClick={clear}>Clear</button>
                        </div>
                        <button onClick={convertToImage} className='d-btn-done'>DONE!</button>
                    </div>
                </div>
                <div className="dp-sub-right">
                    <BsClockFill size='30px' />
                </div>
            </div>
        </div>
    );
}

export default Draw;