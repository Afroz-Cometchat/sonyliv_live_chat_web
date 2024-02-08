import { CometChatUIKit } from "@cometchat/chat-uikit-react"
import { useEffect, useState } from "react"

const MessageBubbleReactionsView = ({ message, setIsLiked, setIsMyReaction }) => {
    // handle reactions total count
    const [reactionsCount, setReactionsCount] = useState(false);
    // handle reactions data (emojies)
    const [reactionsData, setReactionsData] = useState([]);

    useEffect(() => {
        CometChatUIKit.getLoggedinUser().then((user) => {
            if (message.metadata?.['@injected']?.extensions?.reactions) {
                // get array or reactions (emojies)
                let reactionsDataTemp = Object.keys(message.metadata['@injected']?.extensions?.reactions)
                // to count total reactions
                let count = 0
                // to check if user reactions already present in the message
                let myReactionFlag = true;
                // to check if user has liked the message
                let flag = true;
                // loop to iterate over all reactison and handle count, myReactionFlag, and like
                for (let k in message.metadata?.['@injected']?.extensions?.reactions) {
                    //  myCount > get all the user that have reacted
                    let myCount = Object.keys(message.metadata?.['@injected']?.extensions?.reactions[k]);
                    // 🛵 is used for like, *********** can be changed
                    if (k !== '🛵') {
                        // if its not a like reaction then count in reactions
                        count += myCount.length
                        if (myCount.includes(user.name)) {
                            // if any reactions is made by the user then set myReaction to true
                            setIsMyReaction(true);
                            myReactionFlag = false
                        }
                    } else {
                        // if its a like reaction ,  don't count in reactions and if its users like then set isLiked to true
                        if (myCount.includes(user.name)) {
                            setIsLiked(true)
                            flag = false;
                        }
                    }
                }
                if (myReactionFlag) setIsMyReaction(false)
                setReactionsCount(count)
                setReactionsData(reactionsDataTemp)
                if (flag) setIsLiked(false)
            }
        })
    }, [message])

    return (
        <>
            {
                // map over reactsions (emojies) to render
                reactionsCount > 0 ?
                    <div className='reactionEmojiContainer'>
                        <div className='reactionsEmojis'>
                            {reactionsData.map((ele) => {
                                if (ele !== '🛵') {
                                    return <span>{ele}</span>
                                }
                            })}
                        </div>
                        <span className='reactionsCount'>{reactionsCount}</span>
                    </div> : null
            }
        </>
    )
}

export { MessageBubbleReactionsView };