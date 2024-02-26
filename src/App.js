import { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home/index';
import Nav from './components/Navigation/index';
import { CometChatUIKit } from '@cometchat/chat-uikit-react';
import ashleycooper from './assets/images/ashleycooper.jpg'
import christinerussell from './assets/images/christinerussell.jpg'
import jeffreybryant from './assets/images/jeffreybryant.jpg'

function App() {
  const [isUser, setIsUser] = useState(false);
  const [userUid, setUserUid] = useState('');

  const loginUserHandler = (e) => {
    e.preventDefault();
    CometChatUIKit.login(userUid, "0d8a2389adec639a4b1a2420344e355d47dce9f9").then(user => {
      //mount your app    
      setIsUser(true);
    }).catch(console.log);
  }

  const loginSampleUser = (uid) => {
    CometChatUIKit.login(uid, "0d8a2389adec639a4b1a2420344e355d47dce9f9").then(user => {
      //mount your app    
      setIsUser(true);
    }).catch(console.log);
  }

  useEffect(() => {
    CometChatUIKit.getLoggedinUser().then(user => {
      if (!user) {
        setIsUser(false)
      } else {
        setIsUser(true);
      }
    }).catch(console.log);
  }, [])
  return (
    <>
      {isUser ?
        <div className="App">
          {/* render navigation */}
          <Nav />
          {/* render home page */}
          <Home />
        </div> :
        <div className='login_page'>
          <div className='sample_users_container'>
            <div onClick={() => loginSampleUser("ashleycooper")}>
              <img src={ashleycooper} className='sample_user_avatar' />
              <span>ashleycooper</span>
            </div>
            <div onClick={() => loginSampleUser("christinerussell")}>
              <img src={christinerussell} className='sample_user_avatar' />
              <span>christinerussell</span>
            </div>
            <div onClick={() => loginSampleUser("jeffreybryant")}>
              <img src={jeffreybryant} className='sample_user_avatar' />
              <span>jeffreybryant</span>
            </div>
          </div>
          <form onSubmit={loginUserHandler}>
            <input type='text' value={userUid} onChange={(e) => setUserUid(e.target.value)} />
            <button type='submit'>LOGIN</button>
          </form>
        </div>}
    </>
  );
}

export default App;
