import { CometChatUIKit } from "@cometchat/chat-uikit-react"
import { useEffect, useState } from "react"

const MessageBubbleReactionsView = ({ message, setIsLiked, setIsMyReaction }) => {
    const [reactionsCount, setReactionsCount] = useState(false);
    const [reactionsData, setReactionsData] = useState([]);
    useEffect(() => {
        CometChatUIKit.getLoggedinUser().then((user) => {
            if (message.metadata?.['@injected']?.extensions?.reactions) {
                let reactionsDataTemp = Object.keys(message.metadata['@injected']?.extensions?.reactions)
                let count = 0
                let myReactionFlag = true;
                let flag = true;
                for (let k in message.metadata?.['@injected']?.extensions?.reactions) {
                    let myCount = Object.keys(message.metadata?.['@injected']?.extensions?.reactions[k]);
                    if (k !== '🛵') {
                        count += myCount.length
                        if (myCount.includes(user.name)) {
                            setIsMyReaction(true);
                            myReactionFlag = false
                        }
                    } else {
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