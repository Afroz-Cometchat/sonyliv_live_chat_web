import { CometChat } from "@cometchat/chat-sdk-javascript"
import { CometChatUIKit } from "@cometchat/chat-uikit-react";

// handle send text message in group
const sendTextMessage = async ({ props, textMessage, setTextMessage, threadParentMessageId, setThreadParentMessageId }) => {
    let cometchatTextMessage = new CometChat.TextMessage(
        props.joinedGroup.guid,
        textMessage,
        CometChat.RECEIVER_TYPE.GROUP
    );
    if (threadParentMessageId) cometchatTextMessage.setParentMessageId(threadParentMessageId)
    let loggedInUser = await CometChat.getLoggedInUser()
    cometchatTextMessage.setSender(loggedInUser)
    cometchatTextMessage.setSentAt(Math.round(+new Date() / 1000))
    cometchatTextMessage.setMuid(String(Math.round(+new Date() / 1000)))
    CometChatUIKit.sendTextMessage(cometchatTextMessage)
        .then(() => {
            setTextMessage('');
            setThreadParentMessageId(false);
        })
        .catch((error) => { console.log(error) })
}

export { sendTextMessage };