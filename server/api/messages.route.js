import messagesCtrl from "./messages.controller.js"
import express from "express"

const router = express.Router()


router
    .route("/message/")
    .get(messagesCtrl.getOldMessage)
    .post(messagesCtrl.addNewMessage)
   // .delete(conversationsCtrl.apiDeleteItem)
 export default router
