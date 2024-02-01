import { useEffect, useState } from 'react';
import '../../assets/css/groupsList.css'
import { CometChatGroups, CometChatMessages, GroupsStyle } from '@cometchat/chat-uikit-react';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import MessageList from '../MessageList/MessageList';
function GroupsList(props) {
    const [joinedGroup, setJoinedGroup] = useState(null);
    const listItemView = (group) => {
        console.log(group);
        return (
            <div className="groupListItem" style={{
                width: `${Math.floor(Math.random() * 21) + 60}%`
            }}>
                <div className="groupIconContainer">
                    <img src={group.icon} alt="" className='groupAvatar' />
                </div>
                <div className="groupDescriptionBox">
                    <span className='gpoupName'>#{group.name}</span>
                    <p className='groupDescriptionText'> {group.description} </p>
                    <div className="groupMetaInfo">
                        <span>{group.membersCount}</span>
                        <span>&#128293; <span>{Math.floor(Math.random() * 1001)}</span></span>
                        <span className='reply'>Be the 1st to reply</span>
                    </div>
                    <p className='joinNowText' onClick={() => joinGroupHandler(group)}> Join now </p>
                </div>
            </div>
        )
    }

    // handle join group click 
    const joinGroupHandler = async (group) => {
        // console.log(group);
        setJoinedGroup(group)
    }

    const closeGroup = () => {
        setJoinedGroup(null)
    }
    return (
        <div className='groupsListContainer'>
            <div>
                <div className="groupsListHeader">
                    <h2>Live Chat</h2>
                    <button onClick={() => props.closeChat()} className='closeButton'>X</button>
                </div>
                {joinedGroup ? <MessageList joinedGroup={joinedGroup} closeGroup={closeGroup} /> : <div className="groupsList">
                    <CometChatGroups listItemView={listItemView} title={false} hideSearch={true} groupsRequestBuilder={new CometChat.GroupsRequestBuilder().joinedOnly(true).withTags(true).setTags(['esports_show']).setLimit(100)} groupsStyle={new GroupsStyle()} />
                </div>}
                {joinedGroup ? null : <div><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png" className='heart' alt="" /></div>}
            </div>
        </div>
    )
}

export default GroupsList;