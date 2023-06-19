import { useOnDraw } from '../Hooks'
import { ref, uploadBytes, getStorage, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import './DrawAPicture.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const DrawAPicture = ({
    width,
    height
    // 1516 848
}) => {

    // const uploadPicture = () => {
    //     if (picture == null) return;
    //     const canvas = document.getElementById('myCanvas');
    //     // const imageDataURL = canvas.toDataURL('image/png');
    //     const pictureRef = ref(storage, '/${picture.name + v4()}');
    //     uploadBytes(pictureRef, picture).then(() => {
    //         alert("Picture uploaded");
    //     })
    // };


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
        // console.log(file);
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

    function clear() {
        const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return (
        // <div className='container-fluid card vh-100'
        //     style={{
        //         backgroundImage:
        //             'url("https://marketplace.canva.com/EAFHm4JWsu8/1/0/1600w/canva-pink-landscape-desktop-wallpaper-HGxdJA_xIx0.jpg")'
        //     }}>
        //     <div className='row mt-5'>
        //         <div className='col-3'></div>
        //         <div className='col-6'>
        //             <div className='card'
        //                 style={{ border: "solid 0.2rem" }}>
        //                 <div className='card-header headerColor'
        //                     style={{
        //                         borderBottom: "solid 0.2rem",
        //                     }}>
        //                     <h3 className='text-uppercase mt-2 text-center text-white '>
        //                         Hey, it's time to draw</h3>
        //                     <h4 className='text-center text-white'>sentence</h4>
        //                 </div>
        //                 <div className='card-body borderColor'
        //                 >
        //                     <canvas
        //                         id="myCanvas"
        //                         width={width}
        //                         height={height}
        //                         onMouseDown={onMouseDown}
        //                         ref={setCanvasRef}
        //                         style={canvasStyle}
        //                         className='rounded'
        //                     />
        //                 </div>
        //             </div>
        //             <div className='text-center mt-3'>
        //                 <button
        //                     className='btn btn-light'
        //                     style={{
        //                         minWidth: "6rem",
        //                         border: "solid 0.1rem",
        //                     }} onClick={convertToImage}>
        //                     <FontAwesomeIcon icon={icon({ name: 'circle-check' })} />  Done</button>
        //                 <button
        //                     className='btn btn-light'
        //                     style={{
        //                         minWidth: "6rem",
        //                         border: "solid 0.1rem",
        //                     }} onClick={clear}>
        //                     <FontAwesomeIcon icon={icon({ name: 'rotate' })} /> Reset</button>
        //             </div>
        //         </div>
        //         <div className='col-3'></div>
        //     </div>

        // </div>
        <div>
            <div className="dp-content">
                <div className="dp-sub-left">

                </div>
                <div className="dp-main">
                    <div className="dp-header">
                        <div className=" text-white text-center mt-3">
                            <h5> Hey, it's time to draw</h5>
                            <h1>sentence</h1>
                        </div>
                    </div>
                    <div className="dp-main-content">
                        <canvas
                            id="myCanvas"
                            width={width}
                            height={height}
                            onMouseDown={onMouseDown}
                            ref={setCanvasRef}
                            style={canvasStyle}
                            className='rounded'
                        />
                    </div>
                    <div className="dp-action text-center ">
                        <button
                            className='btn btn-outline-dark ms-2 mb-1'
                            style={{
                                minWidth: "8rem",
                                minHeight: "3rem",
                                border: "solid 0.1rem",
                            }} onClick={convertToImage}>
                            <FontAwesomeIcon icon={icon({ name: 'circle-check' })} />  Done</button>
                        <button
                            className='btn btn-outline-dark  ms-1 mb-1'
                            style={{
                                minWidth: "8rem",
                                minHeight: "3rem",
                                border: "solid 0.1rem",
                            }} onClick={clear}>
                            <FontAwesomeIcon icon={icon({ name: 'rotate' })} /> Reset</button>
                    </div>
                </div>
                <div className="dp-sub-right">
                    {/* <BsClockFill size='30px' /> */}
                </div>
            </div>
        </div>


    )
}

export default DrawAPicture;

const canvasStyle = {
    backgroundColor: 'white',
}