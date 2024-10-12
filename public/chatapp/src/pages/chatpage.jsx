import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { alluser } from "../utils/apiroutes";
export default function ChatPage() {
    const [users, setUsers] = useState([]);
    const [currentuser, setCurrentUser] = useState({}); 
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("user");
        if(!user) {
            navigate("/register");
        }
        else
        {
            setCurrentUser(JSON.parse(user).data);
        }
        console.log(currentuser);
        const fetchUsers = async () => {
           if(currentuser.isProfile === false) {
               navigate("/avatar");
           }
        else {
                const {data} = await axios.get(`${alluser}/${currentuser._id}`);
                setUsers(data);
              }
        }
        fetchUsers();
    },[currentuser]);
    return (
        <>
            <ChatContainer>
               <div className="container">
                <Home children={users} />
                
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
        grid-template-columns: 1fr 3fr;  
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        max-width: 500px;
        height: 100%;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
        @media (max-width: 768px) {
            grid-template-columns: 35% 65%;
        }
    }
    

`;



