import React from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { useEffect, useState } from "react";



export default function Home({ contacts, currentuser ,currentchat}) {
    const [currentusername , setCurrentUserName] = useState(undefined);
    const [currentuserimg , setCurrentUserImg] = useState(undefined);
    const [currentselected , setCurrentSelected] = useState(undefined);
    
    
    const login_out = () => {
        localStorage.removeItem("user");
        window.location.reload();
    }

    useEffect(()=>{
        if(currentuser) {
            setCurrentUserName(currentuser.username);
            setCurrentUserImg(currentuser.profileimg);
        }

    },[currentuser]);
    const changecurrentchat = async (index,contact) => {
        setCurrentSelected(index);
        currentchat(contact);
 
    }
    return <>
    {
        currentuserimg && currentusername && (
            <HomeContainer>
                <div className="Charcha">
                        <img src={Logo} alt="logo" />
                        <h1>Charcha</h1>
                </div>
                <div className="contact-title">Contacts</div>
                <div className="contacts">
                    <div className="contactlist">
                        {contacts.map((contact,index) => (
                            <div key={index} className={currentselected === index ? "contact selected" : "contact"} onClick={() => changecurrentchat(index,contact)}>
                                <img src={`data:image/svg+xml;base64,${contact.profileimg}`} alt="profile" />
                                <h4>{contact.username}</h4>
                            </div>
                        ))} 
                                                                  
                    </div>
                </div>
                <div className="currentuser">
                    <div className="profile">
                        <img src={`data:image/svg+xml;base64,${currentuserimg}`} alt="profile" />
                        <h4>{currentusername}</h4>
                        <div className="log-out" onClick={()=>login_out()}>Log Out</div>
                    </div>
                </div>
            </HomeContainer>
        )
    }
    </>;

}

const HomeContainer = styled.div`
    display: flex;
    box-shadow: 0 2px 7px rgba(0,0,0,2);
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 10px; 
    justify-content: space-between;
    .Charcha {
        display: flex;
        align-items: center;
        padding: 1rem;
        background-color:#78248e ;
        border-bottom: 1px solid #340549 ;
        box-shadow: 0 2px 7px rgba(0,0,0,0.1);
        border-radius: 10px 0 0 0;
        text-shadow: 0 0 30px rgba(0,0,0,1);
        img {
            width: 50px;
            height: 50px;
        }
        h1 {
            font-size: 1.5rem;
            margin-left: 1rem;
            color: white ;
        }
    }
    .contact-title {    
        padding: 1rem;
        font-size: 1.5rem;
        color: white ;
        background-color: #7a0fac  ;
        padding: 1rem;
        font-size: 1.5rem;
        text-align: center;
        box-shadow: 0 2px 7px rgba(0,0,0,0.1);
        text-transform: uppercase;
        text-shadow: 0 0 30px rgba(0,0,0,1);
        font-weight: bold;
    }
    .contacts {
        padding: 1rem;
        background-color: #b746d4 ;
        overflow : auto;
        .contactlist {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            background-color: #b746d4 ;
            padding: 0.5rem;
        }

        .contactlist {

            .contact {
                display: flex;
                align-items: center;
                padding: 0.5rem;
                cursor: pointer;
                img {
                    width: 50px;
                    height: 50px;
                    border-radius: 20%;
                }
                h4 {
                    margin-left: 1rem;
                    color: white;
                

                }
                &.selected {
                    background-color: #450a54 ;
                    border-radius: 10px;
                    transition: all 0.3s;
                    transform: scale(1.1);
                }
            }
            @media (max-width: 768px) {
                .contact {
                    img {
                        width: 40px;
                        height: 40px;
                    }
                    h4 {
                        font-size: 1rem;
                    }
                }
            }
        }
        .contact {  
            display: flex;
            align-items: center;
            padding: 0.5rem;
        }
            cursor: pointer;
        }
        @media (max-width: 768px) {
            .contact {
                img {
                    width: 40px;
                    height: 40px;
                }
                h4 {
                    font-size: 1rem;
                }
            }
        }
    }
    .currentuser {
        padding: 1rem;
        background-color: #3b0554  ;
        .profile {
            display: flex;
            align-items: center;
            img {
                width: 50px;
                height: 50px;
                border-radius: 20%;
            }
            h4 {
                color: white;
                margin-left: 1rem;
            }
            .log-out {
                margin-left: auto;
                color: white;
                cursor: pointer;
                border-radius: 10px;
                &:hover {
                   transition: all 0.3s;
                   transform: scale(1.1);
                }
                padding: 0.5rem;
                background-color:#8631cd;
                
            }
        }
        border-radius: 0 0 0 10px ;
    }
    

`;

    