import express from "express"
import UsersCtrl from "./users.controller.js"
import CharacterCtrl from "./character.controller.js"
import FriendsCtrl from "./friends.controller.js"
import TasksCtrl from "./tasks.controller.js"
import InventoryCtrl from "./inventory.controller.js"

const router = express.Router()

router
    .route("/")
    .get(UsersCtrl.apiGetUsers)
    .post(UsersCtrl.apiAddUser)
    .put(UsersCtrl.apiUpdateUser)
    .delete(UsersCtrl.apiDeleteUser)

router
    .route("/character/")
    .get(CharacterCtrl.apiGetCharacter)
    .put(CharacterCtrl.apiUpdateCharacter)

router
    .route("/friends/")
    .get(FriendsCtrl.apiGetFriends)
    .post(FriendsCtrl.apiAddFriend)
    .put(FriendsCtrl.apiUpdateFriend)
    .delete(FriendsCtrl.apiDeleteFriend)

router
    .route("/tasks/")
    .get(TasksCtrl.apiGetTasks)
    .post(TasksCtrl.apiAddTask)
    .put(TasksCtrl.apiUpdateTask)
    .delete(TasksCtrl.apiDeleteTask)

router
    .route("/inventory/")
    .get(InventoryCtrl.apiGetInventory)
    .post(InventoryCtrl.apiAddItem)
    .delete(InventoryCtrl.apiDeleteItem)

export default router
