import React, { Component }  from 'react';
import Noti from "../notis/noti"
import axios from "axios";
import "./notification.css";
import { useContext, useEffect, useRef, useState } from 'react';
import { typography } from '@mui/system';

export default function Notification(){
        const profile = JSON.parse(localStorage.getItem('profile'))
        const userId = profile.result._id
        const [notifications, setNotifications] = useState([])
        
        useEffect(() => {
            axios.get('http://localhost:5000/api/v1/notis/noti', {
                params: {
                    userid: userId
                }
            }).then(res => {
                setNotifications(res.data)
            })

        }) 
        useEffect(() =>{
           
            const friendId = notifications?.members.find((m)=> m !== userId)
            let friendUN;
            const getUser = async () => {
                try{
                    axios.get('getfriend'), {
                        params: {
                            friendId
                        }
                    }.then(res =>{
                        friendUN = res.data.user_name
                    })
                }catch (err){
                    console.log(err)
                }
            }
            getUser()
        },[])
    
       const  handleAccept = async(e) => {
           e.preventDefault();
           const group = {
               senderId: friendId,
               receiverId: userId
           };
           try{
                const res = await axios.post('http://localhost:5000/api/v1/groups/group/', group)

            }catch(err){
               console.log(err)
           }
       }
    
        return(
            <div >
                
            </div>
        )
        
}
