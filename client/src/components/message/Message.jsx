import React, { Component }  from 'react';
import "./message.css";

export default function Message()
{
  return(
    <div className="message">
      <div className="messageTop">
        <img
        className="messageImg"
         src = "https://www.derekyu.com/makegames/images/pixel/orc07.png" 
         alt=""
        />
        <p className ="messageText">Hello this is a text</p>
      </div>
      <div className="messageBottom">5 hours ago</div>
    </div>
  );
}

