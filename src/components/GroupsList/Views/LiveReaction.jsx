import React, { memo } from 'react';

export const CometChatLiveReactionView = memo((props) => (
    props.showReactions
        ? <cometchat-live-reaction reactinIconURL="https://emojiisland.com/cdn/shop/products/Emoji_Icon_-_Sunglasses_cool_emoji_large.png?v=1571606093" />
        : null
));

// Inside your parent 