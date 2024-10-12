import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { login_route } from "../utils/apiroutes";


function Login() {
    const [values, setValues] = useState({username: "", password: ""});
    const navigate = useNavigate();
     const handleRegister = async (event) => {
        event.preventDefault();
       
        if(validation()===true) {
            const {username, password} = values;
            const {data} = await axios.post(login_route,{username,password});
            console.log("Ok");
            console.log(data.status);
            console.log(data.message);
            if(data.status === false) {
                toast.error(data.message,toastOptions);
            }
            if(data.status === true) {
                localStorage.setItem("user",JSON.stringify(data));
                toast.error(data.message,toastOptions);
                navigate("/chat");
            }
           
        }
        
    }
    const toastOptions = {
        position: "top-center",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }
    useEffect(() => {
        const user = localStorage.getItem("user");
        if(user) {
            navigate("/chat");
        }
    },[])
    const validation = () => {
        if(values.username === ""  || values.password === "" ) {
           toast.error("All fields are required",toastOptions);
           return false;
        } 
        else {
            return true;
        }
    }
    const handlechange = (event) => {
        const {name, value} = event.target;
        setValues({...values, [name]: value});
    }
    return (
        <>
     
        <FormContainer>
            <form onSubmit={(event) => {handleRegister(event)}}>
                <div className="brand">
                    <img src={Logo} alt="logo" />
                    <h1>Charcha</h1>
                </div>
                <input type="text" name="username" placeholder="Username" onChange={e => handlechange(e)} />
                <input type="password" name="password" placeholder="Password" onChange={e => handlechange(e)} />
                <button type="submit">Login</button>
                <span> Not account ? <Link to="/register">Register</Link></span>

            </form>
        </FormContainer>
        <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
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

.brand {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    text-transform:uppercase;
    img {
        height: 5rem;
    }
    h1 {
        font-size: 2rem;
        color: #3e0c4b ;
    }
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background-color:#b412dc ;
        padding: 2rem 3rem;
        border: 0.1rem solid black;
        border-radius: 30px;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
        input
        {
            padding: 0.5rem;
            border: 0.1rem solid black;
            border-radius: 5px;
            &:focus {
                outline: none;
                border: 0.1rem solid #f72585;
            }
        } 
        
    }
    span {
        color: white;
        text-align: center;
        text-transform: uppercase;
        a {
            color: black;
            text-decoration: none;
            font-weight: bold;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    button {
        padding: 0.5rem;
        border: none;
        border-radius: 5px;
        background-color: #f72585;
        font-size: 1rem;
        font-weight: bold;
        color: white;
        cursor: pointer;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
        border: 0.1rem solid black;
        transition: background-color 0.3s;
        &:hover {
            background-color: #7209b7;
        }
    }
    
    

    
}`;
export default Login;
