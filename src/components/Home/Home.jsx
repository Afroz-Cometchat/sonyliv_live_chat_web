import { useState } from "react"
import GroupsList from "../GroupsList/GroupsList";

export default function Home() {
    const [show_chat, setShowChat] = useState(false);
    const closeChat = () => {
        setShowChat(false)
    }
    const props = {
        closeChat
    }
    return (
        <div className="homeContainer" style={{
            backgroundColor: "#000"
        }}>
            <div style={{
                width: `${show_chat ? "67vw" : "100vw"}`,
                height: "92vh"
            }}>
            <iframe src="https://www.youtube.com/embed/KLuTLF3x9sA"  title="tom" allowFullScreen={true} height="100%" width="100%" style={{
                border: "none"
            }}></iframe>
            </div>
            <button onClick={() => setShowChat(true)} style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#fff"
            }}>Live Chat</button>
            {show_chat && <GroupsList {...props} />}
        </div>
    )
}