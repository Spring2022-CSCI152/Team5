import conversationsDAO from "../routes/conversationsDAO.js"
import UsersDAO from "../dao/usersDAO.js"


export default class ConvoCtrl{
    static async apiAddNewConvo(req, res, next){
        try{
            if(!req.body.senderId || !req.body.recieverId){
                res.status(400).json("No senderId or recieverId given")
                return
            }
            let filters = {"id":req.body.senderId}
            let page = 0
            let usersPerPage = 20
            const {usersList, totalNumUsers }= await UsersDAO.getUsers(filters,page,usersPerPage)
            var temp = false
            for(let i = 0; i < usersList.length;i++){
                if(usersList[i]._id == req.body.senderId){
                    for(let j = 0; j < usersList[i].friends_list.num_friends;j++){
                        if(usersList[i].friends_list.friends[j]._id == req.body.recieverId){
                            temp = true
                        }
                    }
                }
            }
            if(temp) {
                const sender = req.body.senderId
                const reciever = req.body.recieverId
                const result = await conversationsDAO.addConvo(sender,reciever)
                res.status(200).json(result);
            } else {
                res.status(400).json("Wrong senderId and/or recieverId")
            }
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
    static async apiGetConvoOfUser(req, res, next){
        try{  
            if(!req.query.userId){
                res.status(400).json("No userId given")
                return
            }    
            console.log(req.query.userId)
            const user = req.query.userId
            const result = await conversationsDAO.getConvo(user);
            res.status(200).json(result);
        } catch (e){
            res.status(500).json({ error: e.message })
        }
    }

}