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
            
        timestamps: true ,
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
    const conversation = await convos.find({
      members: { $in: [userId] },
    });
    return conversation
  }catch (e){
    console.error(`no conversation available: ${e}`)
    return { error: e}
  }
  }
}
// // get conv includes two userId

// router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
//   try {
//     const conversation = await Conversation.findOne({
//       members: { $all: [req.params.firstUserId, req.params.secondUserId] },
//     });
//     res.status(200).json(conversation)
//   } catch (err) {
//     res.status(500).json(err);
//   }
//   });
// } 
// export default router
