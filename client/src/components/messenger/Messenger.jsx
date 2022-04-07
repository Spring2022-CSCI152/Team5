import React, { Component }  from 'react';
import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from  "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import chatOnline from "../../components/chatOnline/ChatOnline";
//import { useContext } from "react";

export default function Messenger()
{
//const {user} = useContext()
return (
  <>
  <Topbar />
  <div className="messenger">
    <div className="chatMenu">
      <div className="chatMenuWrapper">
        <input placeholder="Search Friend" className="chatMenuInput" />
        <Conversation/>
      </div>
    </div>
    <div className="chatBox">
      <div className="chatBoxWrapper">
        <div className="chatBoxTop">
          <Message />
          <Message own={true}/>
          <Message />
        </div>
        <div className="chatBoxBottom">
          <textarea className="chatMessageInput" placeholder = "Chat with friend"></textarea>
          <button className="chatSubmitButton">Send</button>
        </div>
      </div>
    </div>
    <div className="chatOnline">
      <div className="chatOnlineWrapper"></div>
    </div>
  </div>
  
  
  
  
  </>
);
}