import express from "express"
import mongodb from "mongodb"
//const mongoose = require("mongoose");
const ObjectId = mongodb.ObjectId

let notis
export default class groupupDAO{
    static async injectDB(conn) {
        if (notis) {
            return
        }
        try {
            notis = await conn.db(process.env.USERINFO_NS).collection("notifications")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in groupupDAO: ${e}`,
            )
        }
    }
    static async getNotis(userId){
        try{
            let query  = {senderId: {$in: [userId] }  }
            const notification = await notis.find(query).toArray();
            return notification
        }catch (e){
            console.error(`no conversation available: ${e}`)
            return { error: e}
        }
    }
    static async addNoti(senderId, receiverId){
        try{
            const newNoti = {
                members: [
                    senderId,
                    receiverId
                ],
                accept: false,
                createdAt: new Date()
            }
            await notis.insertOne(newNoti)
            return newNoti
        }catch (e) {
            console.error(`no conversation available: ${e}`)
            return { error: e}
        }
    }
    static async deleteNoti(userId){
        try{
            let query = { members: {$in: [userId] } }
           const deleted =  await notis.deleteOne(query)
            return deleted
        }catch (e){
            console.error(`no conversation available: ${e}`)
            return { error: e}
        }
    }
}