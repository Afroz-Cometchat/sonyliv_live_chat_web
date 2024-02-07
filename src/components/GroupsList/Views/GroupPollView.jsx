import { useEffect, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import ExtensionPollBubble from "../../ExtensionPollBubble";

const GroupPollView = () => {
    const [groupPoll, setGroupPoll] = useState(false);
    const [triggerGrouPoll, setTriggerGrouPoll] = useState(false);

    // update group poll result
    const updateGrouPollResults = () => {
        console.log("updateing");
        const pollsRequestBuilder = new CometChat.MessagesRequestBuilder()
            .setGUID("supergroup")
            .setLimit(1)
            .setCategory("custom")
            .setType("extension_poll")
            .hideDeletedMessages(true)
            .build();

        pollsRequestBuilder.fetchPrevious().then(
            messages => {
                setGroupPoll(messages[0])
            }, error => {
                console.log("Message fetching failed with error:", error);
            }
        );
        // setTriggerGrouPoll(!triggerGrouPoll)
    }

    useEffect(() => {
        // listeneres
        let listenerId = new Date().getTime();
        CometChat.addMessageListener(
            listenerId,
            new CometChat.MessageListener({
                onCustomMessageReceived: customMessage => {
                    console.log("Custom message received successfully", customMessage);
                },
                onMessageEdited: editedMsg => {
                    // to update the group poll results
                    if (editedMsg.id === groupPoll.id) {
                        console.log("hii");
                        console.log("gochaa");
                        // setTriggerGrouPoll(!triggerGrouPoll)
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