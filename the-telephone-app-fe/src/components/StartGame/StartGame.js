import './StartGame.css';
import imgLogo from '../../assets/gartic-phone.svg';
import { BsFillCaretRightFill } from "react-icons/bs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

const StartGame = () => {

    const [data, setData] = useState({ nickname: "" });
    const onInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData({ ...data, [name]: value })
    }

    const generateRandomName = () => {
        let defaultName = 'CoolNickname' + Math.floor(Math.random() * (9999 - 1000 + 1));
        return defaultName;
    }

    let defaultName = generateRandomName();

    let navigate = useNavigate();

    const [userData, setUserData] = useState({
        id: 0,
        nickname: "",
        connected: false,
        id_room: 0,
        status: ""
    })

    function handleSubmit() {
        // event.preventDefault();
        let nick = data.nickname;
        console.log(nick);
        if (nick == "") {
            nick = defaultName;
        }
        // navigate("/lobby", { state: { data: nick } });
        console.log(nick);
        axios.post('http://192.168.101.44:9090/user/create/' + nick).then(data => {
            setUserData(data.data);
            console.log(data.data);
            console.log(userData);
            // navigate("/lobby", { state: { data: userData } });
            // connect();
        })
    }


    var stompClient = null;

    const onError = (err) => {
        console.log(err);

    }


    const connect = () => {
        let Sock = new SockJS('http://192.168.101.178:8080/ws')
        stompClient = over(Sock)
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        console.log("tên user " + userData.username)
        setUserData({ ...userData, "connected": true });
        // stompClient.subscribe('/chatroom/public', onPublicMessageReceived);
        stompClient.subscribe('/user/' + userData.id_room + '/private', onPrivateMessageReceived);
        // userJoin();
    }


    const onPrivateMessageReceived = (payload) => {
        console.log("hiii");
        var payloadData = JSON.parse(payload.body);
        console.log(payloadData);
        console.log(payloadData.senderName)
        console.log(privateChats);


        if (privateChats.get(payloadData.senderName)) {

            privateChats.get(payloadData.senderName).push(payloadData);
            console.log(privateChats);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = []
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);

            setPrivateChats(new Map(privateChats));
        }
    }


    const [publicChats, setpublicChats] = useState([])
    const [privateChats, setPrivateChats] = useState(new Map())
    const [tab, setTab] = useState("CHATROOM")


    return (
        <div className="sg-screen">
            <form>
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
                                    <input name='nickname' onChange={onInput} type="text" placeholder={defaultName} className='sg-input' />
                                </div>
                            </div>
                            <div className="sg-left-action">
                                <button type='button' onClick={() => handleSubmit()} className='sg-btn-start'>
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
            </form>
        </div>
    );
}

export default StartGame;