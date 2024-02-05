import { sendTextMessage } from "../controller";
import sendbutton from '../../../assets/images/sendbutton.png'
import { useState } from "react";
import CometChatEmojiKeyboardView from "./CometChatEmojiKeyboardView";

function MessageListComposer({ props, textMessage, setTextMessage, threadParentMessageId, setParentMessageIdHandler, setEmojiKeyboardHeight, setIsEmojiKeyboard }) {
    const [getCometChatEmojiKeyboard, setCometChatEmojiKeyboard] = useState(false);

    const cometChatsendTextMessage = async (e) => {
        e.preventDefault();
        sendTextMessage({ props, textMessage, setTextMessage, threadParentMessageId })
        setCometChatEmojiKeyboard(false);
    }
    // set text message and remove parentid if its deleted from the input box
    const handleTexMessage = (e) => {
        setTextMessage(e.target.value)
        if (e.target.value === '') {
            setParentMessageIdHandler(false, '')
        }
    }

    // toogle cometchat emoji keyboard
    const toogleCometChatEmojiKeyboard = () => {
        setCometChatEmojiKeyboard(!getCometChatEmojiKeyboard)
        setEmojiKeyboardHeight()
    }

    const keyboardStyle = {
        width: "100%",
        height: "300px",
        borderRadius: "8px",
        background: "rgb(27, 27, 27)",
        textColor: "#fff"
    }

    function ccEmojiClicked(emojiData) {
        let selectedEmoji = emojiData.detail.id
        setTextMessage(textMessage + selectedEmoji)
    }

    return (
        <div className="messageListComposerContainer">
            <div className="composer_form_container">
                <form onSubmit={(e) => cometChatsendTextMessage(e)}>
                    <div className="messageListComposer">
                        <div className="messageListComposerInputContainer">
                            <span className="laughEmoji" onClick={toogleCometChatEmojiKeyboard}>😝</span>
                            <input type="text" placeholder="Add a comment" value={textMessage} onChange={(e) => handleTexMessage(e)} />
                        </div>
                    </div>
                    <button type="submit"><img src={sendbutton} alt="" className="sendButtonIcon" /></button>
                </form>
            </div>
            {
                getCometChatEmojiKeyboard &&
                <div className="emojiKeyboardContainer">
                    <CometChatEmojiKeyboardView emojiKeyboardStyle={keyboardStyle} ccEmojiClicked={ccEmojiClicked} />
                </div>
            }
        </div>
    )
}

export default MessageListComposer;