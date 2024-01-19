import React from "react";
import Sidebar from "../component/Sidebar.jsx";
import Chat from "../component/Chat.jsx";

function Home() {
    return (
        <div className="home">
            <div className="container">
                <Sidebar />
                <Chat/>
            </div>
        </div>
    );
}

export default Home;
