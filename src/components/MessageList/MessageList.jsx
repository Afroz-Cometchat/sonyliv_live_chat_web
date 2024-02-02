import { CometChatMessageBubble, CometChatMessageOption, CometChatMessageTemplate, CometChatMessages, CometChatUIKit, DateStyle, MessageListConfiguration, MessagesStyle, ThreadedMessagesConfiguration } from "@cometchat/chat-uikit-react";
import '../../assets/css/messageList.css'
import backbutton from '../../assets/images/backbutton.png'
import sendbutton from '../../assets/images/sendbutton.png'
import { useEffect, useState } from "react";
import { CometChat, MessagesRequestBuilder } from "@cometchat/chat-sdk-javascript";
import MessageBubble from "../MessageBubble/MessageBubble";

function MessageList(props) {
    // handle textMessage state
    const [textMessage, setTextMessage] = useState('');
    // handle customMessageTheme state
    const [customMessageTheme, setCustomMessageTheme] = useState([]);

    // messagesRequestBuilder
    let messagesRequestBuilder = new CometChat.MessagesRequestBuilder().setGUID(props.joinedGroup.guid).setCategories(['message']).setTypes(['text']).hideReplies(true).setLimit(30)

    // messageListConfiguration
    let messageListConfiguration = new MessageListConfiguration({
        alignment: 0,
        sentIcon: null,
        deliveredIcon: null,
        readIcon: null,
        waitIcon: null, datePattern: null,
        templates: customMessageTheme,
        showAvatar: false,
        messagesRequestBuilder,
        DateSeparatorPattern: null,
        dateSeparatorStyle: null
    })


    // render custom message bubble
    const getBubbleView = (message) => {
        // if(message.text=="5") console.log("reaction bubble", message) 
        return (
            <>
            <MessageBubble message={message} group={props.joinedGroup} />
            {/* <CometChatMessageBubble /> */}
            </>
        )
    }

    useEffect(() => {
        let definedTemplates = CometChatUIKit.getDataSource().getAllMessageTemplates();
        console.log(definedTemplates);
        // change bubble view for text messages 
        let customTemplatesList = definedTemplates.map((message) => {
            if (message.type === "text" && message.category === "message") {
                return new CometChatMessageTemplate({
                    type: 'text',
                    category: 'message',
                    contentView: () => <></>,
                    bottomView: <></>,
                    bubbleView: (message) => getBubbleView(message),
                    footerView: () => <></>,
                    headerView: () => <></>,
                    options: () => []
                })
            } else {
                // console.log("my message", message);
                return message
            }
        })
        setCustomMessageTheme(customTemplatesList)
    }, [])

    const sendTextMessage = async (e) => {
        e.preventDefault();
        let cometchatTextMessage = new CometChat.TextMessage(
            props.joinedGroup.guid,
            textMessage,
            CometChat.RECEIVER_TYPE.GROUP
        );
        let loggedInUser = await CometChat.getLoggedInUser()
        cometchatTextMessage.setSender(loggedInUser)
        cometchatTextMessage.setSentAt(Math.round(+new Date() / 1000))
        cometchatTextMessage.setMuid(String(Math.round(+new Date() / 1000)))
        CometChatUIKit.sendTextMessage(cometchatTextMessage)
            .then(() => { setTextMessage('') })
            .catch((error) => { console.log(error) })
    }

    return (
        <div className="messageListContainer">
            <div className="messageListHeader">
                <span className="backButton">
                    <img src={backbutton} alt="" onClick={props.closeGroup} />
                </span>
                <div className="groupIconContainer">
                    <img src={props.joinedGroup.icon} alt="" className="groupIcon" />
                </div>
                <p className="groupDiscriptionText">{props.joinedGroup.description}</p>
            </div>
            <div className="messageList">
                <CometChatMessages
                    group={props.joinedGroup}
                    hideMessageComposer={true}
                    hideMessageHeader={true}
                    messageListConfiguration={messageListConfiguration}
                    messagesStyle={new MessagesStyle({ background: "rgb(27, 27, 27)" })} />
            </div>
            <div className="messageListComposerContainer">
                <form onSubmit={(e) => sendTextMessage(e)}>
                    <div className="messageListComposer">

                        <div className="messageListComposerInputContainer">
                            <span className="laughEmoji">&#128541;</span>
                            <input type="text" placeholder="Add a comment" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
                        </div>
                    </div>
                    <button type="submit"><img src={sendbutton} alt="" className="sendButtonIcon" /></button>
                </form>
            </div>
        </div>
    )
}

export default MessageList;