import { useEffect, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import ExtensionPollBubble from "../../ExtensionPollBubble";

const GroupPollView = () => {
    // handle group poll data
    const [groupPoll, setGroupPoll] = useState(false);

    // update group poll result
    const updateGrouPollResults = () => {
        // create request builder for custom, extension poll messages
        const pollsRequestBuilder = new CometChat.MessagesRequestBuilder()
            .setGUID("supergroup")
            .setLimit(1)
            .setCategory("custom")
            .setType("extension_poll")
            .hideDeletedMessages(true)
            .build();
        // fetch latest custom extension_poll message
        pollsRequestBuilder.fetchPrevious().then(
            messages => {
                setGroupPoll(messages[0])
            }, error => {
                console.log("Message fetching failed with error:", error);
            }
        );
    }

    useEffect(() => {
        // cometchat listener to update the poll
        let listenerId = new Date().getTime();
        CometChat.addMessageListener(
            listenerId,
            new CometChat.MessageListener({
                onMessageEdited: editedMsg => {
                    // check if edited message is the group poll and update the poll
                    if (editedMsg.id === groupPoll.id) {
                        updateGrouPollResults()
                    }
                }
            })
        );

        // return CometChat.removeMessageListener(listenerId)
    }, [])
    useEffect(() => {
        updateGrouPollResults()
    }, [])
    return (
        groupPoll && <ExtensionPollBubble message={groupPoll} updateGrouPollResults={updateGrouPollResults} />
    )
}

export default GroupPollView