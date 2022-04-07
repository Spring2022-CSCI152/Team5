import ItemShopDAO from "../dao/itemshopDAO.js"

export default class ItemShopCtrl {
    static async apiGetItems(req, res, next) {
        const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name
        } else if (req.query.type) {
            filters.type = req.query.type
        }

        const { itemsList, totalNumItems } = await ItemShopDAO.getItems({
            filters,
            page,
            itemsPerPage,
        })

        let response = {
            items: itemsList,
            page: page,
            filters: filters,
            entries_per_page: itemsPerPage,
            total_results: totalNumItems,
        }
        res.json(response)
    }

    static async apiAddItem(req, res, next) {
        try{
            const name = req.body.name

            if(!name)
            {
                res.status(400).json("Please include name, type, and cost.")
                return
            }

            let filters = {}
            filters.name = name
            const oldItem = await ItemShopDAO.getItems({filters})
            if (oldItem.totalNumItems > 0) {
                res.status(400).json({ message: "Item already exists." })
                return
            }

            const type = req.body.type
            const cost = parseInt(req.body.cost, 10)
            const date = new Date()

            if(!type || !cost)
            {
                res.status(400).json("Please include name, type, and cost.")
                return
            }

            const result = await ItemShopDAO.addItem(
                name,
                type,
                cost,
                date
            )

            res.json({ result })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateItem(req, res, next) {
        try {

            const itemId = req.body.id
            let itemInfo = {}
            if(req.body.name) {
                itemInfo.name = req.body.name
            }
            if (req.body.type) {
                itemInfo.type = req.body.type
            }
            if (req.body.cost) {
                itemInfo.cost = parseInt(req.body.cost, 10)
            }

            const itemUpdateResponse = await ItemShopDAO.updateItem(
                itemId,
                itemInfo
            )

            var { error } = itemUpdateResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (itemUpdateResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update item - id may be incorrect"
                )
            }

            res.json({ item: itemUpdateResponse.itemList[0], status: "success" })
            
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteItem(req, res, next) {
        try {
            const itemId = req.body.id
            if (!itemId)  {
                res.status(400).json({ error: "Please use the item id for deletion" });
            } else {
                const itemDeleteResponse = await ItemShopDAO.deleteItem (
                    itemId
                )
                res.json({ status: "success" })
            }
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}