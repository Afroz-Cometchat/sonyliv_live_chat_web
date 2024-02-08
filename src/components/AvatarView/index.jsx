import { AvatarStyle } from "@cometchat/uikit-elements";
import { createComponent } from "@lit/react";
import React from "react";

const AvatarView = createComponent({
    react: React,
    elementClass: AvatarStyle,
    tagName: "cometchat-avatar"
})

export default AvatarView;