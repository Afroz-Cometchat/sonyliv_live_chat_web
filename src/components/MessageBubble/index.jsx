import { useEffect, useState } from 'react';
import './style.css'
import { CometChat } from '@cometchat/chat-sdk-javascript';
import rightArrow from '../../assets/images/rightArrow.png'
import flagUser from '../../assets/images/flagUser.png'
import reportCross from '../../assets/images/reportCross.png'
import ThreadMessageList from '../MessageList/ThreadMessageList';
import { CometChatUIKit } from '@cometchat/chat-uikit-react';

function MessageBubble({ message, group }) {
    // console.log(message);
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
        CometChat.callExtension('reactions', 'POST', 'v1/react', {
            msgId: message.id,
            emoji: reaction
        }).then(response => {
            // Reaction added successfully
            toggleReactionsOptions()
            // tempp()
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
            // setIsLiked(!isLiked)
            // tempp()
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

    function tempp() {
        // console.log("#############################################################################################", loggedInUser.name);
        CometChatUIKit.getLoggedinUser().then((user) => {
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", user);
            if (message.metadata?.['@injected']?.extensions?.reactions) {
                let reactionsDataTemp = Object.keys(message.metadata['@injected'].extensions.reactions)
                let count = 0
                for (let k in message.metadata?.['@injected']?.extensions?.reactions) {
                    let myCount = Object.keys(message.metadata?.['@injected']?.extensions?.reactions[k]);
                    count += myCount.length
                }
                console.log("_______________________________________________________________________________", count);
                setReactionsCount(count)
                setReactionsData(reactionsDataTemp)
                console.log("***************************8", message.metadata?.['@injected']?.extensions?.reactions);
                let flag = true;
                if (reactionsDataTemp.includes('👍')) {
                    for (let k in message.metadata?.['@injected']?.extensions?.reactions) {
                        if (k === '👍')
                            for (let j in message.metadata?.['@injected']?.extensions?.reactions[k]) {
                                if (j === user.name) {
                                    setIsLiked(true)
                                    flag = false
                                    return;
                                }
                            }
                    }
                }
                if (flag) setIsLiked(false)
            }
        })
    }



    useEffect(() => {
        tempp()
        // if (message.metadata?.['@injected']?.extensions?.reactions) {
        //     let reactionsDataTemp = Object.keys(message.metadata['@injected'].extensions.reactions)
        //     if (reactionsDataTemp.includes('👍')) setIsLiked(true)
        //     let count = 0
        //     for (let k in message.metadata?.['@injected']?.extensions?.reactions) {
        //         let myCount = Object.keys(message.metadata?.['@injected']?.extensions?.reactions[k]);
        //         count += myCount.length
        //     }
        //     console.log("_______________________________________________________________________________", count);
        //     setReactionsCount(count)
        //     setReactionsData(reactionsDataTemp)
        //     console.log("***************************8", message.metadata?.['@injected']?.extensions?.reactions);
        // }
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
                        <span className="replyMessage cursorPointer">Reply</span>
                    </div>
                    <div className="bubbleReactionsCount">
                        {
                            reactionsCount > 0 ?
                                <div className='reactionEmojiContainer'>
                                    <div className='reactionsEmojis'>
                                        {reactionsData.map(ele => <span>{ele}</span>)}
                                    </div>
                                    <span className='reactionsCount'>{reactionsCount}</span>
                                </div> : null
                        }
                    </div>
                </div>
                {/* bubble thread messages section */}
                {showViewReply ?
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
                        </div> : null
                }
            </div>
        </div>
    )
}


export default MessageBubble;