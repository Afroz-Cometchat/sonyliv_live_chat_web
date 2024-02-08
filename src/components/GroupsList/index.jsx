import { useState } from 'react';
import './style.css'
import { CometChatGroups, GroupsStyle } from '@cometchat/chat-uikit-react';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import MessageList from '../MessageList/index';
import ListItemView from './Views/ListItemView';
import { CometChatLiveReactionView } from './Views/LiveReaction';
import GroupPollView from './Views/GroupPollView';

function GroupsList(props) {
    // handle to render cometchatgrouplist or cometchatmessaglist
    const [joinedGroup, setJoinedGroup] = useState(null);

    // get custom group lists view
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
        title: null,
        hideSearch: true,
        groupsRequestBuilder,
        groupsStyle: new GroupsStyle(),
    }

    return (
        <div className='groups_list_container'>
            <div className='group_list_wrapper'>
                {/* header of the groups list */}
                <div className="groups_list_header">
                    <h2>Live Chat</h2>
                    {/* button to close live chat */}
                    <button onClick={() => props.closeChat()} className='group_list_close_button'>X</button>
                </div>
                {
                    // check if user has joined a group > if yes then render that groups chats or else render groups list
                    joinedGroup ?
                        <MessageList joinedGroup={joinedGroup} closeGroup={closeGroup} />
                        :
                        <div className="groups_list">
                            {/* render group poll, present at the top of the groups list */}
                            <div className='group_extension_wrapper'>
                                <GroupPollView />
                            </div>
                            {/* render groups lists */}
                            <CometChatGroups {...cometChatGroupProps} />
                        </div>
                }
                {/* render cometchat live animated reactions view */}
                <CometChatLiveReactionView joinedGroup={joinedGroup} />
            </div>
        </div>
    )
}

export default GroupsList;