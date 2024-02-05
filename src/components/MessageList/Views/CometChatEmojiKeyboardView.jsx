import { CometChatEmojiKeyboard } from "@cometchat/chat-uikit-react";
import { createComponent } from "@lit-labs/react";
import React from "react";

const CometChatEmojiKeyboardView = createComponent({
    tagName: "cometchat-emoji-keyboard",
    elementClass: CometChatEmojiKeyboard,
    react: React,
    events: {
        ccEmojiClicked: "cc-emoji-clicked",
    },
});

export default CometChatEmojiKeyboardView;