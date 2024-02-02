import { sendTextMessage } from "../controller";
import sendbutton from '../../../assets/images/sendbutton.png'

function MessageListComposer({ props, textMessage, setTextMessage, threadParentMessageId, setParentMessageIdHandler }) {
    const cometChatsendTextMessage = async (e) => {
        e.preventDefault();
        sendTextMessage({ props, textMessage, setTextMessage, threadParentMessageId })
    }
    // set text message and remove parentid if its deleted from the input box
    const handleTexMessage = (e) => {
        setTextMessage(e.target.value)
        if (e.target.value === '') {
            setParentMessageIdHandler(false, '')
        }
    }
    return (
        <div className="messageListComposerContainer">
            <form onSubmit={(e) => cometChatsendTextMessage(e)}>
                <div className="messageListComposer">

                    <div className="messageListComposerInputContainer">
                        <span className="laughEmoji">&#128541;</span>
                        <input type="text" placeholder="Add a comment" value={textMessage} onChange={(e) => handleTexMessage(e)} />
                    </div>
                </div>
                <button type="submit"><img src={sendbutton} alt="" className="sendButtonIcon" /></button>
            </form>
        </div>
    )
}

export default MessageListComposer;