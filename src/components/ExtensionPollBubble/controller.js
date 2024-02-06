import { CometChat } from "@cometchat/chat-sdk-javascript"

// vote for a poll
const votePoll = (vote, id, updateGrouPollResults) => {
    // console.log("yoo", vote, id);
    CometChat.callExtension('polls', 'POST', 'v2/vote', {
        vote,
        id,
    }).then(response => {
        // Successfully voted
        updateGrouPollResults()
    })
        .catch(error => {
            // Error Occured
        });
}

// git your own selected poll
const getMyVote = (name, options, result, setMyVote) => {
    for (let i = 0; i < options.length; i++) {
        if (result[options[i]].voters) {
            for (let k in result[options[i]].voters) {
                if (k === name) {
                    setMyVote(options[i])
                    return;
                }
            }
        }
    }
}

// get voter avatars
const getVoterAvatars = (pollResults, ele) => {
    let avatars = []
    const voters = Object.keys(pollResults[ele].voters || {})
    for (let i = 0; i < voters.length; i++) {
        avatars.push(pollResults[ele].voters[voters[i]].avatar)
    }
    return avatars;
}

export { votePoll, getMyVote, getVoterAvatars };