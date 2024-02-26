import AvatarView from "../../AvatarView";
import sonylivadd from '../../../assets/images/sonylivadd.png'
import userIcon from '../../../assets/images/userIcon.png'

const ListItemView = ({ group, joinGroupHandler }) => {
    return (
        <div key={group.guid}>
            {/* generating random width for each group list item, can be changed */}
            <div className="groupListItem" style={{
                width: `${Math.floor(Math.random() * 21) + 60}%`
            }}>
                <div className="groupIconContainer">
                    {/* cometchat avatar to show group avatar/icon */}
                    <AvatarView image={group.icon}
                        name={group.name}
                        avatarStyle={JSON.stringify({
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            border: "1px solid rgb(238 238 238)",
                            backgroundColor: "lightgrey",
                            nameTextColor: "rgb(20,20,20)",
                            backgroundSize: "cover",
                            nameTextFont: "500 16px Inter",
                            outerViewBorderWidth: "0",
                            outerViewBorderColor: "transparent",
                            border: "none"
                        })}
                    />
                </div>
                {/* group details */}
                <div className="groupDescriptionBox">
                    <span className='gpoupName'>#{group.name}</span>
                    <p className='groupDescriptionText'> {group.description} </p>
                    <div className="groupMetaInfo">
                        <span className="usersCountContainer"> <span><img src={userIcon} alt="" className="userIcon" /></span> {group.membersCount}</span>
                    </div>
                    <p className='joinNowText' onClick={() => joinGroupHandler(group)}> Join now </p>
                </div>
            </div>
            {
                // render adds, randomly inside groups list, can be changed 
                (Math.floor(Math.random() * 10) + 1) % 2 === 0 ? <img src={sonylivadd} alt="sonyliv add" className='addvertisement' id="addvertisement" /> : null
            }
        </div>
    )
}


export default ListItemView;