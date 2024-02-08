import { CreatePoll } from "@cometchat/uikit-shared";
import { createComponent } from "@lit/react";
import React from "react";

const CreatePollView = createComponent({
    tagName: 'create-poll',
    elementClass: CreatePoll,
    react: React,
    events: {
        ccCloseClicked: 'cc-close-clicked'
    }
});

export default CreatePollView;