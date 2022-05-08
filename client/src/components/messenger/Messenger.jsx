import React, { Component }  from 'react';
import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from  "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import chatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from 'react';
import Search from '../SearchBar/search';
import axios from "axios";
import {io} from "socket.io-client"

//import { useContext } from "react";
const socket = io("ws://localhost:8900");
export default function Messenger()
{
  const profile = JSON.parse(localStorage.getItem('profile'))
  const userId = profile.result._id
  //console.log(userId)
 
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  //const [socket, setSocket] = useState(null)
  const socket = useRef();
const [arrivalMessage, setArrivalMessage] = useState(null)
  const [newMessage, setNewMessage] =  useState("");
  //const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
      socket.current = io("ws://localhost:8900");
      socket.current.on("getMessage", data =>{
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          
        })
      })
  }, [] )

  useEffect(() =>{
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
    setMessages((prev)=> [...prev,arrivalMessage])
  }, [arrivalMessage, currentChat])
 useEffect(() => {
   socket.current.emit("addUser", userId);
   socket.current.on("getUsers", users =>{
     console.log(users)
   })
 }, [userId])
 // console.log(socket)
  // useEffect(() => {
  //   socket.on("welcome", (message) => {
  //     console.log(message)
     
  //   })
  // }, [socket]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/conversations/conversation/?userId=${userId}`)
        .then(res => {
          setConversations(conversations.concat(res.data));
        })
      }, [])
  

    useEffect(() => {
     axios.get('http://localhost:5000/api/v1/messages/message/', {
        params: {
          conversationId: currentChat?._id
        }
      }).then(response  => {
     
        setMessages(response.data)
      })
    }, [currentChat])
  

    const handleSubmit = async(e) => {
      e.preventDefault();
      const message = {
        sender: userId,
        text: newMessage,
        conversationId: currentChat._id,
      };
      const receiverId = currentChat.members.find(
        (member)=> member !== userId
      );
      socket.current.emit("sendMessage", {
        senderId: userId,
        receiverId,
        text: newMessage
      })
      try{
        const res = await axios.post('http://localhost:5000/api/v1/messages/message/', message);
        setMessages([...messages, res.data])
        setNewMessage("");
      }catch(err){
        console.log(err);
      }
    }
    return (
  <>
  <Topbar />
  <div  style={{"font-family": "San Francisco","font-weight": "900","font-size": "50px"}} className = "titleTop">Messages</div>
  <Search />
  { <h7> ────────  Your Conversations  ────────</h7> }
  <div className="messenger">
    <div className="chatMenu">
      <div className="chatMenuWrapper">
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
          <button className="chatSubmitButton"  onClick = {handleSubmit}>
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