import conversationsCtrl from "./conversations.controller.js"
import express from "express"

const router = express.Router()


router
    .route("/conversation/")
    .get(conversationsCtrl.apiGetConvoOfUser)
    .post(conversationsCtrl.apiAddNewConvo)
   // .delete(conversationsCtrl.apiDeleteItem)
 export default router
