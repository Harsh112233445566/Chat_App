import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/load.gif";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { avatar_route } from "../utils/apiroutes";
import { Buffer } from "buffer";

export default function Avatar() {
    const api = "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=";
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(undefined);
    const toastOptions = {
        position: "top-center",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    const profilepic = async () => {
        if(selected === undefined) {
            toast.error("Please select",toastOptions);
        } else {
            const user = await JSON.parse(localStorage.getItem("user"));
            console.log(user);
            const {data} = await axios.post(`${avatar_route}/${user.data._id}`,{id: user.data._id, avatar: avatar[selected]});
            if(data.status === true) {
                user.isProfile = true;
                user.profileimg = avatar[selected];
                localStorage.setItem("user",JSON.stringify(user)); 
                navigate("/chat");
            }
            else {
                toast.error("Failed to save",toastOptions);
            }
        }
    };
    const getAvatar = async () => {
    {
        const data = [];
         for(let i=0;i<5;i++) {
              const response = await axios.get(api+Math.random());
              const buffer = Buffer.from(response.data);
              const base64 = buffer.toString("base64");
              data.push(base64);
         }
            setAvatar(data);
            setLoading(false);
        }
    }
    useEffect(() => {
        if(!localStorage.getItem("user")) {
            navigate("/register");
        }
        getAvatar();

    },[]);

    return (
        <>
        {
            loading ? <Box> 
                <img src={loader} alt="loader" className="loader" />
            </Box> : 
            (
                <Box>
        <div className="title">
            <h1>Choose your avatar</h1>
        </div>
        <div className="avatar">{
            avatar.map((img,index) => {
                return (
                    <div className={`avatar-item ${selected === index ? "selected" : ""}`} key={index}>
                        <img src={`data:image/svg+xml;base64,${img}`} alt="avatar" onClick={()=>setSelected(index)} />

                    </div>
                )
            })
        }
        </div>
        <button onClick={profilepic}>Save</button>
         </Box>
         
            )
        } 
        <ToastContainer />
    </> 
    );


}
const Box = styled.div`
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
    .title {
        text-align: center;
        padding: 20px;
        h1 {
            font-size: 2rem;
            font-weight: bold;
            color: #f72585;
            text-transform: uppercase;
            text-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
    }
    .avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
        .avatar-item {
            cursor: pointer;
            img {
                width: 100px;
                height: 100px;
                border-radius: 20%;
               
                object-fit: cover;
                &:hover {
                    transition: all 0.3s;
            transform: scale(1.1);
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
                }
            }
            &.selected {
            transition: all 0.3s;
                width: 100px;
                height: 100px;
                border: 5px solid white;
                background-color: white;
                border-radius: 20%;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 20%;
                    object-fit: cover;
                }

            }
        }
    }
    button {
        padding: 13px 20px;
        border: none;
        border-radius: 10px;
         margin-bottom: 100px;
        margin-top: 20px;
        background-color: #f72585;
        color: white;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        &:hover {
            background-color: #7209b7;
            transition: all 0.3s;
            transform: scale(1.1);
            box-shadow: 0 0 10px rgba(0,0,0,0.3);

        }
    }
    .loader {
        margin-bottom: 200px;
        width: 500px;
        height: 500px;
    }
    
        
`;