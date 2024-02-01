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
            <div>
                <div style={{
                    width: `${show_chat ? "67vw" : "100vw"}`,
                    height: "92vh"
                }}>
                    <div style={{
                        color: "#fff",
                        textAlign: "center",
                        padding: "10px 0"
                    }}>
                        <span style={{
                            color: "#a8a8a8"
                        }}>Tabbar</span>
                        <p>S2 E01 • That Open Wound</p>
                    </div>
                    <iframe src="https://www.youtube.com/embed/KLuTLF3x9sA" title="tom" allowFullScreen={true} height="90%" width="100%" style={{
                        border: "none",
                    }}></iframe>
                </div>
            </div>
            <button onClick={() => setShowChat(true)} style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#fff",
                position: "absolute",
                bottom: "5px",
                right: "800px",
                cursor: "pointer"
            }}>Live Chat</button>
            {show_chat && <GroupsList {...props} />}
        </div>
    )
}