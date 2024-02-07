import React, { useState } from 'react';
import './style.css'
import { addCometChatReaction, addCometChatReactionLike } from './controller';
import rightArrow from '../../assets/images/rightArrow.png'
import flagUser from '../../assets/images/flagUser.png'
import reportCross from '../../assets/images/reportCross.png'
import ThreadMessageList from '../ThreadMessageList/index';
import { MessageBubbleReactionsView } from './Views';
import sonylivadd from '../../assets/images/sonylivadd.png'
import { handleFlagUser, handleReportUser } from '../../Controllers';
import myReactionStatus from '../../assets/images/myReactionStatus.png'
import { createComponent } from '@lit/react';
import { AvatarStyle } from '@cometchat/uikit-elements';

const AvatarView = createComponent({
    react: React,
    elementClass: AvatarStyle,
    tagName: "cometchat-avatar"
})

function MessageBubble({ message, group, setParentMessageIdHandler }) {
    const [showReactionsOptions, setShowReactionsOptions] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isMyReaction, setIsMyReaction] = useState(false);
    const [isActionsView, setIsActionsView] = useState(false);
    const [showThreadedMessages, setShowThreadedMessages] = useState(false);
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
    }
    // hide threaded messages
    const hideThreadMessages = () => {
        setShowThreadedMessages(false)
    }

    // reply on thread
    const replyOnThread = () => {
        setParentMessageIdHandler(message, message.sender.name)
    }

    return (
        <div className="message_bubble_main_container" key={message.id}>
            <div className="group_avatar_container">
                {/* <img src={message.sender.avatar} alt="" /> */}
                {/* <cometchat-avatar image={message.sender.avatar} name={message.sender.name} /> */}
                <AvatarView image={message.sender.avatar}
                    name={message.sender.name}
                    avatarStyle={JSON.stringify({
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        border: "1px solid rgb(238 238 238)",
                        backgroundColor: "lightgrey",
                        nameTextColor: "rgb(20,20,20)",
                        backgroundSize: "cover",
                        nameTextFont: "500 16px Inter",
                        outerViewBorderWidth: "0",
                        outerViewBorderColor: "transparent",
                        border: "none",
                    })}
                />
            </div>
            <div className="bubble_content_container">
                {/* bubble text message view */}
                <div className="bubble_text_container">
                    <span> <span className='bubble_sender_name'>{message.sender.name} :</span>  {message.text}</span>
                    <span className='verticalNavDots cursorPointer' onClick={toogleViewActions}>⋮</span>
                    {isActionsView && <div className="actionsContainer">
                        <div className="reportUserContainer" onClick={() => handleReportUser(message.sender.uid)}>
                            <span><img src={reportCross} alt="" className='actionIcons' /></span>
                            <span>Report User</span>
                            <span><img src={rightArrow} alt="" /></span>
                        </div>
                        <div className="flagUserContainer" onClick={() => handleFlagUser(message.sender.uid)}>
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
                            <span onClick={toggleReactionsOptions} className='cursorPointer'> {showReactionsOptions ? '×' : isMyReaction ? <img src={myReactionStatus} alt="" className='myReactionStatusIcon' /> : '+'} </span>
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
                        <span className="likeMessage cursorPointer" onClick={addReactionLike}>{isLiked ? <span className='likedSpan'>Liked</span> : 'Like'}</span>
                        <span className="replyMessage cursorPointer" onClick={replyOnThread}>Reply</span>
                    </div>
                    <div className="bubbleReactionsCount">
                        <MessageBubbleReactionsView message={message} setIsLiked={setIsLiked} setIsMyReaction={setIsMyReaction} />
                    </div>
                </div>
                {/* bubble thread messages section */}
                {(message.replyCount && !showThreadedMessages) &&
                    <div className="threadMessaagesContainer">
                        <span className='viewMessageText' onClick={showViewMessages}> <span className='lineBeforeViewReply'></span> View {message.replyCount} {message.replyCount > 1 ? 'Replies' : 'Reply'}</span>
                    </div>
                }
                {
                    (message.id % 3 === 0 && !message.parentMessageId) ? <img src={sonylivadd} alt="sonyliv add" className='addvertisement' /> : null
                }
                {
                    showThreadedMessages ?
                        <div className="threadedMessagesListContainer">
                            <ThreadMessageList message={message} group={group} setParentMessageIdHandler={setParentMessageIdHandler} />
                            <div className="threadMessaagesContainer">
                                <span className='viewMessageText' onClick={hideThreadMessages}> <span className='lineBeforeViewReply'></span> Hide {message.replyCount} {message.replyCount > 1 ? 'Replies' : 'Reply'}</span>
                            </div>
                        </div> : null
                }
            </div>
        </div>
    )
}


export default MessageBubble;