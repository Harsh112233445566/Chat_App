import React from "react";
import styled from "styled-components";
import hello from "../assets/hello.gif";

export default function Ready({currentuser}) {
    return (
        <>
            <ReadyContainer>
                    <img src={hello} alt="hello" />
                    <h1>Hi ,{currentuser.username}</h1>
                    <h2>Ready to chat?</h2>
                    <h3>Choose a contact to start chatting</h3> 
            </ReadyContainer>
        </>
    );
}

const ReadyContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
    gap: 1 
        img {
            width: 200px;
            height: 200px;
            padding: 1rem;
        }
        h1 {
            font-size: 2rem;
            margin: 0;
            color: white;
            shadow: 0 0 30px rgba(0,0,0,1);
            transition: all 0.3s ease;
            padding: 0.5rem;
            &:hover {
                transform: scale(1.1);
            }
            cursor: pointer;
        }
        h2 {
            font-size: 1.5rem;
            margin: 0;
            color: white;
            padding: 0.5rem;

        }
        h3 {
            font-size: 1rem;
            margin: 0;
            color: white;
        }
    }
    
    
`;