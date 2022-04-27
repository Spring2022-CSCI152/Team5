import conversationsDAO from "../routes/conversationsDAO.js"


export default class ConvoCtrl{
    static async apiAddNewConvo(req, res, next){
        try{
            const sender = req.body.senderId
            const reciever = req.body.recieverId
            const result = await conversationsDAO.addConvo(sender,reciever)
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
    static async apiGetConvoOfUser(req, res, next){
        try{      
            const user = req.body.userId
            const result = await conversationsDAO.getConvo(user);
            console.log(result.senderId);
            res.status(200).json(result);
        } catch (e){
            res.status(500).json({ error: e.message })
        }
    }

}