import { useState } from 'react';
import './style.css'
import { CometChatGroups, GroupsStyle } from '@cometchat/chat-uikit-react';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import MessageList from '../MessageList/index';
import solylivhearticon from '../../assets/images/solylivhearticon.png'
import ListItemView from './Views/ListItemView';

function GroupsList(props) {
    const [joinedGroup, setJoinedGroup] = useState(null);

    // set custom group list view
    const listItemView = (group) => {
        return ListItemView({ group, joinGroupHandler })
    }

    // handle join group click 
    const joinGroupHandler = (group) => {
        setJoinedGroup(group)
    }

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

    return (
        <div className='groupsListContainer'>
            <div>
                <div className="groupsListHeader">
                    <h2>Live Chat</h2>
                    <button onClick={() => props.closeChat()} className='closeButton'>X</button>
                </div>
                {
                    joinedGroup ?
                        <MessageList joinedGroup={joinedGroup} closeGroup={closeGroup} /> :
                        <div className="groupsList">
                            <CometChatGroups {...cometChatGroupProps} />
                        </div>
                }
                {joinedGroup ? null : <div><img src={solylivhearticon} className='grouplist_heart_icon' alt="" /></div>}
            </div>
        </div>
    )
}

export default GroupsList;