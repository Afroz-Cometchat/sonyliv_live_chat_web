import { AvatarStyle } from "@cometchat/uikit-elements";
import { createComponent } from "@lit/react";
import React from "react";

const AvatarView = createComponent({
    react: React,
    elementClass: AvatarStyle,
    tagName: "cometchat-avatar"
})

const ListItemView = ({ group, joinGroupHandler }) => {
    return (
        <div className="groupListItem" style={{
            width: `${Math.floor(Math.random() * 21) + 60}%`
        }}>
            <div className="groupIconContainer">
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
                {/* <CometCHatAva */}
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


export default ListItemView;