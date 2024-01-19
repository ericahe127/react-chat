import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect } from "react";
import {auth} from "../firebase"
import React from "react"

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = React.useState({})
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user);
            console.log(user);
        })

        return () =>{
            unsub();    //cleanup function
        }
    },[]);

    return(
         <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
}