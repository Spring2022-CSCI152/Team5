import axios from 'axios';
import React, { Component, useEffect }  from 'react';
import { useState} from 'react';
import "./conversation.css"

export default function Conversation({conversation, currentUserId,})
{

 // console.log(conversation)

  const profile = JSON.parse(localStorage.getItem('profile'));
  const userId = profile.result._id
 // console.log(userId)
  const [user,setUser] = useState(null);
 // const userId = 
  useEffect(()=>{ 
    
    const friendId = conversation?.members.find((m)=> m !== userId)
    //console.log(friendId)
      const getUser = async () => {
        try {
        axios.get("http://localhost:5000/api/v1/users/friends",{
          params: {
            userId: userId
          }
        }).then(res =>{
           const far = res.data;
            far.friends.forEach(f =>{
              if(f._id === friendId){
                setUser(f);
              }
            })
            
            
        })
      } catch (err){
        console.log(err)
      }
    };
    getUser();
  },[currentUserId, conversation])
  return(
    <div className="conversation">
      <img className = "conversationImg" src="https://www.derekyu.com/makegames/images/pixel/orc07.png" alt=""/>
      <span className="conversationName">{user?.user_name}</span>
    </div>


  )
}