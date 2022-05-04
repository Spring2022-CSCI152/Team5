import messagesCtrl from "./messages.controller.js"
import express from "express"

const router = express.Router()


router
    .route("/message/")
    .post(messagesCtrl.addNewMessage)
    .get(messagesCtrl.getOldMessage)
   // .delete(conversationsCtrl.apiDeleteItem)
 export default router
