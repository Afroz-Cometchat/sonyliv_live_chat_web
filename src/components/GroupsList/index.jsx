import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './style.css'
import { CometChatGroups, CometChatLiveReaction, CometChatMessageEvents, CometChatUIKit, GroupsStyle } from '@cometchat/chat-uikit-react';
import { CometChat, MessagesRequest, MessagesRequestBuilder } from '@cometchat/chat-sdk-javascript';
import MessageList from '../MessageList/index';
import solylivhearticon from '../../assets/images/solylivhearticon.png'
import ListItemView from './Views/ListItemView';
import { CometChatLiveReactionView } from './Views/LiveReaction';
import ExtensionPollBubble from '../ExtensionPollBubble';
import fireHeart from '../../assets/images/fireHeart.png'
import SMILING_FACE_WITH_HEART_SHAPED_EYES from '../../assets/images/SMILING-FACE-WITH_HEART-SHAPED-EYES.png'
import pouting from '../../assets/images/pouting.png'
import smiling_face_open_mouth from '../../assets/images/smiling_face_open_mouth.png'
import hushed_face from '../../assets/images/hushed_face.png'
import thumbsup from '../../assets/images/thumbsup.png'
import crying_face from '../../assets/images/Crying_Face.png'
import fire_emoji from '../../assets/images/fire_emoji.png'
// import CometChatLiveReactionView from './Views/LiveReaction';

function GroupsList(props) {
    // handle to render cometchatgrouplist or cometchatmessaglist
    const [joinedGroup, setJoinedGroup] = useState(null);

    // const [reactinIconURL, setReactionIconURL] = useState(false);
    // const [showReactions, setShowReactions] = useState(false);

    // handle animated live reactions [under progress]
    const [showReactions, setShowReactions] = useState(false);

    // handle show more live reaction options or not
    const [showLiveReactionOptions, setShowLiveReactionOptions] = useState(false);

    // set poll to render at the top
    const [groupPoll, setGroupPoll] = useState(false);
    const [triggerGrouPoll, setTriggerGrouPoll] = useState(false);

    // to detect single or double click on live emoji reaction
    const timer = useRef(null);

    // set live reaction icon url
    const [reactionURL, setReactionURL] = useState('');

    // set custom group list view
    const listItemView = (group) => {
        return ListItemView({ group, joinGroupHandler })
    }

    // handle join group click 
    const joinGroupHandler = (group) => {
        setJoinedGroup(group)
    }

    // close message list and render group list
    const closeGroup = () => {
        setJoinedGroup(null)
    }

    // set cometChatGroupRequestBuilder
    const groupsRequestBuilder = new CometChat.GroupsRequestBuilder()
        .joinedOnly(true)
        .withTags(true)
        .setTags(['esports_show'])
        .setLimit(100)

    // set cometchat group props
    const cometChatGroupProps = {
        listItemView,
        title: false,
        hideSearch: true,
        groupsRequestBuilder,
        groupsStyle: new GroupsStyle()
    }

    // send live reaction [under progress]
    const sendLiveReaction = () => {
        if (timer.current !== null) return;
        setReactionURL(solylivhearticon)
        let receiverId = "supergroup";
        let receiverType = CometChat.RECEIVER_TYPE.GROUP;
        timer.current = setTimeout(() => {
            setShowReactions(true)
            // const data = { type: "reaction", reactionURL: "https://emojiisland.com/cdn/shop/products/Emoji_Icon_-_Sunglasses_cool_emoji_large.png?v=1571606093" };
            let data = { "LIVE_REACTION": "heart" };
            // CometChat.getLoggedinUser().then((user) => {
            let transientMessage = new CometChat.TransientMessage(receiverId, receiverType, data)
            CometChat.sendTransientMessage(transientMessage);
            // })
            setTimeout(() => {
                setShowReactions(false)
            }, 1500);
            timer.current = null;
        }, 250);
        // console.log("start");
        // let data = { "LIVE_REACTION": "heart" };

        // let transientMessage = new CometChat.TransientMessage(receiverId, receiverType, data);
        // CometChat.sendTransientMessage(transientMessage);
        // CometChatMessageEvents.ccLiveReaction.next("https://emojiisland.com/cdn/shop/products/Emoji_Icon_-_Sunglasses_cool_emoji_large.png?v=1571606093")

        // const reactionURL = "https://emojiisland.com/cdn/shop/products/Emoji_Icon_-_Sunglasses_cool_emoji_large.png?v=1571606093";
        // const data = { type: "reaction", reactionURL };
        // CometChat.sendTransientMessage(new CometChat.TransientMessage(receiverId, receiverType, data));
        // CometChatMessageEvents.ccLiveReaction.next(reactionURL);
        // console.log("end");
        // setReactionIconURL("https://emojiisland.com/cdn/shop/products/Emoji_Icon_-_Sunglasses_cool_emoji_large.png?v=1571606093")
    }

    useEffect(() => {
        // listeneres
        let listenerId = new Date().getTime();
        CometChat.addMessageListener(
            listenerId,
            new CometChat.MessageListener({
                onCustomMessageReceived: customMessage => {
                    console.log("Custom message received successfully", customMessage);
                },
                onMessageEdited: editedMsg => {
                    // to update the group poll results
                    if (editedMsg.id === groupPoll.id) {
                        setGroupPoll(editedMsg)
                    }
                }
            })
        );

        // return CometChat.removeMessageListener(listenerId)
    }, [])


    // update group poll result
    const updateGrouPollResults = () => {
        console.log("updateing");
        setTriggerGrouPoll(!triggerGrouPoll)
    }

    useEffect(() => {
        const pollsRequestBuilder = new CometChat.MessagesRequestBuilder()
            .setGUID("supergroup")
            .setLimit(1)
            .setCategory("custom")
            .setType("extension_poll")
            .hideDeletedMessages(true)
            .build();

        pollsRequestBuilder.fetchPrevious().then(
            messages => {
                setGroupPoll(messages[0])
            }, error => {
                console.log("Message fetching failed with error:", error);
            }
        );

        // let listenerId = new Date().getTime();
        // CometChat.addMessageListener(
        //     listenerId,
        //     new CometChat.MessageListener({
        //         onTransientMessageReceived: transientMessage => {
        //             // console.log('transient message received', transientMessage);
        //             if (transientMessage.data.LIVE_REACTION === "heart") {
        //                 setReactionURL(solylivhearticon)
        //             } else if (transientMessage.data.LIVE_REACTION === "SMILING_FACE_WITH_HEART_SHAPED_EYES") {
        //                 console.log("this is smiling face reaction");
        //                 setReactionURL(SMILING_FACE_WITH_HEART_SHAPED_EYES)
        //             } else if (transientMessage.data.LIVE_REACTION === "pouting") {
        //                 setReactionURL(pouting)
        //             } else if (transientMessage.data.LIVE_REACTION === "smiling_face_open_mouth") {
        //                 setReactionURL(smiling_face_open_mouth)
        //             }else if(transientMessage.data.LIVE_REACTION === "hushed_face"){
        //                 setReactionURL(hushed_face)
        //             }else if(transientMessage.data.LIVE_REACTION === "fireHeart"){
        //                 setReactionURL(fireHeart)
        //             }else if(transientMessage.data.LIVE_REACTION === "thumbsup"){
        //                 setReactionURL(thumbsup)
        //             }else if(transientMessage.data.LIVE_REACTION === "crying_face"){
        //                 setReactionURL(crying_face)
        //             }else if(transientMessage.data.LIVE_REACTION === "fire_emoji"){
        //                 setReactionURL(fire_emoji)
        //             }
        //             setTimeout(() => {
        //                 setShowReactions(true)
        //                 setTimeout(() => {
        //                     setShowReactions(false)
        //                 }, 1500);
        //             }, 250);
        //         },
        //         onCustomMessageReceived: customMessage => {
        //             console.log("Custom message received successfully", customMessage);
        //         },
        //     })
        // );

    }, [triggerGrouPoll])

    // [ under progress ]
    // const memoizedChild = useMemo(() => <CometChatLiveReactionView showReactions={showReactions} reactionURL={reactionURL} />, [showReactions]);

    // handle live event double click
    const handleDoubleClick = () => {
        clearTimeout(timer.current);
        timer.current = null;
        setShowLiveReactionOptions(true);
    }

    // handle other live reactions click
    const sendOtherLiveReaction = (reaction, reactionName) => {
        setReactionURL(reaction)
        setShowReactions(true)
        setTimeout(() => {
            setShowReactions(false)
        }, 1500);
        setShowLiveReactionOptions(false)
        // send         setReactionURL(solylivhearticon)
        let receiverId = "supergroup";
        let receiverType = CometChat.RECEIVER_TYPE.GROUP;
        let data = { "LIVE_REACTION": reactionName };
        // CometChat.getLoggedinUser().then((user) => {
        let transientMessage = new CometChat.TransientMessage(receiverId, receiverType, data)
        CometChat.sendTransientMessage(transientMessage);
        // })
        setTimeout(() => {
            setShowReactions(false)
        }, 1500);
    }

    return (
        <div className='groupsListContainer'>
            <div>
                <div className="groupsListHeader">
                    <h2>Live Chat</h2>
                    <button onClick={() => props.closeChat()} className='closeButton'>X</button>
                </div>
                {
                    joinedGroup ?
                        <MessageList joinedGroup={joinedGroup} closeGroup={closeGroup} />
                        :
                        <div className="groupsList">
                            <div className='group_extension_wrapper'>
                                {groupPoll && <ExtensionPollBubble message={groupPoll} updateGrouPollResults={updateGrouPollResults} />}
                            </div>
                            <CometChatGroups {...cometChatGroupProps} />
                            <div>
                                {/* {showReactions && <CometChatLiveReactionView />} */}
                                {/* {memoizedChild} */}
                                {/* <CometChatLiveReactionView showReactions={showReactions} reactionURL={reactionURL} /> */}
                            </div>
                        </div>
                }
                {/* {joinedGroup ? <></> :
                    <div className='live_reaction_container'>
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
                                onDoubleClick={handleDoubleClick} />
                        </span>
                    </div>} */}
                <CometChatLiveReactionView joinedGroup={joinedGroup} />

            </div>
        </div>
    )
}

export default GroupsList;