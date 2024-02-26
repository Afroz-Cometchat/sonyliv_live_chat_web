import { useState } from "react"
import GroupsList from "../GroupsList/index";
import liveChatIcon from '../../assets/images/liveChatIcon.png'
import { CometChat } from "@cometchat/chat-sdk-javascript";
import './style.css'

export default function Home() {
    // handle to show groups or not
    const [show_chat, setShowChat] = useState(false);

    // close group list
    const closeChat = () => {
        CometChat.leaveGroup("supergroup").then(res => {
            setShowChat(false)
        }).catch(err => {
            setShowChat(false)
        })
    }

    const startLiveChat = () => {
        // join supergroup
        CometChat.joinGroup("supergroup", "public").then((res) => {
            setShowChat(true)
        }).catch(err => {
            setShowChat(true)
        })
    }

    // props to send to group list componentLive Chat
    const props = {
        closeChat
    }

    return (
        // main home containier
        <div className="home__container">
            {/* iframe wrapper  */}
            <div className="home_iframe_wrapper">
                {/* set width of iframe(live streaming) 67% if live chat is open or else 100% */}
                <div style={{
                    width: `${show_chat ? "67%" : "100%"}`,
                }} className="home_container_iframe_container">
                    <div className="iframe_container_text_container">
                        <span className="iframe_content_tabbar">Tabbar</span>
                        <p>S2 E01 • That Open Wound</p>
                    </div>
                    {/* iframe to show live streamings */}
                    <iframe src="https://www.youtube.com/embed/67qlB5y5wCQ" title="tom" allowFullScreen={true} className="iframe_container_iframe"></iframe>
                    <div className="show_live_chat_button_wrapper">
                        <button onClick={startLiveChat} className="home_container_livechat_button">
                            <img src={liveChatIcon} alt="" className="live_chat_icon" />
                            Live Chat
                        </button>
                    </div>
                </div>
            </div>
            {/* render live chats */}
            {show_chat && <GroupsList {...props} />}
        </div>
    )
}