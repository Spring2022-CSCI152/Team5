import messagesCtrl from "./messages.controller.js"
import express from "express"

const router = express.Router()


router
    .route("/message/")
    .get(messagesCtrl.addNewMessage)
    .post(messagesCtrl.getOldMessage)
   // .delete(conversationsCtrl.apiDeleteItem)
 export default router
