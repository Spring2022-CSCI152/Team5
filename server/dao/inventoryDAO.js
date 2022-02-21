import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let users
let itemshop

export default class InventoryDAO {
    static async injectDB(conn) {
        if (users & itemshop) {
            return
        }
        try {
            users = await conn.db(process.env.USERINFO_NS).collection("users")
            itemshop = await conn.db(process.env.USERINFO_NS).collection("itemshop")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in inventoryDAO: ${e}`,
            )
        }
    }

    static async getInventory(userId) {
        let query = { "_id": ObjectId(userId) }

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

    static async getItemFromShop(itemId) {
        let query = { "_id": ObjectId(itemId) }

        let cursor

        try {
            cursor = await itemshop.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, $(e)`)
            return { item: [] }
        }

        const displayCursor = cursor.limit(1).skip(0)

        try {
            const item = await displayCursor.toArray()

            return { item }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { item: [] }
        }
    }

    static async updateUsersCharacter(userId, newCharacter) {
        try {
            let updateResponse = await users.updateOne(
                { _id: ObjectId(userId) },
                { $set: { character: newCharacter } }
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to add user: ${e}`)
            return { error: e }
        }
    }
}
