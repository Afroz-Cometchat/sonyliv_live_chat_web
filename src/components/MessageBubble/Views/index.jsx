import { CometChatUIKit } from "@cometchat/chat-uikit-react"
import { useEffect } from "react"

const MessageBubbleReactionsView = ({ message, setReactionsCount, setReactionsData, setIsLiked, reactionsData, reactionsCount }) => {
    useEffect(() => {
        CometChatUIKit.getLoggedinUser().then((user) => {
            if (message.metadata?.['@injected']?.extensions?.reactions) {
                let reactionsDataTemp = Object.keys(message.metadata['@injected'].extensions.reactions)
                let count = 0
                for (let k in message.metadata?.['@injected']?.extensions?.reactions) {
                    let myCount = Object.keys(message.metadata?.['@injected']?.extensions?.reactions[k]);
                    count += myCount.length
                }
                setReactionsCount(count)
                setReactionsData(reactionsDataTemp)
                let flag = true;
                if (reactionsDataTemp.includes('👍')) {
                    for (let k in message.metadata?.['@injected']?.extensions?.reactions) {
                        if (k === '👍')
                            for (let j in message.metadata?.['@injected']?.extensions?.reactions[k]) {
                                if (j === user.name) {
                                    setIsLiked(true)
                                    flag = false
                                    return;
                                }
                            }
                    }
                }
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
                            {reactionsData.map(ele => <span>{ele}</span>)}
                        </div>
                        <span className='reactionsCount'>{reactionsCount}</span>
                    </div> : null
            }
        </>
    )
}

export { MessageBubbleReactionsView };