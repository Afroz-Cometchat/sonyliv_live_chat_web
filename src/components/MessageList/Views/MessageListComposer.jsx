import { sendTextMessage } from "../controller";
import sendbutton from '../../../assets/images/sendbutton.png'
import { useState } from "react";
import CometChatEmojiKeyboardView from "./CometChatEmojiKeyboardView";

function MessageListComposer({ props, textMessage, setTextMessage, threadParentMessageId, setIsEmojiKeyboard, setEmojiKeyboardHeight, emojiKeyboardHeight, setThreadParentMessageId }) {
    // handle to get cometchat emoji keyboad on emoji button click
    const [getCometChatEmojiKeyboard, setCometChatEmojiKeyboard] = useState(false);

    // send new message normal or in thread both 
    const cometChatsendTextMessage = async (e) => {
        e.preventDefault();
        sendTextMessage({ props, textMessage, setTextMessage, threadParentMessageId, setThreadParentMessageId })
        setCometChatEmojiKeyboard(false);
        emojiKeyboardHeight('81%');
        setIsEmojiKeyboard(false);
    }

    // set text message and remove parentid if its deleted from the input box
    const handleTexMessage = (e) => {
        setTextMessage(e.target.value)
        if (e.target.value === '') {
            // setParentMessageIdHandler(false, '')
            setThreadParentMessageId(false)
        }
    }

    // toogle cometchat emoji keyboard
    const toogleCometChatEmojiKeyboard = () => {
        setCometChatEmojiKeyboard(!getCometChatEmojiKeyboard)
        setEmojiKeyboardHeight()
    }

    // handle cometchat emoji keyboard styles
    const keyboardStyle = {
        width: "100%",
        height: "300px",
        borderRadius: "8px",
        background: "rgb(27, 27, 27)",
        textColor: "#fff"
    }

    // handle cometchat emoji keyboard emojies click
    function ccEmojiClicked(emojiData) {
        let selectedEmoji = emojiData.detail.id
        setTextMessage(textMessage + selectedEmoji)
    }

    return (
        <div className="message_list_composer_container">
            <div className="composer_form_container">
                <form onSubmit={(e) => cometChatsendTextMessage(e)}>
                    <div className="message_list_composer">
                        <div className="message_list_composer_input_container">
                            <span className="laugh_emoji" onClick={toogleCometChatEmojiKeyboard}>😝</span>
                            <input type="text" placeholder="Add a comment" value={textMessage} onChange={(e) => handleTexMessage(e)} />
                        </div>
                    </div>
                    <button type="submit"><img src={sendbutton} alt="" className="send_button_icon" /></button>
                </form>
            </div>
            {
                getCometChatEmojiKeyboard &&
                <div className="emoji_keyboard_container">
                    <CometChatEmojiKeyboardView emojiKeyboardStyle={keyboardStyle} ccEmojiClicked={ccEmojiClicked} />
                </div>
            }
        </div>
    )
}

export default MessageListComposer;