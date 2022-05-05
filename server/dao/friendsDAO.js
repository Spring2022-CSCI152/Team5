import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let users

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
}