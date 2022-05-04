import messagesDAO from "../routes/messagesDAO.js"
import ConversationsDAO from "../routes/conversationsDAO.js"
export default class MessageCtrl{
    static async addNewMessage(req, res,next){
        try{
            if(!req.body.conversationId){
                res.status(400).json("No conversationId in request")
                return
            } else if(!req.body.senderId){
                res.status(400).json("No senderId in request")
                return
            } else if(!req.body.text){
                res.status(400).json("No text in request")
                return
            }
            var temp = false
            let result1 = await ConversationsDAO.getConvo(req.body.senderId)
            for(let i = 0;i < result1.length;i++){
                if(result1[i]._id == req.body.conversationId){
                    temp = true
                }
            }
            if(temp){
                const result = await messagesDAO.addNewMessage(req.body.senderId,req.body.texter,req.body.convoId);
                res.status(200).json(result);
            } else {
                res.status(400).json("ConversationId and senderId do not match to a conversation")
            }
        }catch (e){
            res.status(500).json({ error: e.message })
        }
    }

    static async getOldMessage(req, res, next){
        try{
            if(!req.body.convoId){
                res.status(400).json("No convoId given in the request")
                return
            }
            const convId = req.body.convoId
            const result = await messagesDAO.getOldMessages(convId);
            if(result[Object.getOwnPropertySymbols(result)[8]].conversationId == convId){
                res.status(200).json(result)
            } else {
                res.status(400).json("Wrong convoId given in the request")
            }
        }catch (e){
            res.status(500).json({ error: e.message })
        }
    }
}
