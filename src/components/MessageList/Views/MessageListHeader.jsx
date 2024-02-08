import backbutton from '../../../assets/images/backbutton.png'
import React from 'react'
import AvatarView from '../../AvatarView'
export default function MessageListHeader(props) {
    return (
        <div className="message_list_header">
            <span className="back_button">
                <img src={backbutton} alt="" onClick={props.closeGroup} />
            </span>
            <div className="groupIconContainer">
                <AvatarView image={props.joinedGroup.icon}
                    name={props.joinedGroup.name}
                    avatarStyle={JSON.stringify({
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        border: "1px solid rgb(238 238 238)",
                        backgroundColor: "lightgrey",
                        nameTextColor: "rgb(20,20,20)",
                        backgroundSize: "cover",
                        nameTextFont: "500 16px Inter",
                        outerViewBorderWidth: "0",
                        outerViewBorderColor: "transparent",
                        border: "none",
                    })}
                />
            </div>
            <p className="groupDiscriptionText">{props.joinedGroup.description}</p>
        </div>
    )
} 