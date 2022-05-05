import notifyDAO from "../dao/notifyDAO.js"


export default class notifyCTRL{
    static async apiGetNoti(req,res,next){
        try{
            const userId = req.query.userId
            const result = await notifyDAO.getNotis(userId);
         res.status(200).json(result);

    }catch (e){
        res.status(500).json({ error: e.message })
    }
}
    static async apiPostNoti(req,res,next){
        try{
            const senderId = req.body.senderId
            const receiverId = req.body.receiverId
            const result = await notifyDAO.addNoti(senderId,receiverId);
         res.status(200).json(result);
    }catch (e){
     res.status(500).json({ error: e.message })
    }
}
    static async apiDeleteNoti(req,res,next){
        try{
            const senderId = req.body.senderId
            //const receiverId= req.body.receiverId
            const result = await notifyDAO.deleteNoti(senderId)
            res.status(200).json(result)
       }catch(e){
            res.status(500).json({ error: e.message })
        }
    }

}