import { CometChat } from "@cometchat/chat-sdk-javascript";

const addCometChatReaction = (reaction, id, toggleReactionsOptions) => {
    CometChat.callExtension('reactions', 'POST', 'v1/react', {
        msgId: id,
        emoji: reaction
    }).then(response => {
        toggleReactionsOptions()
    }).catch(error => {
        // Some error occured
    });
}

const addCometChatReactionLike = (id) => {
    CometChat.callExtension('reactions', 'POST', 'v1/react', {
        msgId: id,
        emoji: '👍'
    }).then(response => {
        // Reaction added successfully
    }).catch(error => {
        console.log(error);
    });
}

export { addCometChatReaction, addCometChatReactionLike };