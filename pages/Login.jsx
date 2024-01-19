import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";

function Login() {
    const [err, setErr] = React.useState(false);
    const navigate = useNavigate();

     async function handleSubmit(e){
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try{
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/");
        } catch(error) {
            console.log(error);
           setErr(true);
        };
     }

     return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">WeChat</span>
                <span className="title">Sign in</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                    <button>Sign in</button>
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
        
    );
}

export default Login;
