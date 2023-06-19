import './DescribePicture.css';
import imgLogo from '../../assets/gartic.svg';
import { BsClockFill } from "react-icons/bs";
const DescribePicture = () => {
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
                        <div className="dp-title">
                        NOW IT'S YOUR TURN TO DESCRIBE THIS SCENE
                        </div>
                    </div>
                    <div className="dp-main-content">
                        <img src={imgLogo} alt="img-content" className='dp-img-content' />
                    </div>
                    <div className="dp-action">
                        <input type="text" className='dp-input' placeholder='Type your description for this scene here ...'/>
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
 
export default DescribePicture;