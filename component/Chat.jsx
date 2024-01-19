import React, { useContext } from "react";
import Camera from "../image/cam.png"
import Add from "../image/add.png"
import More from "../image/more.png"
import Messages from "./Messages";
import Inputpanel from "./Inputpanel";
import { ChatContext } from "../context/ChatContext";

function Chat() {
    const {data} = useContext(ChatContext);
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user.displayName}</span>
                <div className="chatIcons">
                    <img src={Camera} alt="chat-camera-icon" />
                    <img src={Add} alt="chat-add-icon" />
                    <img src={More} alt="chat-more-icon" />
                </div>
            </div>

            <Messages />
            <Inputpanel />
        </div>
    );
}

export default Chat;