import React, { Component }  from 'react';
import "./message.css";
import { format } from 'timeago.js';
export default function Message({message,own})
{
  return(
    <div className= {own ? "message own" : "message"}>
      <div className="messageTop">
        <img
        className="messageImg"
         src = "https://www.derekyu.com/makegames/images/pixel/orc07.png" 
         alt=""
        />
        <p className ="messageText">
          {message.text}
        </p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}

