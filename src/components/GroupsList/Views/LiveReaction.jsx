import React, { useEffect, useRef, useState } from 'react';
import fireHeart from '../../../assets/images/fireHeart.png'
import SMILING_FACE_WITH_HEART_SHAPED_EYES from '../../../assets/images/SMILING-FACE-WITH_HEART-SHAPED-EYES.png'
import pouting from '../../../assets/images/pouting.png'
import smiling_face_open_mouth from '../../../assets/images/smiling_face_open_mouth.png'
import hushed_face from '../../../assets/images/hushed_face.png'
import thumbsup from '../../../assets/images/thumbsup.png'
import crying_face from '../../../assets/images/Crying_Face.png'
import fire_emoji from '../../../assets/images/fire_emoji.png'
import solylivhearticon from '../../../assets/images/solylivhearticon.png'
import { CometChat } from '@cometchat/chat-sdk-javascript';


export const CometChatLiveReactionView = ({ joinedGroup }) => {
    // handle to show live reaction or not
    const [showReactions, setShowReactions] = useState(false);
    // handle to show more live reaction options or not
    const [showLiveReactionOptions, setShowLiveReactionOptions] = useState(false);
    // timer used to delay live reaction animation 250ms, 
    const timer = useRef(null);
    // to stop live reaction animation on new animation 
    const offLiveReaction = useRef(null);
    // set live reaction icon
    const [reactionURL, setReactionURL] = useState('');

    // send live heart reaction handler
    const sendLiveReaction = () => {
        // clear if live reaction already animating
        clearTimeout(timer.current)
        timer.current = null;
        clearTimeout(offLiveReaction.current);
        offLiveReaction.current = null;
        setShowReactions(false);
        // set heart icon for live reaction
        setReactionURL(solylivhearticon)
        let receiverId = "supergroup";
        let receiverType = CometChat.RECEIVER_TYPE.GROUP;
        timer.current = setTimeout(() => {
            setShowReactions(true)
            offLiveReaction.current = setTimeout(() => {
                setShowReactions(false)
            }, 1500);
            timer.current = null;
        }, 250);
        // close other live reaction options
        setShowLiveReactionOptions(false)

        // send live heart reaction to others
        let data = { "reaction": "heart" };
        let transientMessage = new CometChat.TransientMessage(receiverId, receiverType, data)
        CometChat.sendTransientMessage(transientMessage);
    }

    // handle other live reactions (other than heart)
    const sendOtherLiveReaction = (reaction, reactionName) => {
        // clear if live reaction already animating
        clearTimeout(timer.current)
        timer.current = null;
        clearTimeout(offLiveReaction.current);
        offLiveReaction.current = null;
        // set reaction icon
        setReactionURL(reaction)
        timer.current = setTimeout(() => {
            setShowReactions(true)
            offLiveReaction.current = setTimeout(() => {
                setShowReactions(false)
            }, 1500);
        }, 250);
        // close other live reaction options
        setShowLiveReactionOptions(false)

        // send live reaction to others
        let receiverId = "supergroup";
        let receiverType = CometChat.RECEIVER_TYPE.GROUP;
        let data = { "reaction": reactionName };
        let transientMessage = new CometChat.TransientMessage(receiverId, receiverType, data)
        CometChat.sendTransientMessage(transientMessage);
    }

    // handle hover on live reaction icon, open other reactions options
    const handleReactionHover = () => {
        clearTimeout(timer.current);
        timer.current = null;
        setShowLiveReactionOptions(true);
    }

    useEffect(() => {
        // cometchat listner to listen new live reactions and render on DOM
        let listenerId = new Date().getTime();
        CometChat.addMessageListener(
            listenerId,
            new CometChat.MessageListener({
                onTransientMessageReceived: transientMessage => {
                    if (transientMessage.data.reaction === "heart") {
                        setReactionURL(solylivhearticon)
                    } else if (transientMessage.data.reaction === "smilingFaceWithHeartShapedEyes") {
                        setReactionURL(SMILING_FACE_WITH_HEART_SHAPED_EYES)
                    } else if (transientMessage.data.reaction === "pouting") {
                        setReactionURL(pouting)
                    } else if (transientMessage.data.reaction === "smilingFaceOpenMouth") {
                        setReactionURL(smiling_face_open_mouth)
                    } else if (transientMessage.data.reaction === "hushedFace") {
                        setReactionURL(hushed_face)
                    } else if (transientMessage.data.reaction === "fireHeart") {
                        setReactionURL(fireHeart)
                    } else if (transientMessage.data.reaction === "thumbsUp") {
                        setReactionURL(thumbsup)
                    } else if (transientMessage.data.reaction === "cryingFace") {
                        setReactionURL(crying_face)
                    } else if (transientMessage.data.reaction === "fireEmoji") {
                        setReactionURL(fire_emoji)
                    }
                    // clear if live reaction already animating
                    clearTimeout(timer.current)
                    timer.current = null;
                    clearTimeout(offLiveReaction.current);
                    offLiveReaction.current = null;
                    timer.current = setTimeout(() => {
                        setShowReactions(true)
                        offLiveReaction.current = setTimeout(() => {
                            setShowReactions(false)
                        }, 1500);
                    }, 250);
                }
            })
        );
    }, [joinedGroup])

    return (
        <>
        {/* render live reaction options only in groups list view */}
            {joinedGroup ? <></> :
                <div className='live_reaction_container' onMouseOver={handleReactionHover} onMouseOut={() => setShowLiveReactionOptions(false)}>
                    {showLiveReactionOptions && <div className='other_live_reaction_container'>
                        <span className="live_reaction_emoji" onClick={() => sendOtherLiveReaction(SMILING_FACE_WITH_HEART_SHAPED_EYES, "smilingFaceWithHeartShapedEyes")}>&#128525;</span>
                        <span className="live_reaction_emoji" onClick={() => sendOtherLiveReaction(pouting, "pouting")}>&#128545;</span>
                        <span className="live_reaction_emoji" onClick={() => sendOtherLiveReaction(smiling_face_open_mouth, "smilingFaceOpenMouth")}>&#128518;</span>
                        <span className="live_reaction_emoji" onClick={() => sendOtherLiveReaction(hushed_face, "hushedFace")}>&#128559;</span>
                        <span className="live_reaction_emoji" onClick={() => sendOtherLiveReaction(fireHeart, "fireHeart")}><img src={fireHeart} alt="" /></span>
                        <span className="live_reaction_emoji" onClick={() => sendOtherLiveReaction(thumbsup, "thumbsUp")}>&#128077;</span>
                        <span className="live_reaction_emoji" onClick={() => sendOtherLiveReaction(crying_face, "cryingFace")}>&#128546;</span>
                        <span className="live_reaction_emoji" onClick={() => sendOtherLiveReaction(fire_emoji, "fireEmoji")}>&#128293;</span>
                    </div>}
                    <span className='live_reaction_emoji heart_reaction_emoji'>
                        <img
                            src={solylivhearticon}
                            alt=""
                            onClick={() => sendLiveReaction()}
                            className='main_live_emoji'
                        />
                    </span>
                </div>
            }
            {/* handle rendring live reactions */}
            {showReactions ? <cometchat-live-reaction reactionIconURL={reactionURL} /> : <></>}
        </>
    )
}