import '../DescribePicture/DescribePicture.css';
import './WriteSentence.css';
import imgLogo from '../../assets/gartic.svg';
import imgWrite from '../../assets/write.png';
import { BsClockFill } from "react-icons/bs";
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WriteSentence = () => {
    const location = useLocation();
    const UserDto = location.state?.UserDto;

    const [timer, setTimer] = useState(50);
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
      const [content, setContent] = useState('');
      const handleChangeContent = (event) => {
        setContent(event.target.value);
      };
      const handleDone= async () =>{
        // console.log('done'+content);
        const response = await axios.post(`http://192.168.101.177:9090/user/done/${UserDto}`);
        console.log('userDto'+UserDto);



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
                        
                    </div>
                    <div className="ws-main-content">
                        <img src={imgWrite} alt="img-content" className='ws-img-content' />
                        <div className="ws-title">
                        WRITE A SENTENCE
                        </div>
                    </div>
                    <div className="dp-action">
                        <input type="text" className='dp-input' placeholder=' ... ' onChange={handleChangeContent}/>
                        <button ref={buttonDoneRef} className='dp-btn-done' onClick={handleDone}>DONE!</button>
                    </div>
                </div>
                <div className="dp-sub-right">
                    {/* <BsClockFill size= '30px'/> */}
                    {timer}
                </div>
            </div>
        </div>
     );
}
 
export default WriteSentence;

