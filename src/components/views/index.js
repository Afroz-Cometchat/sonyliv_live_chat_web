const customGroupListView = ({ group, joinGroupHandler }) => {
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


export { customGroupListView };