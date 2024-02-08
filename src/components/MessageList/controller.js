import { CometChat } from "@cometchat/chat-sdk-javascript"
import { CometChatUIKit } from "@cometchat/chat-uikit-react";

// handle send text message in group or in thread
const sendTextMessage = async ({ props, textMessage, setTextMessage, threadParentMessageId, setThreadParentMessageId }) => {
    // prevent from sending messages if input is empty 
    if (textMessage === '') return;
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
            // clear composer input after succefully sending message
            setTextMessage('');
            // clear thread parent id
            setThreadParentMessageId(false);
        })
        .catch((error) => { console.log(error) })
}

export { sendTextMessage };