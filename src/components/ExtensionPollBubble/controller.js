import { CometChat } from "@cometchat/chat-sdk-javascript"

// vote for a poll
const votePoll = (vote, id, updateGrouPollResults) => {
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
    console.log("voter", pollResults);
    let avatars = []
    const voters = Object.keys(pollResults[ele].voters || {})
    for (let i = 0; i < voters.length; i++) {
        avatars.push({ avatar: pollResults[ele].voters[voters[i]].avatar, name: pollResults[ele].voters[voters[i]].name })
    }
    return avatars;
}

export { votePoll, getMyVote, getVoterAvatars };