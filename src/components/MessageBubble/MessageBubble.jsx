import { useEffect, useState } from 'react';
import '../../assets/css/messageBubble.css'
import { CometChat } from '@cometchat/chat-sdk-javascript';
import rightArrow from '../../assets/images/rightArrow.png'
import flagUser from '../../assets/images/flagUser.png'
import reportCross from '../../assets/images/reportCross.png'
import ThreadMessageList from '../MessageList/ThreadMessageList';

function MessageBubble({ message, group }) {
    const [showReactionsOptions, setShowReactionsOptions] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isActionsView, setIsActionsView] = useState(false);
    const [showViewReply, setShowViewReply] = useState(false);
    const [showThreadedMessages, setShowThreadedMessages] = useState(false);
    const [replyCount, setReplyCount] = useState(0);

    // render reactions bubble && handle liked button
    const getReactions = () => {
        if (message.metadata?.['@injected']?.extensions?.reactions) {
            let reactionsData = Object.keys(message.metadata['@injected'].extensions.reactions)
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
            toggleReactionsOptions()
        }).catch(error => {
            // Some error occured
        });
    }

    // add like reaction
    const addReactionLike = () => {
        CometChat.callExtension('reactions', 'POST', 'v1/react', {
            msgId: message.id,
            emoji: '👍'
        }).then(response => {
            // Reaction added successfully
            if (showReactionsOptions === true) setShowReactionsOptions(false)
            setIsLiked(!isLiked)
        }).catch(error => {
            // Some error occured
        });
    }

    // toogle view actions view
    const toogleViewActions = () => {
        setIsActionsView(!isActionsView)
    }

    // show threaded messages
    const showViewMessages = () => {
        setShowViewReply(false);
        setShowThreadedMessages(true);
    }
    // hide threaded messages
    const hideThreadMessages = () => {
        setShowViewReply(true)
        setShowThreadedMessages(false)
    }

    useEffect(() => {
        if (message.metadata?.['@injected']?.extensions?.reactions) {
            let reactionsData = Object.keys(message.metadata['@injected'].extensions.reactions)
            if (reactionsData.includes('👍')) setIsLiked(true)
        }
        if (message.replyCount && message.replyCount > 0){
            setReplyCount(message.replyCount)
            setShowViewReply(true)
        } 
    }, [])

    return (
        <div className="messageBubbleMainContainer">
            <div className="groupAvatarContainer">
                <img src={message.sender.avatar} alt="" />
            </div>
            <div className="bubbleContentConatainer">
                {/* bubble text message view */}
                <div className="bubbleTextContainer">
                    <span> <span className='bubbleSenderName'>{message.sender.name} :</span>  {message.text}</span>
                    <span className='verticalNavDots cursorPointer' onClick={toogleViewActions}>⋮</span>
                    {isActionsView && <div className="actionsContainer">
                        <div className="reportUserContainer">
                            <span><img src={reportCross} alt="" className='actionIcons' /></span>
                            <span>Report User</span>
                            <span><img src={rightArrow} alt="" /></span>
                        </div>
                        <div className="flagUserContainer">
                            <span><img src={flagUser} alt="" className='actionIcons' /></span>
                            <span>Flag User</span>
                            <span><img src={rightArrow} alt="" /></span>
                        </div>
                    </div>}
                </div>
                {/* bubble bottom actions view */}
                <div className="bubbleBottomView">
                    <div className="bubbleActionsContainer">
                        <span className="addReaction">
                            <span onClick={toggleReactionsOptions} className='cursorPointer'> {showReactionsOptions ? '×' : '+'} </span>
                            {showReactionsOptions && <div className='reactionsContainer'>
                                <span className="reactionEmoji cursorPointer" onClick={() => addReaction('😍')}>😍</span>
                                <span className="reactionEmoji cursorPointer" onClick={() => addReaction('😡')}>😡</span>
                                <span className="reactionEmoji cursorPointer" onClick={() => addReaction('😆')}>😆</span>
                                <span className="reactionEmoji cursorPointer" onClick={() => addReaction('😯')}>😯</span>
                                <span className="reactionEmoji cursorPointer" onClick={addReactionLike}>👍</span>
                                <span className="reactionEmoji cursorPointer" onClick={() => addReaction('😢')}>😢</span>
                                <span className="reactionEmoji cursorPointer" onClick={() => addReaction('💗')}>💗</span>
                            </div>}
                        </span>
                        <span className="likeMessage cursorPointer" onClick={addReactionLike}>{isLiked ? <span className='likedSpan'>Liked</span> : 'Like'}</span>
                        <span className="replyMessage cursorPointer">Reply</span>
                    </div>
                    <div className="bubbleReactionsCount">
                        {getReactions()}
                    </div>
                </div>
                {/* bubble thread messages section */}
                {showViewReply  ?
                    <div className="threadMessaagesContainer">
                        <span className='viewMessageText' onClick={showViewMessages}> <span className='lineBeforeViewReply'></span> View {replyCount} {replyCount > 1 ? 'Replies' : 'Reply'}</span>
                    </div>
                    : null
                }
                {
                    showThreadedMessages ? 
                    <div className="threadedMessagesListContainer">
                        <ThreadMessageList message={message} group={group} />
                        <div className="threadMessaagesContainer">
                            <span className='viewMessageText' onClick={hideThreadMessages}> <span className='lineBeforeViewReply'></span> Hide {replyCount} {replyCount > 1 ? 'Replies' : 'Reply'}</span>
                        </div>
                    </div>: null
                }
            </div>
        </div>
    )
}


export default MessageBubble;