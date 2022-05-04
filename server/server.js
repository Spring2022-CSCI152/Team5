import express from "express"
import cors from "cors"
import users from "./api/users.route.js"
import itemshop from "./api/itemshop.route.js"
import conversation from "./api/conversations.route.js"
import message from "./api/messages.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/conversations", conversation);
app.use("/api/v1/messages", message);
app.use("/api/v1/users", users)
app.use("/api/v1/itemshop", itemshop)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app