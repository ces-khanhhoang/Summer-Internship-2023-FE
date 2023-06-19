import './JoinRoom.css';
import { BsFillCaretLeftFill } from "react-icons/bs";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { BsFillSendXFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

import imgAvatar from '../../assets/avatar-1.svg';
import imgLogo from '../../assets/gartic-phone.svg';
import imgNormal from '../../assets/normal.svg';
const JoinRoom = () => {
    return (  
        <div className="jr-screen">
            <div className="jr-content">
                <div className="jr-header">
                    <button className="jr-btn-back">
                        <BsFillCaretLeftFill />
                        BACK
                    </button>
                    <img src={imgLogo} alt="logo"  className='jr-img-logo'/>
                    <button className="jr-btn-sound">
                        <BsFillVolumeUpFill size={'24px'} />
                    </button>
                </div>
                <div className="jr-center">
                    <div className="jr-left">
                        <h4 className="jr-left-player">Player</h4>
                        <div className="jr-user">
                            <span className='jr-choice-number'>
                                <select name="" id="">
                                    <option value="">1</option>
                                </select>
                            </span>
                            <div className="jr-player">
                                <div className="jr-detail-player">
                                    <img src={imgAvatar} alt="avatar" className='jr-img-avatar' />
                                    <span>CoolNickName</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="jr-right">
                        <div className="jr-setting">
                            <div className="jr-tab">
                                <h4 className="jr-column">Preset</h4>
                                <h4 className="jr-column">setting</h4>
                            </div>
                            <div className="jr-data">
                                <div className="jr-detail">
                                    <div className="jr-detail-setting">
                                        <img src={imgNormal} alt="img-setting" className='jr-img-setting' />
                                        <span>CoolNickName</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="jr-action">
                            <button className="jr-btn-action">
                                <BsFillSendXFill />
                                Invite
                            </button>
                            <button className="jr-btn-action">
                                <BsFillArrowRightSquareFill />
                                Start 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
 
export default JoinRoom;

