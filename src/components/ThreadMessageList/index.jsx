import { CometChatEmojiKeyboard, CometChatMessageTemplate, CometChatMessages, CometChatUIKit, DateStyle, MessageListConfiguration, MessagesStyle, ThreadedMessagesConfiguration } from "@cometchat/chat-uikit-react";
// import '../../assets/css/messageList.css'
import { useEffect, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
// import MessageBubble from "../MessageBubble/index";
import './style.css'
import ThreadMessageBubble from "../ThreadMessageBubble";

function ThreadMessageList(props) {
    // handle textMessage state
    const [textMessage, setTextMessage] = useState('');
    // handle customMessageTheme state
    const [customMessageTheme, setCustomMessageTheme] = useState([]);

    // messagesRequestBuilder
    let messagesRequestBuilder = new CometChat.MessagesRequestBuilder().setParentMessageId(props.message.id).setCategories(['message']).setTypes(['text']).hideReplies(true).setLimit(30)

    // console.log("$$$$$$$$$$$$$$$$", messagesRequestBuilder);

    // messageListConfiguration
    let messageListConfiguration = new MessageListConfiguration({
        alignment: 0,
        sentIcon: null,
        deliveredIcon: null,
        readIcon: null,
        waitIcon: null,
        datePattern: null,
        templates: customMessageTheme,
        showAvatar: false,
        messagesRequestBuilder,
        DateSeparatorPattern: null,
        dateSeparatorStyle: null
    })


    // render custom message bubble
    const getBubbleView = (message) => {
        // if(message.text=="5") console.log("reaction bubble", message) 
        // console.log("threaded message", message);
        return (
            <ThreadMessageBubble
                message={message}
                group={props.group}
                setParentMessageIdHandler={props.setParentMessageIdHandler}
            />
            // <MessageBubble
            //     message={message}
            //     group={props.group}
            //     setParentMessageIdHandler={props.setParentMessageIdHandler}
            // />
        )
    }

    useEffect(() => {
        // handling custom themes
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
    }, [props.message])

    return (
        <div className="threadMessageList">
            <CometChatMessages
                group={props.group}
                hideMessageComposer={true}
                hideMessageHeader={true}
                messageListConfiguration={messageListConfiguration}
                messagesStyle={new MessagesStyle({ background: "rgb(27, 27, 27)", width: "100%", padding: "0" })} />
        </div>
    )
}

export default ThreadMessageList;