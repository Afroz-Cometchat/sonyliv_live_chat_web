import backbutton from '../../../assets/images/backbutton.png'
export default function MessageListHeader(props) {
    return (
        <div className="messageListHeader">
            <span className="backButton">
                <img src={backbutton} alt="" onClick={props.closeGroup} />
            </span>
            <div className="groupIconContainer">
                <img src={props.joinedGroup.icon} alt="" className="groupIcon" />
            </div>
            <p className="groupDiscriptionText">{props.joinedGroup.description}</p>
        </div>
    )
} 