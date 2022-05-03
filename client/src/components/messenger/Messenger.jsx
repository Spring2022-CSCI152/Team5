import React, { Component }  from 'react';
import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from  "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import chatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from 'react';
import axios from "axios";


//import { useContext } from "react";

export default function Messenger()
{
  const profile = JSON.parse(localStorage.getItem('profile'))
  const userId = profile.result._id
  console.log(userId)
 
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] =  useState("");
  //const { user } = useContext(AuthContext);
  const scrollRef= useRef();


  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/conversations/conversation/?userId=${userId}`)
        .then(res => {
          console.log(res.data)
          setConversations(conversations.concat(res.data));
        })
      }, [])
    // useEffect(()  =>{
    //   const getConversations = async ()=>{
    //     try{
    //       const res = await axios.get("http://localhost:5000/api/v1/conversations/conversation/"+userId)
    //       //console.log(res)
    //       setConversations(res.data);
    //     }catch(err){
    //       console.log(err);
    //     }
    //   };
    //   getConversations();
    // }, [userId]);

     console.log(conversations)
    useEffect(() => {
      const getMessages = async () =>{
        try{
          const res = await axios.get("/messages/"+currentChat?._id)
          setMessages(res.data);
        } catch (err){
        console.log(err);
          }
        };
        getMessages()
    }, [currentChat]) 

    const handleSubmit = async(e) => {
      e.preventDefault();
      const message = {
        sender: userId,
        text: newMessage,
        conversationId: currentChat._id,
      };
      try{
        const res = await axios.post("/messages", message);
        setMessages([...messages, res.data])
        setNewMessage("");
      }catch(err){
        console.log(err);
      }
    }
   console.log(userId)
    return (
  <>
  <Topbar />
  <div className="messenger">
    <div className="chatMenu">
      <div className="chatMenuWrapper">
        <input placeholder="Search Friend" className="chatMenuInput" />
        {conversations.map((c)=>(
          <div onClick={()=> setCurrentChat(c)}>
          <Conversation conversation={c} currentUserId={userId}/>
          </div>
        ))}
        <Conversation/>
      </div>
    </div>
    <div className="chatBox">
      <div className="chatBoxWrapper">
        {
         currentChat ?
        <>
        <div className="chatBoxTop">
          {messages.map((m) =>(
           
              <Message message={m} own={m.sender === userId}/>
          
          ))}
        
        </div>
        <div className="chatBoxBottom">
          <textarea 
            className="chatMessageInput" 
            placeholder = "Chat with friend"
            onChange={(e)=> setNewMessage(e.target.value)}
            value = {newMessage}
            ></textarea>
          <button className="chatSubmitButton" onClick >
            Send
            </button>
        </div></> : <span className="noConversationText">Open a conversation to start a chat</span>}
      </div>
    </div>
    <div className="chatOnline">
      <div className="chatOnlineWrapper"></div>
    </div>
  </div>
  
    
  
  
  </>
);
}