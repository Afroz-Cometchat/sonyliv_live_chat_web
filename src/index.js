import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CometChatUIKit, UIKitSettingsBuilder } from '@cometchat/chat-uikit-react';
import COMETCHAT_CONSTANTS from './CONSTS';


(() => {
  let userToken = prompt('Enter user AuthToken')
  const UIKitSettings = new UIKitSettingsBuilder()
    .setAppId(COMETCHAT_CONSTANTS.APP_ID)
    .setRegion(COMETCHAT_CONSTANTS.REGION)
    .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
    .subscribePresenceForFriends()
    .build();
  //Initialize CometChat UIKit
  CometChatUIKit.init(UIKitSettings).then(() => {
    // You can now call login function.
    CometChatUIKit.getLoggedinUser().then(user => {
      if(!user){
        //Login user
        CometChatUIKit.loginWithAuthToken(userToken).then(user => {        
          //mount your app        
        }).catch(console.log);
      } else {
        //mount your app
      }
    }).catch(console.log);
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <App />
    );
  }).catch(console.log);
})()




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
