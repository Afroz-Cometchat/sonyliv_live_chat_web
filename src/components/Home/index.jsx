import { useState } from "react"
import GroupsList from "../GroupsList/index";
import liveChatIcon from '../../assets/images/liveChatIcon.png'
import './style.css'

export default function Home() {
    // handle to show groups or not
    const [show_chat, setShowChat] = useState(false);

    // close group list
    const closeChat = () => {
        setShowChat(false)
    }

    // props to send to group list component
    const props = {
        closeChat
    }

    return (
        <div className="home__container">
            <div className="home_iframe_wrapper">
                <div style={{
                    width: `${show_chat ? "67%" : "100%"}`,
                }} className="home_container_iframe_container">
                    <div className="iframe_container_text_container">
                        <span className="iframe_content_tabbar">Tabbar</span>
                        <p>S2 E01 • That Open Wound</p>
                    </div>
                    <iframe src="https://www.youtube.com/embed/KLuTLF3x9sA" title="tom" allowFullScreen={true} className="iframe_container_iframe"></iframe>
                </div>
            </div>
            <button onClick={() => setShowChat(true)} className="home_container_livechat_button">
                <img src={liveChatIcon} alt="" className="live_chat_icon" />  Live Chat</button>
            {show_chat && <GroupsList {...props} />}
        </div>
    )
}