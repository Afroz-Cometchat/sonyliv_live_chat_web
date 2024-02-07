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
    // handle animated live reactions [under progress]
    const [showReactions, setShowReactions] = useState(false);
    // handle show more live reaction options or not
    const [showLiveReactionOptions, setShowLiveReactionOptions] = useState(false);
    // to detect single or double click on live emoji reaction
    const timer = useRef(null);

    // set live reaction icon url
    const [reactionURL, setReactionURL] = useState('');

    const sendLiveReaction = () => {
        if (timer.current !== null) return;
        setReactionURL(solylivhearticon)
        let receiverId = "supergroup";
        let receiverType = CometChat.RECEIVER_TYPE.GROUP;
        timer.current = setTimeout(() => {
            setShowReactions(true)
            let data = { "LIVE_REACTION": "heart" };
            let transientMessage = new CometChat.TransientMessage(receiverId, receiverType, data)
            CometChat.sendTransientMessage(transientMessage);
            setTimeout(() => {
                setShowReactions(false)
            }, 1500);
            timer.current = null;
        }, 250);
        setShowLiveReactionOptions(false)
    }
    // handle other live reactions click
    const sendOtherLiveReaction = (reaction, reactionName) => {
        setReactionURL(reaction)
        setTimeout(() => {
            setShowReactions(true)
            setTimeout(() => {
                setShowReactions(false)
            }, 1500);
        }, 250);
        setShowLiveReactionOptions(false)
        let receiverId = "supergroup";
        let receiverType = CometChat.RECEIVER_TYPE.GROUP;
        let data = { "LIVE_REACTION": reactionName };
        let transientMessage = new CometChat.TransientMessage(receiverId, receiverType, data)
        CometChat.sendTransientMessage(transientMessage);
    }

    const handleDoubleClick = () => {
        clearTimeout(timer.current);
        timer.current = null;
        setShowLiveReactionOptions(true);
    }

    useEffect(() => {
        let listenerId = new Date().getTime();
        CometChat.addMessageListener(
            listenerId,
            new CometChat.MessageListener({
                onTransientMessageReceived: transientMessage => {
                    if (transientMessage.data.LIVE_REACTION === "heart") {
                        setReactionURL(solylivhearticon)
                    } else if (transientMessage.data.LIVE_REACTION === "SMILING_FACE_WITH_HEART_SHAPED_EYES") {
                        setReactionURL(SMILING_FACE_WITH_HEART_SHAPED_EYES)
                    } else if (transientMessage.data.LIVE_REACTION === "pouting") {
                        setReactionURL(pouting)
                    } else if (transientMessage.data.LIVE_REACTION === "smiling_face_open_mouth") {
                        setReactionURL(smiling_face_open_mouth)
                    } else if (transientMessage.data.LIVE_REACTION === "hushed_face") {
                        setReactionURL(hushed_face)
                    } else if (transientMessage.data.LIVE_REACTION === "fireHeart") {
                        setReactionURL(fireHeart)
                    } else if (transientMessage.data.LIVE_REACTION === "thumbsup") {
                        setReactionURL(thumbsup)
                    } else if (transientMessage.data.LIVE_REACTION === "crying_face") {
                        setReactionURL(crying_face)
                    } else if (transientMessage.data.LIVE_REACTION === "fire_emoji") {
                        setReactionURL(fire_emoji)
                    }
                    setTimeout(() => {
                        setShowReactions(true)
                        setTimeout(() => {
                            setShowReactions(false)
                        }, 1500);
                    }, 250);
                }
            })
        );
    }, [joinedGroup])

    return (
        <>
            {joinedGroup ? <></> :
                <div className='live_reaction_container' onMouseOver={handleDoubleClick} onMouseOut={() => setShowLiveReactionOptions(false)}>
                    {showLiveReactionOptions && <div className='other_live_reaction_container'>
                        <span className="live_reaction_emoji" onClick={() => sendOtherLiveReaction(SMILING_FACE_WITH_HEART_SHAPED_EYES, "SMILING_FACE_WITH_HEART_SHAPED_EYES")}>&#128525;</span>
                        <span className="live_reaction_emoji" onClick={() => sendOtherLiveReaction(pouting, "pouting")}>&#128545;</span>
                        <span className="live_reaction_emoji" onClick={() => sendOtherLiveReaction(smiling_face_open_mouth, "smiling_face_open_mouth")}>&#128518;</span>
                        <span className="live_reaction_emoji" onClick={() => sendOtherLiveReaction(hushed_face, "hushed_face")}>&#128559;</span>
                        <span className="live_reaction_emoji" onClick={() => sendOtherLiveReaction(fireHeart, "fireHeart")}><img src={fireHeart} alt="" /></span>
                        <span className="live_reaction_emoji" onClick={() => sendOtherLiveReaction(thumbsup, "thumbsup")}>&#128077;</span>
                        <span className="live_reaction_emoji" onClick={() => sendOtherLiveReaction(crying_face, "crying_face")}>&#128546;</span>
                        <span className="live_reaction_emoji" onClick={() => sendOtherLiveReaction(fire_emoji, "fire_emoji")}>&#128293;</span>
                    </div>}
                    <span className='live_reaction_emoji'>
                        <img
                            src={solylivhearticon}
                            alt=""
                            onClick={() => sendLiveReaction()}
                            className='main_live_emoji'
                        />
                    </span>
                </div>
            }
            {showReactions ? <cometchat-live-reaction reactionIconURL={reactionURL} /> : <></>}
        </>
    )
}