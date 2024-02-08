import { sendTextMessage } from "../controller";
import sendbutton from '../../../assets/images/sendbutton.png'
import { useEffect, useRef, useState } from "react";
import CometChatEmojiKeyboardView from "./CometChatEmojiKeyboardView";
import CreatePollView from "../../CreatePollView/CreatePollView";

function MessageListComposer({ props, textMessage, setTextMessage, threadParentMessageId, setIsEmojiKeyboard, setEmojiKeyboardHeight, emojiKeyboardHeight, setThreadParentMessageId }) {
    // handle to get cometchat emoji keyboad on emoji button click
    const [getCometChatEmojiKeyboard, setCometChatEmojiKeyboard] = useState(false);
    // handle show cerate poll 
    const [isCreatePoll, setIsCreatePoll] = useState(false);
    const inputRef = useRef(null);

    // toogle create poll
    const toogle_create_poll = () => {
        setIsCreatePoll(!isCreatePoll)
    }

    // create poll syles
    const createPollStyle = {
        placeholderTextColor: "#ffff",
        deleteIconTint: "#ffff",
        closeIconTint: "#ffff",
        questionInputBackground: "#3e3e3e",
        optionInputBackground: "#3e3e3e",
        addAnswerIconTint: "#ffff",
        createPollButtonTextFont: "16px",
        createPollButtonTextColor: "#ffff",
        createPollButtonBackground: "#000",
        addAnswerTextColor: "#ffff",
        optionPlaceholderTextColor: "#ffff",
        questionInputTextColor: "#ffff",
        optionInputTextColor: "#ffff",
        background: "rgb(44, 44, 44)",
        height: "62vh",
        width: "100%",
        border: "1px solid #a8a8a8",
        borderRadius: '12px'
    }


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

    useEffect(() => {
        inputRef.current.focus();
    }, [textMessage])

    return (
        <div className="message_list_composer_container">
            <div className="composer_form_container">
                <form onSubmit={(e) => cometChatsendTextMessage(e)}>
                    <div className="message_list_composer">
                        <div className="message_list_composer_input_container">
                            <span className="laugh_emoji" onClick={toogleCometChatEmojiKeyboard}>😝</span>
                            <input ref={inputRef} type="text" placeholder="Add a comment" value={textMessage} onChange={(e) => handleTexMessage(e)} autoFocus />
                            <span className="toogle_create_poll cursorPointer" onClick={toogle_create_poll}>⋮</span>
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
            {isCreatePoll && <CreatePollView
                group={props.joinedGroup}
                ccCloseClicked={() => setIsCreatePoll(false)}
                createPollStyle={createPollStyle}
            />}
        </div>
    )
}

export default MessageListComposer;