import './JoinRoom.css';
import React, { useState, useEffect } from 'react';
import { BsFillCaretLeftFill } from "react-icons/bs";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { BsFillSendXFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import imgAvatar from '../../assets/avatar-1.svg';
import imgLogo from '../../assets/gartic-phone.svg';
import imgNormal from '../../assets/normal.svg';
const JoinRoom = () => {
    // useState [id_room, setIdRoom] = (location.state?.id_room);
    const location = useLocation();
    // console.log(location.state?.data);
    const host = location.state?.host;
    const users = location.state?.data;
    const id_room = location.state?.id_room;
    

    
  

    console.log('host'+host);

    console.log(users);
    console.log(id_room);
    
     
   
    const [roomLink, setRoomLink] = useState('');
    const handleInviteClick = () => {
        const link =  `http://localhost:3000/${id_room}`;
        setRoomLink(link);
        navigator.clipboard.writeText(link);
    };
    return (    
        <div className="jr-screen">
            <div className="jr-content">
                <div className="jr-header">
                    <button className="jr-btn-back">
                        <BsFillCaretLeftFill />
                        Back
                    </button> 
                    <img src={imgLogo} alt="logo"  className='jr-img-logo'/>
                    <button className="jr-btn-sound">
                        <BsFillVolumeUpFill size={'24px'} />
                    </button>
                </div>
                <div className="jr-center">
                    <div className="jr-left">
                        <h4 className="jr-left-player">PLAYERS</h4>
                        <div className="jr-user">
                            <span className='jr-choice-number'>
                                <select name="" id="">
                                    <option value="4">4 PLAYERS</option>
                                    <option value="5">5 PLAYERS</option>
                                    <option value="6">6 PLAYERS</option>
                                    <option value="7">7 PLAYERS</option>
                                    <option value="8">8 PLAYERS</option>
                                    <option value="9">9 PLAYERS</option>
                                    <option value="10">10 PLAYERS</option>
                                    <option value="12">12 PLAYERS</option>
                                    <option value="14">14 PLAYERS</option>
                                    <option value="16">16 PLAYERS</option>
                                    <option value="18">18 PLAYERS</option>
                                    <option value="20">4 PLAYERS</option>
                                    <option value="30">30 PLAYERS</option>
                                    <option value="50">50 PLAYERS</option>

                                </select>
                            </span>
                            <div className="jr-player">
                                {users && users.length >= 2 ? (
                                    users.map((user, index) => (
                                    <div className="jr-detail-player" >
                                        <img src={imgAvatar} alt="avatar" className='jr-img-avatar' />
                                        <span className='jr-text'>{user.nickname}</span>
                                    </div>
                                    ))
                                ):
                                (
                                    <div className="jr-detail-player" >
                                        <img src={imgAvatar} alt="avatar" className='jr-img-avatar' />
                                        <span className='jr-text'>{users.nickname}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="jr-right">
                        <div className="jr-setting">
                            <div className="jr-tab">
                                <h4 className="jr-column">PRESET</h4>
                                <h4 className="jr-column">CUSTOM SETTINGS</h4>
                            </div>
                            <div className="jr-data">
                                <div className="jr-detail">
                                    <div className="jr-detail-setting">
                                        <img src={imgNormal} alt="img-setting" className='jr-img-setting' />
                                        <span className='jr-box'></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {host==1 && (
                            <div className="jr-action">
                                <button className="jr-btn-action" onClick={handleInviteClick}>
                                <BsFillSendXFill className='jr-btn-icon' />
                                Invite
                                </button>

                                <button className="jr-btn-action">
                                <BsFillArrowRightSquareFill className='jr-btn-icon' />
                                Start
                                </button>
                            </div>
                        )}
                        {
                            host==0 && (
                                <div className="jr-action ">
                                    <div className="jr-text-player">
                                      WAITING FOR THE HOST TO SET UP AND TO START THE GAME 
                                    </div>
                                </div>
                            )
                        }

                        {/* <div className="jr-action">
                            <button className="jr-btn-action" onClick={handleInviteClick}>
                                <BsFillSendXFill className='jr-btn-icon' />
                                Invite
                            </button>

                            <button className="jr-btn-action">
                                <BsFillArrowRightSquareFill className='jr-btn-icon' />
                                Start
                            </button>
                        </div> */}
                    </div>
                </div>

            </div>
            
        </div>
    );
}
 
export default JoinRoom;