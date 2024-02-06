import React, { memo } from 'react';

export const CometChatLiveReactionView = memo((props) => (
    props.showReactions
        ? <cometchat-live-reaction reactinIconURL={props.reactionURL} />
        : null
));

// Inside your parent 