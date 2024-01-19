import React, { useState } from "react";
import AddIcon from "../image/add.png";
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../firebase";
import {storage} from "../firebase";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import {db} from "../firebase";
import { useNavigate, Link } from "react-router-dom";


function Register() {
    const [err, setErr] = React.useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try{
            //Step 1: Register the user
            const res = await createUserWithEmailAndPassword(auth, email, password);
            //Step 2: Upload the profile image to Firebase Storage
            const storageRef = ref(storage, username);
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on(
                "state_changed",
                null,
            (error) => {
                // Handle unsuccessful uploads
                console.log(err);
                setErr(true);
            }, 
            async () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                console.log('File available at', downloadURL);
                 await updateProfile(res.user, {
                        displayName: username,
                        photoURL: downloadURL,
                    });
                    // Add a new document in collection "cities"
                    await setDoc(doc(db, "users", res.user.uid), {
                        uid: res.user.uid,
                        displayName: username,
                        email,
                        photoURL: downloadURL
                    });

                    await setDoc(doc(db, "userChats", res.user.uid), {});
                    navigate("/");
            }
            );

        } catch(error) {
            console.log(error);
           setErr(true);
        };
    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">WeChat</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username"/>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                    <input type="file" id="file" style={{display: "none"}}/>
                    <label htmlFor="file" >
                        <img src={AddIcon} alt="register-upload-icon" />
                        <span>Add a Profile Image</span>
                    </label>
                    <button>Sign up</button>
                    {err && <span>Error !!</span>}
                </form>
                <p>You do have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
        
    );
}

export default Register;
