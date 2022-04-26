import messagesDAO from "../routes/messagesDAO.js"

export default class MessageCtrl{
    static async addNewMessage(req, res,next){
        try{    
            const message = req.body;
            const result = await messagesDAO.addNewMessage(message);
            res.status(200).json(result);
        }catch (e){
            res.status(500).json({ error: e.message })
        }
    }

    static async getOldMessage(req, res, next){
        try{
            const convId = req.body.convoId
            const result = await messagesDAO.getOldMessage(convId);
            res.status(200).json(result)
        }catch (e){
            res.status(500).json({ error: e.message })
        }
    }
}
