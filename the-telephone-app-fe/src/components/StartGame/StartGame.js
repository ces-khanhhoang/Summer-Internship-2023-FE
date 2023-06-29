import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StartGame.css';
import imgLogo from '../../assets/gartic-phone.svg';
import { BsFillCaretRightFill } from "react-icons/bs";
import {over} from 'stompjs';
import SockJS from "sockjs-client";
import { useParams } from 'react-router-dom';
const StartGame = () => {
    const [name, setName] = useState('Nickname' + Math.round(Math.random() * 100000) );
    let startGame;
    
    const handleNameChange = (e) => {
        if(e.target.value) {
            setName(e.target.value);
        }
        else {
            setName('Nickname' + Math.round(Math.random() * 1000));
        }
    }

    let UserDto = {
        id_room: id_room,
        nickname: name,
        data: "",
        turn: 0,
        role: 0,
        content: "",
        image:''
      };
    //   useEffect(() => {
    //     setTurn(UserDto.turn => UserDto.turn +1);
    //   }, [startGame]);
    const navigate = useNavigate();
    const onError =(err)=>{
        console.log(err);
    }
    const { id_room } = useParams();
    var client = null;

    const onConnected = (id_room,data,role) => {
        client.subscribe('/topic/'+id_room,
        function (response) {
            UserDto.role = role;
            data = JSON.parse(response.body);
            navigate('/lobby', { state: { data, UserDto} });
            startGame = data[0].status;
            if(startGame === 'IN_PROGRESS'){
                navigate('/start',{ state: {UserDto} })
            }
        }
        );

        client.subscribe('/topic/'+name,
        function (response) {
            const dataReceive = JSON.parse(response.body);
            console.log(dataReceive);
            if(startGame === 'DRAW'){
            navigate('/draw', { state: { dataReceive, UserDto} });
            }
        }
        );
    navigate('/lobby', { state: { data,UserDto} });
    }


    

    const handleStartClick = async ()=> {
        const response = await axios.post(`http://192.168.101.177:9090/user/create/${name}`);
        const host = response.data;
        var Sock = new SockJS('http://192.168.101.177:9090/gameplay') 
        client = over(Sock);
        client.connect({},() =>onConnected(host.id_room,host,1), onError);
    } 

    const handleJoinClick = async ()=> {
        const response = await axios.post(`http://192.168.101.177:9090/user/join/${id_room}/${name}`);
        const users = response.data;
         var Sock = new SockJS('http://192.168.101.177:9090/gameplay') 
         client = over(Sock);
         client.connect({},() => onConnected(id_room,users,0), onError);
    }

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
                                <input type="text" placeholder={name} className='sg-input' onChange ={handleNameChange} />
                                
                            </div>
                        </div>
                        <div className="sg-left-action">
                        {
                                id_room?
                                    (
                                        <button className='sg-btn-start' onClick={handleJoinClick}>
                                            <div className="">
                                                <BsFillCaretRightFill className='sg-icon' />
                                                JOIN
                                            </div>
                                        </button>
                                    )
                                    :(
                                        <button className='sg-btn-start' onClick={handleStartClick}>
                                            <div className="">
                                                <BsFillCaretRightFill className='sg-icon' />
                                                START
                                            </div>
                                        </button>
                                    )
                            }
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