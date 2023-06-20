import './StartGame.css';
import imgLogo from '../../assets/gartic-phone.svg';
import { BsFillCaretRightFill } from "react-icons/bs";
const StartGame = () => {
    return ( 
        <div className="sg-screen">
            <div className="sg-content">
                <div className="sg-header">
                    <img src={imgLogo} alt="" className='sg-img-logo' />
                </div>
                <div className="sg-center">
                    <div className="sg-left">
                        <div className="sg-title">
                            ANONYMOUS
                        </div>
                        <div className="sg-left-main">
                            <img src={imgLogo} alt="" className='sg-img-avatar' />
                            <div className="sg-fill">
                                <div className="sg-text">CHOOSE A CHARACTER AND A NICKNAME</div>
                                <input type="text" placeholder='CoolNickName7467' className='sg-input' />
                            </div>
                        </div>
                        <div className="sg-left-action">
                            <button className='sg-btn-start'>
                                <BsFillCaretRightFill className='sg-icon' />
                                START
                            </button>
                        </div>
                    </div>
                    <div className="sg-right">
                        <div className="sg-title">
                            HOW TO PLAY
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default StartGame;