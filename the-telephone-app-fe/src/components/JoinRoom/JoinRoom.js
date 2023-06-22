import './JoinRoom.css';
import { BsFillCaretLeftFill } from "react-icons/bs";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { BsFillSendXFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

import imgAvatar from '../../assets/avatar-1.svg';
import imgLogo from '../../assets/gartic-phone.svg';
import imgNormal from '../../assets/normal.svg';
import { Link, useLocation } from 'react-router-dom';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { useState, useEffect } from 'react';

const JoinRoom = () => {

    const { state } = useLocation();
    // console.log(state.data);

    useEffect(() => {
        setUserData(state.data);
        console.log(userData.id_room);
        connect();
    })

    const [userData, setUserData] = useState({
        id: 0,
        nickname: "",
        connected: false,
        id_room: 0,
        status: ""
    })

    var stompClient = null;

    const onError = (err) => {
        console.log(err);
    }


    const connect = () => {
        let Sock = new SockJS('http://192.168.101.44:9090/gameplay/')
        stompClient = over(Sock)
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        console.log("tên user " + userData.username);
        setUserData({ ...userData, "connected": true });
        // stompClient.subscribe('/chatroom/public', onPublicMessageReceived);
        stompClient.subscribe('/topic/' + userData.id_room);
        // userJoin();
    }


    // const onPrivateMessageReceived = (payload) => {
    //     console.log("hiii");
    //     var payloadData = JSON.parse(payload.body);
    //     console.log(payloadData);
    //     console.log(payloadData.senderName)
    //     console.log(privateChats);


    //     if (privateChats.get(payloadData.senderName)) {

    //         privateChats.get(payloadData.senderName).push(payloadData);
    //         console.log(privateChats);
    //         setPrivateChats(new Map(privateChats));
    //     } else {
    //         let list = []
    //         list.push(payloadData);
    //         privateChats.set(payloadData.senderName, list);

    //         setPrivateChats(new Map(privateChats));
    //     }
    // }


    const [publicChats, setpublicChats] = useState([])
    const [privateChats, setPrivateChats] = useState(new Map())
    const [tab, setTab] = useState("CHATROOM")


    return (
        <div className="jr-screen">
            <div className="jr-content">
                <div className="jr-header">
                    <Link to={'/'}>
                        <button className="jr-btn-back">
                            <BsFillCaretLeftFill />
                            Back
                        </button>
                    </Link>
                    <img src={imgLogo} alt="logo" className='jr-img-logo' />
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
                                    <option value="20">20 PLAYERS</option>
                                    <option value="30">30 PLAYERS</option>
                                    <option value="50">50 PLAYERS</option>

                                </select>
                            </span>
                            <div className="jr-player">
                                <div className="jr-detail-player">
                                    <img src={imgAvatar} alt="avatar" className='jr-img-avatar' />
                                    <span className='jr-text'>{state.data.nickname}</span>
                                </div>
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
                                        <span className='jr-box'>CoolNickName</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="jr-action">
                            <button className="jr-btn-action">
                                <BsFillSendXFill className='jr-btn-icon' />
                                Invite
                            </button>
                            <button className="jr-btn-action">
                                <BsFillArrowRightSquareFill className='jr-btn-icon' />
                                Go!
                            </button>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default JoinRoom;

