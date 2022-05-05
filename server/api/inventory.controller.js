import InventoryDAO from "../dao/inventoryDAO.js"
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

export default class InventoryCtrl {
    static async apiGetInventory(req, res, next) {
        try{
            let userId
            if (req.query.userId) {
                userId = req.query.userId
            } else {
                res.status(400).json("Please query based on a userId.")
                return
            }

            let daoResponse = await InventoryDAO.getInventory(userId)

            const user = daoResponse.user[0];
            let inventory = user.character.inventory
            let totalNumItems = inventory.length
            let response

            if (req.query.name) {
                let name = req.query.name
                for (var i = 0; i < inventory.length; i++)
                {
                    if(inventory[i].name == name)
                    {
                        response = {
                            item: inventory[i]
                        }
                        break
                    }
                }
            } else {
                response = {
                    items: inventory,
                    num_items: totalNumItems
                }
            }
            
            res.json(response)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiAddItem(req, res, next) {
        try{
            let userId
            let itemId
            if(req.body.user_id && req.body.item_id) {
                userId = req.body.user_id
                itemId = req.body.item_id
            } else {
                res.status(400).json("Please include user_id and item_id in the body of the request.")
                return
            }

            const userResult = await InventoryDAO.getInventory(userId)
            const itemResult = await InventoryDAO.getItemFromShop(itemId)

            let user = userResult.user[0]
            if(!user)
            {
                res.status(400).json("Target user could not be found.")
                return
            }
            let item = itemResult.item[0]
            if(!item)
            {
                res.status(400).json("Target item could not be found.")
                return
            }
            let inventory = user.character.inventory
            let itemExists = false

            for (var i = 0; i < inventory.length; i++)
            {
                if(inventory[i]._id.toString() == item._id.toString())
                {
                    itemExists = true
                    break
                }
            }

            if(itemExists) {
                res.status(400).json("Target item is already in the user's inventory.")
                return
            }

            user.character.inventory.push(item)

            const newCharacter = user.character

            const response = await InventoryDAO.updateUsersCharacter(userId, newCharacter)

            res.json({ item, status: "success", response })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteItem(req, res, next) {
        try{
            let userId
            let itemId
            if(req.body.user_id && req.body.item_id) {
                userId = req.body.user_id
                itemId = req.body.item_id
            } else {
                res.status(400).json("Please include user_id and item_id in the body of the request.")
                return
            }

            const userResult = await InventoryDAO.getInventory(userId)
            
            let user = userResult.user[0]
            let inventory = user.character.inventory
            let itemExists = false
            
            for (var i = 0; i < inventory.length; i++)
            {
                if(inventory[i]._id.toString() == itemId)
                {
                    user.character.inventory.splice(i, 1)
                    itemExists = true
                    break
                }
            }

            if(!itemExists) {
                res.status(400).json("Target item not found in user's inventory.")
                return
            }

            const newCharacter = user.character

            const response = await InventoryDAO.updateUsersCharacter(userId, newCharacter)

            res.json({ status: "success", response })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}
