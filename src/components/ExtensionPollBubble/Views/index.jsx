import { AvatarStyle } from "@cometchat/uikit-elements";
import { createComponent } from "@lit/react";
import React from "react";

const PollOptionWraper = ({ message, sendVote, ele, myVote, pollData, pollResults, totalVotes, getVoterAvatars }) => {
    const AvatarView = createComponent({
        react: React,
        elementClass: AvatarStyle,
        tagName: "cometchat-avatar"
    })
    return (
        <div className="poll_option">
            <input type="radio" name={message.id} className="poll_option_radio" onChange={() => sendVote(ele)} checked={ele === myVote} />
            <div className="poll_option_box">
                <div className="poll_option_name_container">
                    <span className="poll_option_name">{pollData.options[ele]}</span>
                    <progress
                        type="range"
                        min={0}
                        max={100} value={pollResults[ele].count / totalVotes * 100} className="poll_progress"
                    />
                </div>
                {
                    pollResults[ele].count > 0 ? <div className="poll_voters_container">
                        <div className="voter_image_wraper">
                            {
                                getVoterAvatars(pollResults, ele).map(({ avatar, name }) => <span>
                                    <span>
                                        <AvatarView image={avatar}
                                            name={name}
                                            avatarStyle={JSON.stringify({
                                                borderRadius: "50%",
                                                width: "20px",
                                                height: "20px",
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
                                    </span>
                                </span>)
                            }
                        </div>
                        <span>{pollResults[ele].count}</span>
                    </div> : null
                }
            </div>
        </div>
    )
}

export default PollOptionWraper;