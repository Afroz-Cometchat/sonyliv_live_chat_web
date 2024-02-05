import { useEffect, useState } from 'react';
import './style.css'
import { addCometChatReaction, addCometChatReactionLike } from './controller';
import rightArrow from '../../assets/images/rightArrow.png'
import flagUser from '../../assets/images/flagUser.png'
import reportCross from '../../assets/images/reportCross.png'
import ThreadMessageList from '../ThreadMessageList/index';
import { MessageBubbleReactionsView } from './Views';

function MessageBubble({ message, group, setParentMessageIdHandler }) {
    const [showReactionsOptions, setShowReactionsOptions] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isActionsView, setIsActionsView] = useState(false);
    const [showViewReply, setShowViewReply] = useState(false);
    const [showThreadedMessages, setShowThreadedMessages] = useState(false);
    const [replyCount, setReplyCount] = useState(0);
    const [reactionsCount, setReactionsCount] = useState(false);
    const [reactionsData, setReactionsData] = useState([]);

    // toogle reaction options
    const toggleReactionsOptions = () => {
        setShowReactionsOptions(!showReactionsOptions)
    }

    // add reaction
    const addReaction = (reaction) => {
        addCometChatReaction(reaction, message.id, toggleReactionsOptions)
    }

    // add like reaction
    const addReactionLike = () => {
        addCometChatReactionLike(message.id)
        if (showReactionsOptions === true) setShowReactionsOptions(false)

    }

    // toogle view actions view
    const toogleViewActions = () => {
        setIsActionsView(!isActionsView)
    }

    // show threaded messages
    const showViewMessages = () => {
        setShowThreadedMessages(true);
        setShowViewReply(false);
    }
    // hide threaded messages
    const hideThreadMessages = () => {
        setShowViewReply(true)
        setShowThreadedMessages(false)
    }

    // reply on thread
    const replyOnThread = () => {
        setParentMessageIdHandler(message, message.sender.name)
    }

    useEffect(() => {
        if (message.replyCount && message.replyCount > 0) {
            setReplyCount(message.replyCount)
            setShowViewReply(true)
        }
    }, [message])

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
                        <span className="replyMessage cursorPointer" onClick={replyOnThread}>Reply</span>
                    </div>
                    <div className="bubbleReactionsCount">
                        <MessageBubbleReactionsView message={message} setReactionsCount={setReactionsCount} setReactionsData={setReactionsData} setIsLiked={setIsLiked} reactionsData={reactionsData} reactionsCount={reactionsCount} />
                    </div>
                </div>
                {/* bubble thread messages section */}
                {showViewReply &&
                    <div className="threadMessaagesContainer">
                        <span className='viewMessageText' onClick={showViewMessages}> <span className='lineBeforeViewReply'></span> View {replyCount} {replyCount > 1 ? 'Replies' : 'Reply'}</span>
                    </div>
                }
                {
                    showThreadedMessages ?
                        <div className="threadedMessagesListContainer">
                            {/* <ThreadMessageList message={message} group={group} /> */}
                            <ThreadMessageList message={message} group={group} setParentMessageIdHandler={setParentMessageIdHandler} />
                            <div className="threadMessaagesContainer">
                                <span className='viewMessageText' onClick={hideThreadMessages}> <span className='lineBeforeViewReply'></span> Hide {replyCount} {replyCount > 1 ? 'Replies' : 'Reply'}</span>
                            </div>
                        </div> : null
                }
            </div>
        </div>
    )
}


export default MessageBubble;