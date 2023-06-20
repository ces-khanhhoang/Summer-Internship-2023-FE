import '../DescribePicture/DescribePicture.css';
import './WriteSentence.css';
import imgLogo from '../../assets/gartic.svg';
import imgWrite from '../../assets/write.png';
import { BsClockFill } from "react-icons/bs";
const WriteSentence = () => {
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
                        <input type="text" className='dp-input' placeholder=' ... '/>
                        <button className='dp-btn-done'>DONE!</button>
                    </div>
                </div>
                <div className="dp-sub-right">
                    <BsClockFill size= '30px'/>
                </div>
            </div>
        </div>
     );
}
 
export default WriteSentence;

