import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let users
let convos
export default class FriendsDAO {
    static async injectDB(conn) {
        if (users) {
            return
        }
        try {
            users = await conn.db(process.env.USERINFO_NS).collection("users")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in friendsDAO: ${e}`,
            )
        }
        try{
            convos = await conn.db(process.env.USERINFO_NS).collection("conversations")
        }catch(e){
            console.error( `Unable to establish a collection handle in convosDAO: ${e}`,)
        }
    }

    static async getFriends(userId) {
        let query = { "_id": ObjectId(userId)}

        let cursor

        try {
            cursor = await users.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, $(e)`)
            return { user: [] }
        }

        const displayCursor = cursor.limit(1).skip(0)

        try {
            const user = await displayCursor.toArray()

            return { user }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { user: [] }
        }
    }

    static async getFriendsByUsername(userName) {
        let query = { $text: { $search: userName } }

        let cursor

        try {
            cursor = await users.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, $(e)`)
            return { user: [] }
        }

        const displayCursor = cursor.limit(1).skip(0)

        try {
            const user = await displayCursor.toArray()

            return { user }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { user: [] }
        }
    }

    static async updateUsersFriends(userId, newFriendsList) {
        
        try {
            let updateResponse = await users.updateOne(
                { _id: ObjectId(userId) },
                { $set: { friends_list: newFriendsList } }
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to add user: ${e}`)
            return { error: e }
        }
    }
    static async createConvoDB(userId,FriendId){
        console.log(FriendId)
        console.log(userId)
        try{
        const newConvo = {
            members: [
                userId,
                FriendId
            ],
            createdAt: new Date(),
            updateAt: new Date()
        }   
        let query = { members: {$all: [userId, FriendId] } }
        const test = await convos.findOne(query)
        if(test === null){
           await convos.insertOne(newConvo)
           // return newConvo;
        }
        else{
            console.log("convo exists")
        }
     } catch(e){
          console.error(`Unable to add convo: ${e}`)
        }
    }
}