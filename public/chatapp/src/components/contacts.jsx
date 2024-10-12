import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Home({ children }) {
    return (
        <>
            <HomeContainer>
                <div className="container">
                    <img src={Logo} alt="logo" />
                    <h1>ChatApp</h1>
                    <Link to="/register" className="btn">Register</Link>
                    <Link to="/login" className="btn">Login</Link>
                </div>
            </HomeContainer>
        </>
    );
}

const HomeContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #f1f1f1;
    .container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        background-color: #fff;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    }
    img {
        width: 100px;
        height: 100px;
    }
    h1 {
        font-size: 2rem;
        color: #333;
    }
    .btn {
        padding: 0.5rem 1rem;
        border: none;
        outline: none;
        background-color: #333;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
    }
    .btn:hover {
        background-color: #555;
    }
`;
