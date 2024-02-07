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
import GroupPollView from './Views/GroupPollView';
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

    // useEffect(() => {
    //     const pollsRequestBuilder = new CometChat.MessagesRequestBuilder()
    //         .setGUID("supergroup")
    //         .setLimit(1)
    //         .setCategory("custom")
    //         .setType("extension_poll")
    //         .hideDeletedMessages(true)
    //         .build();

    //     pollsRequestBuilder.fetchPrevious().then(
    //         messages => {
    //             setGroupPoll(messages[0])
    //         }, error => {
    //             console.log("Message fetching failed with error:", error);
    //         }
    //     );
    // }, [triggerGrouPoll])


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
                                <GroupPollView />
                            </div>
                            <CometChatGroups {...cometChatGroupProps} />
                        </div>
                }
                <CometChatLiveReactionView joinedGroup={joinedGroup} />

            </div>
        </div>
    )
}

export default GroupsList;