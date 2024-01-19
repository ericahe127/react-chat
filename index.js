import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

ReactDom.render(
<AuthContextProvider>
    <ChatContextProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ChatContextProvider>
</AuthContextProvider> , document.getElementById("root"));