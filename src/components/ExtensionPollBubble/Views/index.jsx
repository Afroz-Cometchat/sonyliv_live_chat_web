const PollOptionWraper = ({ message, sendVote, ele, myVote, pollData, pollResults, totalVotes, getVoterAvatars }) => {
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
                                getVoterAvatars(pollResults, ele).map(ele => <span>
                                    <img src={ele} alt="" className="voter_image" />
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