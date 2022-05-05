import notifyCTRL from "./notify.controller.js"
import express from "express"

const router = express.Router()



router
    .route("/noti/")
    .get(notifyCTRL.apiGetNoti)
    .post(notifyCTRL.apiPostNoti)
    .delete(notifyCTRL.apiDeleteNoti)
export default router