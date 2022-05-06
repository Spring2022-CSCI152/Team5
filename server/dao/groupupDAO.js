import e from "express"
import express from "express"
import mongodb from "mongodb"
//const mongoose = require("mongoose");
const ObjectId = mongodb.ObjectId

let groups
export default class groupupDAO{
    static async injectDB(conn) {
        if (groups) {
            return
        }
        try {
            groups = await conn.db(process.env.USERINFO_NS).collection("groups")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in groupupDAO: ${e}`,
            )
        }
    }
    static async getGroup(userId){
        try{
            console.log(userId)
            let query = {members: {$in: [userId] } }
            const group = await groups.find(query).toArray()
            console.log(group)
            return group
        }catch (e){
            console.error(`no conversation available: ${e}`)
            return { error: e}
        }
    }
    static async addGroup(senderId, receiverId){
        try{
            const newGroup = {
                members: [
                    senderId,
                    receiverId
                ],
                createdAt: new Date()

            }
            await groups.insertOne(newGroup);
            return newGroup;
        }catch (e) {
            console.error(`no conversation available: ${e}`)
            return { error: e}
        }
    }
    static async deleteGroup(senderId){
        try{
            let query  = {members: {$in: [senderId] } }
            const deleted = await groups.deleteOne(query)
            return deleted;
        }catch(e){
            console.error(`no conversation available: ${e}`)
            return { error: e}
        }
        
    }
}