import messagesDAO from "../routes/messagesDAO.js"

export default class MessageCtrl{
    static async addNewMessage(req, res,next){
        try{    
            const senderId = req.body.sender;
            const texter = req.body.text;
            const convoId = req.body.conversationId;
            const result = await messagesDAO.addNewMessage(senderId,texter,convoId);
            res.status(200).json(result);
        }catch (e){
            res.status(500).json({ error: e.message })
        }
    } 

    static async getOldMessage(req, res, next){
        try{
            //console.log(req.query.conversationId)
            const convId = req.query.conversationId
            const result = await messagesDAO.getOldMessages(convId);
            //console.log(result)
            res.status(200).json(result)
        }catch (e){
            res.status(500).json({ error: e.message })
        }
    }
}
