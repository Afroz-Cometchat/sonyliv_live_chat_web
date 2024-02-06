import { useState } from 'react';
import './style.css'
import rightArrow from '../../assets/images/rightArrow.png'
import flagUser from '../../assets/images/flagUser.png'
import reportCross from '../../assets/images/reportCross.png'
import { handleFlagUser, handleReportUser } from '../../Controllers';
import { addCometChatReaction, addCometChatReactionLike } from '../MessageBubble/controller';
import { MessageBubbleReactionsView } from '../MessageBubble/Views';

function ThreadMessageBubble({ message, group, setParentMessageIdHandler }) {
    const [showReactionsOptions, setShowReactionsOptions] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isActionsView, setIsActionsView] = useState(false);
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

    // reply on thread
    const replyOnThread = () => {
        setParentMessageIdHandler(message, message.sender.name)
    }

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
            </div>
        </div>
    )
}


export default ThreadMessageBubble;