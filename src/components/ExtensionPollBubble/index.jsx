import { useEffect } from "react";
import { useState } from "react";
import './style.css'
import reportCross from '../../assets/images/reportCross.png'
import rightArrow from '../../assets/images/rightArrow.png'
import flagUser from '../../assets/images/flagUser.png'
import { getMyVote, getVoterAvatars, votePoll } from "./controller";
import { CometChatUIKit } from "@cometchat/chat-uikit-react";
import PollOptionWraper from "./Views";
import { handleFlagUser, handleReportUser } from "../../Controllers";

const ExtensionPollBubble = ({ message, updateGrouPollResults }) => {
    const [pollData, setPollData] = useState({});
    const [pollOptions, setPollOptions] = useState([]);
    const [totalVotes, setTotalVotes] = useState(0);
    const [pollResults, setPollResults] = useState({});
    const [myVote, setMyVote] = useState(false);
    const [isActionsView, setIsActionsView] = useState(false);

    const sendVote = (vote) => {
        votePoll(vote, pollData.id, updateGrouPollResults)
    }

    // toogle actions view
    const toogleViewActions = () => {
        setIsActionsView(!isActionsView)
    }

    useEffect(() => {
        setPollData(message.metadata?.["@injected"]?.extensions?.polls);
        const options = Object.keys(message.metadata?.["@injected"]?.extensions?.polls?.options)
        setPollOptions(options)
        setTotalVotes(message.metadata?.["@injected"]?.extensions?.polls?.results?.total)
        const results = message.metadata?.["@injected"]?.extensions?.polls?.results?.options
        setPollResults(results)
        CometChatUIKit.getLoggedinUser().then((user) => {
            getMyVote(user.name, options, results, setMyVote)
        })
    }, [message])

    return (
        <div className="extension_poll_bubble_container">
            <span className='verticalNavDots cursorPointer'>⋮ </span>
            {isActionsView && <div className="actionsContainer">
                <div className="reportUserContainer" onClick={() => handleReportUser(message.sender.uid)}>
                    <span><img src={reportCross} alt="" className='actionIcons' /></span>
                    <span>Report User</span>
                    <span><img src={rightArrow} alt="" /></span>
                </div>
                <div className="flagUserContainer" onClick={() => handleFlagUser(message.sender.uid)}>
                    <span><img src={flagUser} alt="" className='actionIcons' /></span>
                    <span>Flag User</span>
                    <span><img src={rightArrow} alt="" /></span>
                </div>
            </div>}
            <div className="poll_bubble_container">
                <div className="poll_of_the_week"> <span>Poll of the Week</span> </div>
            </div>
            <div key={pollData.question}><span>{pollData.question}</span></div>
            <div className="poll_options_container">
                {
                    pollOptions.map(ele => <PollOptionWraper
                        message={message}
                        sendVote={sendVote}
                        ele={ele} myVote={myVote}
                        pollData={pollData}
                        pollResults={pollResults}
                        totalVotes={totalVotes} getVoterAvatars={getVoterAvatars} />)
                }
            </div>
        </div>
    )
}

export default ExtensionPollBubble;