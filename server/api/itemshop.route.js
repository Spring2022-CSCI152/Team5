import express from "express"
import ItemShopCtrl from "./itemshop.controller.js"

const router = express.Router()

router
    .route("/")
    .get(ItemShopCtrl.apiGetItems)
    .post(ItemShopCtrl.apiAddItem)
    .put(ItemShopCtrl.apiUpdateItem)
    .delete(ItemShopCtrl.apiDeleteItem)

export default router
