import React, { useContext, useState } from "react";
import Attach from "../image/attach.png"
import Add from "../image/add.png"
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import {v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function Inputpanel() {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);
    console.log("chatID: " + data.chatID);

    async function handleSend(){
        console.log(text);
        console.log(img);
        console.log(data.chatID);
        if (img){
            const storageRef = ref(storage, uuid());  //unique, or timestamp
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
                "state_changed",
                null,
            (error) => {
                console.log(error);
            }, 
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                console.log('File available at', downloadURL);

                   await updateDoc(doc(db, "chats", data.chatID), {
                    messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                })
            })
            })
        } else {
            //update array
            await updateDoc(doc(db, "chats", data.chatID), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                })
            })
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatID + ".lastMessage"]:{text},
            [data.chatID+".date"]: serverTimestamp(),
        })

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatID + ".lastMessage"]:{text},
            [data.chatID+".date"]: serverTimestamp(),
        })

        setText("");
        setImg(null);
    }

    return (
        <div className="inputpanel">
            <input type="text" placeholder="Type something..." onChange={e=>setText(e.target.value)} value={text} />
            <div className="send">
                <img src={Add} alt="" />
                <input type="file"  style={{display: "none"}} id="file" onChange={e=>setImg(e.target.files[0])}/>
                <label htmlFor="file">
                    <img src={Attach} alt="chat-attch-icon" />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default Inputpanel;