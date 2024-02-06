import { CometChatMessageTemplate, CometChatMessages, CometChatUIKit, MessageListConfiguration, MessagesStyle } from "@cometchat/chat-uikit-react";
import { useEffect, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import MessageBubble from "../MessageBubble/index.jsx";
import './style.css'
import MessageListHeader from "./Views/MessageListHeader.jsx";
import MessageListComposer from "./Views/MessageListComposer.jsx";
import ExtensionPollBubble from "../ExtensionPollBubble/index.jsx";

function MessageList(props) {
    // handle textMessage state
    const [textMessage, setTextMessage] = useState('');
    // handle customMessageTheme state
    const [customMessageTheme, setCustomMessageTheme] = useState([]);
    // update parentmessageId to reply in thred
    const [threadParentMessageId, setThreadParentMessageId] = useState(false);
    // handle to show cometchat emoji keyboard or not
    const [isEmojiKeyboard, setIsEmojiKeyboard] = useState(false);
    // handle cometchat messagelist height according to the presence of cometchat emoji keyboard
    const [getEmojiKeyboardHeight, emojiKeyboardHeight] = useState('81%')
    const [trigger, setTrigger] = useState(false);

    // messagesRequestBuilder
    let messagesRequestBuilder = new CometChat.MessagesRequestBuilder()
        .setGUID(props.joinedGroup.guid)
        .hideReplies(true).setLimit(30)
        .setCategories(["message", "custom"])
        .setTypes(["text", "extension_poll"])
        .hideDeletedMessages(true)

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
        // console.log('parentbubble', message);
        return (
            <>
                <MessageBubble message={message} group={props.joinedGroup} setParentMessageIdHandler={setParentMessageIdHandler} />
            </>
        )
    }

    // set thread parenent message id
    const setParentMessageIdHandler = (message, username) => {
        setThreadParentMessageId(message.parentMessageId ? message.parentMessageId : message.id);
        setTextMessage(username ? `@${username}` : '');
    }

    const getPollsView = (message) => {
        return (
            <ExtensionPollBubble message={message} />
        )
    }

    // creating cometchat themes for custom message bubble UI
    const handleThemes = () => {
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
            } else if (message.category === 'custom' && message.type === "extension_poll") {
                return new CometChatMessageTemplate({
                    type: 'extension_poll',
                    category: 'custom',
                    contentView: () => <></>,
                    bottomView: <></>,
                    bubbleView: (message) => getPollsView(message),
                    footerView: () => <></>,
                    headerView: () => <></>,
                    options: () => []
                })
            } else {
                return message;
            }
        })
        setCustomMessageTheme(customTemplatesList)
    }

    useEffect(() => {
        // upadte cometchat themes
        handleThemes()

        let listenerId = new Date().getTime();
        CometChat.addMessageListener(
            listenerId,
            new CometChat.MessageListener({
                onTextMessageReceived: message => {
                    if (!message.parentMessageId) {
                        console.log("normal messagereceived", message);
                    } else {
                        console.log("thread message received", message);
                        handleThemes();
                    }
                },
                onMessageEdited: msg => {
                    if (msg.category === 'message') console.log("this is **********edidted message", msg);
                }
            })
        );
        // setCustomMessageTheme(customTemplatesList)
    }, [trigger])

    // trying to re-render the message list [under progress]
    const renderAgain = () => {
        setTrigger(!trigger)
    }

    // cometchatmessages props
    const cometChatMessagesProps = {
        group: props.joinedGroup,
        hideMessageComposer: true,
        hideMessageHeader: true,
        messageListConfiguration: messageListConfiguration,
        messagesStyle: new MessagesStyle({ background: "rgb(27, 27, 27)" })
    }

    // toogle cometchat mesasge list height 
    const setEmojiKeyboardHeight = () => {
        isEmojiKeyboard ? emojiKeyboardHeight('81%') : emojiKeyboardHeight('40%')
        setIsEmojiKeyboard(!isEmojiKeyboard)
    }

    return (
        <div className="messageListContainer">
            {/* message list header view */}
            <MessageListHeader {...props} />

            {/* messages list view */}
            <div className="messageList" style={{ height: getEmojiKeyboardHeight }}>
                <CometChatMessages {...cometChatMessagesProps} />
            </div>

            {/* messagelist composer view */}
            <MessageListComposer props={props} textMessage={textMessage} setTextMessage={setTextMessage} threadParentMessageId={threadParentMessageId} setParentMessageIdHandler={setParentMessageIdHandler} setEmojiKeyboardHeight={setEmojiKeyboardHeight} setIsEmojiKeyboard={setIsEmojiKeyboard} emojiKeyboardHeight={emojiKeyboardHeight} renderAgain={renderAgain} />
        </div>
    )
}

export default MessageList;