import groupCTRL from "./groupup.controller.js"
import express from "express"

const router = express.Router()



router
    .route("/group/")
    .get(groupCTRL.apiGetGroup)
    .post(groupCTRL.apiAddGroup)
    .delete(groupCTRL.apiDeleteGroup)
export default router