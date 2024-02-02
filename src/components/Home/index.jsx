import { useState } from "react"
import GroupsList from "../GroupsList/GroupsList";
import './style.css'

export default function Home() {
    const [show_chat, setShowChat] = useState(false);
    const closeChat = () => {
        setShowChat(false)
    }
    const props = {
        closeChat
    }

    return (
        <div className="home__container">
            <div>
                <div style={{
                    width: `${show_chat ? "67vw" : "100vw"}`,
                }} className="home_container_iframe_container">
                    <div className="iframe_container_text_container">
                        <span style={{
                            color: "#a8a8a8"
                        }}>Tabbar</span>
                        <p>S2 E01 • That Open Wound</p>
                    </div>
                    <iframe src="https://www.youtube.com/embed/KLuTLF3x9sA" title="tom" allowFullScreen={true} className="iframe_container_iframe"></iframe>
                </div>
            </div>
            <button onClick={() => setShowChat(true)} className="home_container_livechat_button">Live Chat</button>
            {show_chat && <GroupsList {...props} />}
        </div>
    )
}