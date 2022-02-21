import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let users

export default class UsersDAO {
    static async injectDB(conn) {
        if (users) {
            return
        }
        try {
            users = await conn.db(process.env.USERINFO_NS).collection("users")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in usersDAO: ${e}`,
            )
        }
    }

    static async getUsers({
        filters = null,
        page = 0,
        usersPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("user_name" in filters) {
                query = { $text: { $search: filters["user_name"] } }
            } else if ("id" in filters) {
                query = { "_id": ObjectId(filters["id"]) }
            }
        }

        let cursor

        try {
            cursor = await users.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, $(e)`)
            return { usersList: [], totalNumUsers: 0 }
        }

        const displayCursor = cursor.limit(usersPerPage).skip(usersPerPage * page)

        try {
            const usersList = await displayCursor.toArray()
            const totalNumUsers = await users.countDocuments(query)

            return { usersList, totalNumUsers }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { usersList: [], totalNumUsers: 0 }
        }
    }

    static async addUser(userName, password, charName, date) {
        try {
            const userDoc = {
                user_name: userName,
                password: password,
                friends_list: {
                    num_friends: 0,
                    friends: []
                },
                character: {
                    char_name: charName,
                    stats: {
                        level: 1,
                        current_xp: 0,
                        xp_to_next_level: 100,
                        max_hp: 10,
                        current_hp: 10,
                        gold: 0
                    },
                    inventory: []
                },
                tasks: [],
                date_created: date
            }

            await users.insertOne(userDoc)

            return userDoc
        } catch (e) {
            console.error(`Unable to add user: ${e}`)
            return { error: e }
        }
    }

    static async updateUser(userId, userInfo) {
        try {
            let updateResponse
            if(userInfo.user_name && userInfo.password) {
                updateResponse = await users.updateOne(
                    { _id: ObjectId(userId) },
                    { $set: { user_name: userInfo.user_name, password: userInfo.password } }
                )
            } else if (userInfo.user_name) {
                updateResponse = await users.updateOne(
                    { _id: ObjectId(userId) },
                    { $set: { user_name: userInfo.user_name } }
                )
            } else if (userInfo.password) {
                updateResponse = await users.updateOne(
                    { _id: ObjectId(userId) },
                    { $set: { password: userInfo.password } }
                )
            }

            return updateResponse
        } catch (e) {
            console.error(`Unable to update user: ${e}`)
            return { error: e }
        }
    }

    static async deleteUser(userId) {
        try {
            const deleteResponse = await users.deleteOne({
                _id: ObjectId(userId)
            })

            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete user: ${e}`)
            return { error: e }
        }
    }
}