import React from "react";
import styled from "styled-components";

import { useState } from "react";
import axios from "axios";
import { addmsg,getmsg } from "../utils/apiroutes";
import { useEffect , useRef } from "react";
import {v4 as uuidv4} from "uuid";



export default function Chat(currentuser) {
    const [inputValue, setInputValue] = useState('');
const user = JSON.parse(localStorage.getItem("user"));
const [message, setmessage] = useState([]);
const scrollRef = useRef();
const [newmessage, setnewmessage] = useState(null);
const socket = currentuser.socket;



const handleInputChange = (event) => {
    setInputValue(event.target.value);
};


const handleSubmit = async (event) => {
    event.preventDefault();

    if (inputValue.length > 0) {

        await axios.post(addmsg, {
            sender: user._id,
            reciver: currentuser.currentuser._id,
            message: inputValue
        });
        if (socket.current) {
            
            socket.current.emit("send-message", {
                senderId: user._id,
                receiverId: currentuser.currentuser._id,
                message: inputValue
            });
            
            
        }
        setmessage((prev) => [
            ...prev,
            { message: inputValue, from_me: true }
        ]);
        setInputValue('');
    }
};

useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.post(getmsg, {
                sender: user._id,
                reciver: currentuser.currentuser._id
            });
            setmessage(res.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    fetchData();
}, [currentuser]);

useEffect(() => {
    if (socket.current) {
        socket.current.on('receive-message', (data) => {
            //console.log(data);
            setnewmessage({ message: data.message, from_me: false });
        });
    }
}, []);

useEffect(() => {
    if (newmessage) {
        setmessage((prev) => [...prev, newmessage]);
    }
}, [ newmessage]);

useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
}, [message]);


        
    return (
        <>
            <ChatContainer>
                <div className="chat">
                    <div className="chat-header">
                        <div className="profile">
                            <img src={`data:image/svg+xml;base64,${currentuser.currentuser.profileimg}`} alt="profile" />
                            <h4>{currentuser.currentuser.username}</h4>
                        </div>
                    </div>
                    <div className="chat-body">
                        <div className="chat-message">
                            {

                                message.map((msg) => {
                                    return(
                                <div ref={scrollRef} key={uuidv4()}>
                                <div className={`message ${msg.from_me ? "sent" : "recive"}`} >
                                <div className="content">
                                {msg.message}
                                </div>
                                </div>
                                </div>
                                )

                            
                            }  )}
                        </div>
                    </div>
        <div className="chat-footer">
    <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}  
        />
<input type="submit" value="Send" />
            </form>
                    </div>
                </div>
            </ChatContainer>
        </>
    );
}

const ChatContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
    .chat {
        width: 105%;
        height: 100%;
        background: #7e08b9  ;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        .chat-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            box-shadow: 0 2px 7px rgba(0,0,0,0.3);
            background-color:#460368  ;
            border-bottom: 1px solid black;
            .profile {
                display: flex;
                align-items: center;
                gap: 1rem;
                img {
                    width: 50px;
                    height: 50px;
                    border-radius: 20%
                }
                h4 {
                    margin: 0;
                    color: white;
                    font-size: 1.5rem;
                }
            }
        }
        .chat-body {
            flex: 1;
            overflow-y: auto;
            &::-webkit-scrollbar {
                width: 10px;
            }
            .chat-message {
                flex-direction: column;
                margin: 1rem;
                display: flex;
                gap: 0.5rem;
                .message{
                display: flex;
                
                &.sent{
                    justify-content : flex-end;

                }
                &.recive{
                        justify-content : flex-start;
                     
                    
                }
            
                .content{
                    padding: 1rem;
                    background: #64128e ;
                    color: white;
                    max-width:40%;
                    box-shadow: 0 2px 7px rgba(0,0,0,0.4);
                    border-radius: 10px;
                    border-bottom: 1px solid black;
                    align-items:center;
                    display:flex;
                    overflow_warp : break-word;
                    font-size : 1rem;
                    transition: 0.3s;
                    &:hover{
                        transform: scale(1.1);
                        transition: 0.5s;
                    }

                }
            
                }
                } 
            }
    
        .chat-footer {
            display: flex;
            align-items: center;
            padding: 0.5rem;
            gap: 0.1rem;
            
            form{
                display: flex;
                flex: 1;
                gap: 0.5rem;
                align-items: center;
                justify-content: center;
                margin: 0;
                padding: 0;
            }
            input[type="text"] {
                flex: 1;
                padding: 0.7rem;
                border: none;
                border-radius: 5px;
                outline: none;
                box-shadow: 0 2px 7px rgba(0,0,0,0.3);
               

            }
            input[type="submit"] {
                padding: 0.7rem 1rem;
                background: #333;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                outline: none;
                box-shadow: 0 2px 7px rgba(0,0,0,0.3);
                &:hover {
                    background: #555;
                }   
            }
        }
    }
`;
