import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function Messages() {
    const {data} = useContext(ChatContext);
    const [messages, setMessages] = useState([]);
    useEffect(()=>{
        const unsub = onSnapshot(doc(db, "chats", data.chatID), (doc)=>{
            doc.exists() && setMessages(doc.data().messages)
        })

        return ()=>{
            unsub();
        }
    }, [data.chatID]);

    return (
        <div className="messages">
        {messages.map(m=>(
            <Message key={m.id} message={m} />
        ))}
        </div>
    );
}

export default Messages;