import { useCallback, useEffect, useMemo, useState } from 'react';
import './style.css'
import { CometChatGroups, CometChatLiveReaction, CometChatMessageEvents, GroupsStyle } from '@cometchat/chat-uikit-react';
import { CometChat, MessagesRequest, MessagesRequestBuilder } from '@cometchat/chat-sdk-javascript';
import MessageList from '../MessageList/index';
import solylivhearticon from '../../assets/images/solylivhearticon.png'
import ListItemView from './Views/ListItemView';
import { CometChatLiveReactionView } from './Views/LiveReaction';
import ExtensionPollBubble from '../ExtensionPollBubble';
// import CometChatLiveReactionView from './Views/LiveReaction';

function GroupsList(props) {
    // handle to render cometchatgrouplist or cometchatmessaglist
    const [joinedGroup, setJoinedGroup] = useState(null);

    // const [reactinIconURL, setReactionIconURL] = useState(false);
    // const [showReactions, setShowReactions] = useState(false);

    // handle animated live reactions [under progress]
    const [showReactions, setShowReactions] = useState(false);

    // set poll to render at the top
    const [groupPoll, setGroupPoll] = useState(false);
    const [triggerGrouPoll, setTriggerGrouPoll] = useState(false);

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
    const sendLiveReaction = useCallback(() => {
        // console.log("start");
        let receiverId = "supergroup";
        let receiverType = CometChat.RECEIVER_TYPE.GROUP;
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
        setShowReactions(true)
        setTimeout(() => {
            setShowReactions(false)
        }, 2500);
    }, [])

    useEffect(() => {
        // listeneres
        let listenerId = new Date().getTime();
        CometChat.addMessageListener(
            listenerId,
            new CometChat.MessageListener({
                onTransientMessageReceived: transientMessage => {
                    console.log('transient message received', transientMessage);
                    setShowReactions(true)
                    setTimeout(() => {
                        setShowReactions(false)
                    }, 2500);
                },
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

        let listenerId = new Date().getTime();
        CometChat.addMessageListener(
            listenerId,
            new CometChat.MessageListener({
                onTransientMessageReceived: transientMessage => {
                    console.log('transient message received', transientMessage);
                    setShowReactions(true)
                    setTimeout(() => {
                        setShowReactions(false)
                    }, 2500);
                },
                onCustomMessageReceived: customMessage => {
                    console.log("Custom message received successfully", customMessage);
                },
            })
        );

    }, [triggerGrouPoll])

    // [ under progress ]
    const memoizedChild = useMemo(() => <CometChatLiveReactionView showReactions={showReactions} />, [showReactions]);

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
                                {memoizedChild}
                            </div>
                        </div>
                }
                {joinedGroup ? <></> : <div><img src={solylivhearticon} className='grouplist_heart_icon' alt="" onClick={() => sendLiveReaction()} /></div>}
            </div>
        </div>
    )
}

export default GroupsList;