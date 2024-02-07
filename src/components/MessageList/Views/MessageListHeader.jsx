import backbutton from '../../../assets/images/backbutton.png'
export default function MessageListHeader(props) {
    return (
        <div className="message_list_header">
            <span className="back_button">
                <img src={backbutton} alt="" onClick={props.closeGroup} />
            </span>
            <div className="groupIconContainer">
                <img src={props.joinedGroup.icon} alt="" className="group_icon" />
            </div>
            <p className="groupDiscriptionText">{props.joinedGroup.description}</p>
        </div>
    )
} 