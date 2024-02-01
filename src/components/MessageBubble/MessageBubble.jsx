import { useState } from 'react';
import '../../assets/css/messageBubble.css'
import { CometChat } from '@cometchat/chat-sdk-javascript';

function MessageBubble({ message }) {
    // set reactions format
    console.log(message);

    const [showReactionsOptions, setShowReactionsOptions] = useState(false);

    // render reactions bubble
    const getReactions = () => {
        if (message.metadata?.['@injected']?.extensions?.reactions) {
            let reactionsData = Object.keys(message.metadata['@injected'].extensions.reactions)
            console.log(reactionsData);
            return (
                <div className='reactionEmojiContainer'>
                    <div className='reactionsEmojis'>
                        {reactionsData.map(ele => <span>{ele}</span>)}
                    </div>
                    <span className='reactionsCount'>{reactionsData.length || null}</span>
                </div>
            )
        }
        return <></>
    }

    // toogle reaction options
    const toggleReactionsOptions = () => {
        setShowReactionsOptions(!showReactionsOptions)
    }

    // add reaction
    const addReaction = (reaction) => {
        CometChat.callExtension('reactions', 'POST', 'v1/react', {
            msgId: message.id,
            emoji: reaction
        }).then(response => {
            // Reaction added successfully
        }).catch(error => {
            // Some error occured
        });
    }

    return (
        <div className="messageBubbleMainContainer">
            <div className="groupAvatarContainer">
                <img src={message.sender.avatar} alt="" />
            </div>
            <div className="bubbleContentConatainer">
                <div className="bubbleTextContainer">
                    <span> <span className='bubbleSenderName'>{message.sender.name} :</span>  {message.text}</span>
                </div>
                <div className="bubbleBottomView">
                    <div className="bubbleActionsContainer">
                        <span className="addReaction">
                            <span onClick={toggleReactionsOptions} className='cursorPointer'> {showReactionsOptions ? 'X' : '+'} </span>
                            {showReactionsOptions && <div className='reactionsContainer'>
                                <span className="reactionEmoji cursorPointer" onClick={() => addReaction('😍')}>😍</span>
                                <span className="reactionEmoji cursorPointer" onClick={() => addReaction('😡')}>😡</span>
                                <span className="reactionEmoji cursorPointer" onClick={() => addReaction('😆')}>😆</span>
                                <span className="reactionEmoji cursorPointer" onClick={() => addReaction('😯')}>😯</span>
                                <span className="reactionEmoji cursorPointer" onClick={() => addReaction('👍')}>👍</span>
                                <span className="reactionEmoji cursorPointer" onClick={() => addReaction('😢')}>😢</span>
                                <span className="reactionEmoji cursorPointer" onClick={() => addReaction('💗')}>💗</span>
                            </div>}
                        </span>
                        <span className="likeMessage cursorPointer">Like</span>
                        <span className="replyMessage cursorPointer">Reply</span>
                    </div>
                    <div className="bubbleReactionsCount">
                        {getReactions()}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MessageBubble;