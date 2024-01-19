import React, { useContext, useState } from "react";
import { collection, getDocs, getDoc, setDoc, doc, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import {db} from "../firebase"
import { AuthContext } from "../context/AuthContext";

function Search() {
    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)

    const {currentUser} = useContext(AuthContext);

    function handleKey(e){
        e.code === "Enter" && handleSearch();
    }

    async function handleSearch(){
        const q = query(collection(db, "users"), where("displayName", "==" , username));
        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch(err){
            setErr(true);
            console.log(err);
        }
    }

    async function handleSelect(e){
        //check if group exists, if exist
        const combinedID = currentUser.uid > user.uid ? 
        currentUser.uid + user.uid : 
        user.uid + currentUser.uid;
        console.log(combinedID);
        try {
            const res = await getDoc(doc(db, "chats", combinedID));
            if (!res.exists()){
                //create a chat in chats collection
                await setDoc(doc( db, "chats", combinedID), {messages: []});
                console.log("added chat between users")
                //create user chats Update document nested objects
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedID + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedID+".date"]: serverTimestamp()
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedID + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedID+".date"]: serverTimestamp()
                });

            }
        } catch (err){
            console.log(err)
        }
        
        setUser(null);
        setUsername("");
    }

    return (
        <div className="search">
            <div className="searchForm">
                <input type="text" name="" id="" placeholder="search a user" onKeyDown={handleKey} 
                        onChange={(e) =>setUsername(e.target.value)} value={username} autoFocus/>
            </div>
            {err && <span>User not found</span>}
            {user && <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
    );
}

export default Search;