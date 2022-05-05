import groupupDAO from "../dao/groupupDAO.js"



export default class groupCTRL{
    static async apiGetGroup(req,res,next ){
        try{
        const userId = req.query.userId
        const result = await groupupDAO.getGroup(userId);

        res.status(200).json(result)
    }catch(e){
        res.status(500).json({ error: e.message })
    }
}
    static async apiAddGroup(req,res,next ){
        try{    
            const userId = req.body.userId
            const friendId = req.body.friendId
            const result = await groupupDAO.addGroup(userId,friendId)
            res.status(200).json(result)
        }catch (e){
            res.status(500).json({ error: e.message })
        }
    }
    static async apiDeleteGroup(req,res,next){
        try {
            const userId = req.body.userId
            const result = await groupupDAO.deleteGroup(userId)
            res.status(200).json(result)
        }catch(e){
            res.status(500).json({ error: e.message })
        }
    }

}