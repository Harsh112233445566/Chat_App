import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { alluser } from "../utils/apiroutes";
import Home from "../components/contacts";
import Ready from "../components/ready";
import Chat from "../components/Chat";
import io from "socket.io-client";
import { useRef } from "react";
import {host }from "../utils/apiroutes";


export default function ChatPage() {
    const socket = useRef();

    const [users, setUsers] = useState([]);
    const [currentuser, setCurrentUser] = useState({}); 
    const [currentmessager, setCurrentMessager] = useState(undefined);
    const [isReady, setIsReady] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("user");
       
        if (!user) {
            navigate("/register");
            return;
        }
        const parsedUser = JSON.parse(user);
        
        if (!parsedUser.isProfile) {
            navigate("/avatar");
            return;
        }
        setIsReady(true);
        
        setCurrentUser(parsedUser);

        const fetchUsers = async () => {
            try {
                const { data } = await axios.get(`${alluser}/${parsedUser._id}`);
             
                setUsers(data);

            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        
        fetchUsers();

        
    }, [navigate]);
    useEffect(() => {
        if (currentmessager) {
            socket.current = io(host);
            socket.current.emit("join", currentmessager._id);
            //console.log(socket.current);
        }
    }
    ,[currentmessager]);
    const changechat = async (contact) => {
        setCurrentMessager(contact);
    }
    return (
        <>
            <ChatContainer>
               <div className="container">
                    <Home contacts={users} currentuser={currentuser} currentchat={changechat} />
                    { 
                        !isReady || currentmessager === undefined ? <Ready currentuser={currentuser} /> : <Chat  currentuser={currentmessager}  socket={socket} />

                    }
                </div>
            </ChatContainer>
        </>
    );
}
const ChatContainer = styled.div`
   
    display: flex;
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #f1f1f1;
    .container {
        display: grid;
        grid-template-columns: 30% 70%;  
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        max-width: 750px;
        height: 100%;
        background-color:#500574  ;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
        @media (max-width: 768px) {
            grid-template-columns: 35% 65%;
        }
        
    }
        animation: gradient-animation 6s ease infinite;
background: linear-gradient(334deg, #0e3fa8, #490d9d, #bd0a5e);
background-size: 180% 180%;

@keyframes gradient-animation {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
    
}

`;



