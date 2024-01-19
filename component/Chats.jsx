import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";

function Chats() {
    const [chats, setChats] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);

    useEffect(()=>{
        //onSnapshot, realtime get
        const getChats = () =>{
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                const data = doc.data();
                setChats(data);
                console.log("Chats updated:", data);
            });

            return () => {
                unsub();
            };
        };
        currentUser.uid && getChats();
    }, [currentUser.uid]);

    function handleSelect(user){
        console.log("Selected user:", user);
        dispatch({type: "CHANGE_USER", payload: user})
    }

    return (
        <div className="chats">
            {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) =>(
                <div className="userChat" 
                    key={chat[0]} 
                    onClick = {() => handleSelect(chat[1].userInfo)}> 
                <img src={chat[1].userInfo.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].lastMessage?.text}</p>
                </div>
            </div>  
            ))}   
        </div>
    );
};

export default Chats;