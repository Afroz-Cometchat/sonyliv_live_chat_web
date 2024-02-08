import { CometChatMessageList, CometChatMessageTemplate, CometChatUIKit, MessageListStyle } from "@cometchat/chat-uikit-react";
import { useEffect, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import './style.css'
// using the same message bubble for message list and thead message list 
import MessageBubble from "../MessageBubble";

function ThreadMessageList(props) {
    // handle customMessageTheme state
    const [customMessageTheme, setCustomMessageTheme] = useState([]);

    // messagesRequestBuilder
    let messagesRequestBuilder = new CometChat.MessagesRequestBuilder().setParentMessageId(props.message.id).setCategories(['message']).setTypes(['text']).hideReplies(true).setLimit(30)

    // render custom message bubble
    const getBubbleView = (message) => {
        return (
            <MessageBubble
                message={message}
                group={props.group}
                setParentMessageIdHandler={props.setParentMessageIdHandler}
            />
        )
    }

    useEffect(() => {
        // handling custom themes
        let definedTemplates = CometChatUIKit.getDataSource().getAllMessageTemplates();
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
                return message
            }
        })
        setCustomMessageTheme(customTemplatesList)
    }, [props])

    return (
        <div className="threadMessageList">
            <CometChatMessageList
                group={props.group}
                parentMessageId={props.message.id}
                messagesRequestBuilder={messagesRequestBuilder}
                messageListStyle={new MessageListStyle({ background: "rgb(27, 27, 27)", width: "100%", padding: "0" })}
                templates={customMessageTheme}
                hideDateSeparator={true}
            />
        </div>
    )
}

export default ThreadMessageList;

