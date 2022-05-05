import express from "express"
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
import mongoose from "mongoose"

const router = express.Router()




let mlink 
const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: String,
  },
 sender: {
    type: String,
  },
 text: {
    type: String,
 },
},
{ timestamps: true }
)
const MS = mongoose.model('MessageSchema', MessageSchema)
export default class messagesDAO{
  static async injectDB(conn) {
    if (mlink) {
        return
    }
    try {
        mlink = await conn.db(process.env.USERINFO_NS).collection("messages")
    } catch (e) {
        console.error(
            `Unable to establish a collection handle in usersDAO: ${e}`,
        )
    }

  }
  static async addNewMessage(senderId,texter,convoId){
    try {
      const m = {
        conversationId: convoId,
        sender: senderId,
        text: texter,
        createdAt: new Date(),
        updateAt: new Date()
      }
        const addedMessage = await mlink.insertOne(m)
        return m;

      } catch(e){
        console.error(`Unable to add message: ${e}`)
        return { error: e }
    }
  }
  static async getOldMessages(convoId){
    try{
      const message = await mlink.find({
        conversationId: convoId,
      }).toArray();
      return message;
    }catch (e){
      console.error(`Unable to find message: ${e}`)
      return { error: e }
    }
  }
}


