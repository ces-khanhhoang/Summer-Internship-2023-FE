import './JoinRoom.css'
import { BsFillCaretLeftFill } from "react-icons/bs";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { BsFillSendXFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

import imgAvatar from '../../assets/avatar-1.svg';
import imgLogo from '../../assets/gartic-phone.svg';
import imgNormal from '../../assets/normal.svg';
const JoinRoom = () => {
    return (  
        <div className="screen">
            <div className="content">
                <div className="header">
                    <button className="btn-back">
                        <BsFillCaretLeftFill />
                        BACK
                    </button>
                    <img src={imgLogo} alt="logo"  className='img-logo'/>
                    <button className="btn-sound">
                        <BsFillVolumeUpFill size={'24px'} />
                    </button>
                </div>
                <div className="center">
                    <div className="left">
                        <h4 className="left-player">Player</h4>
                        <div className="user">
                            <span className='choice-number'>
                                <select name="" id="">
                                    <option value="">1</option>
                                </select>
                            </span>
                            <div className="player">
                                <div className="detail-player">
                                    <img src={imgAvatar} alt="avatar" className='img-avatar' />
                                    <span>CoolNickName</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="setting">
                            <div className="tab">
                                <h4 className="column">Preset</h4>
                                <h4 className="column">setting</h4>
                            </div>
                            <div className="data">
                                <div className="detail">
                                    <div className="detail-setting">
                                        <img src={imgNormal} alt="img-setting" className='img-setting' />
                                        <span>CoolNickName</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="action">
                            <button className="btn-action">
                                <BsFillSendXFill />
                                Invite
                            </button>
                            <button className="btn-action">
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

