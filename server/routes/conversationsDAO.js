import express from "express"
import mongodb from "mongodb"
//const mongoose = require("mongoose");
const ObjectId = mongodb.ObjectId

const router = express.Router()

//import Conversation from "../models/Conversation.js"

//new conv
let convos

export default class ConversationsDAO{
  
  
//router.post("/", async (req, res) => {
  static async injectDB(conn) {
    if (convos) {
        return
    }
    try {
        convos = await conn.db(process.env.USERINFO_NS).collection("conversations")
    } catch (e) {
        console.error(
            `Unable to establish a collection handle in usersDAO: ${e}`,
        )
    }
}
 static async addConvo(senderId,recieverId){
  try {
    const newConversation =  {
      
        members: 
           [
             senderId,
             recieverId
           ],
            
        createdAt: new Date() ,
        updatedAt: new Date()
    }
     await convos.insertOne(newConversation)
     return newConversation;
    } catch (e) {
      console.error(`Unable to add user: ${e}`)
      return { error: e }
  }
  
 }
static async getConvo(userId) {
  try{
    
    let query = { members: {$in: [userId] } }
    const conversation = await convos.find(query).toArray();
    return conversation
  }catch (e){
    console.error(`no conversation available: ${e}`)
    return { error: e}
    }
  }
}
