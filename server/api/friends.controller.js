import FriendsDAO from "../dao/friendsDAO.js"
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

export default class FriendsCtrl {
    static async apiGetFriends(req, res, next) {
        try{
            let userId
            if (req.query.userId) {
                userId = req.query.userId
            } else {
                res.status(400).json("Please query based on a userId.")
                return
            }

            let daoResponse = await FriendsDAO.getFriends(userId)

            const user = daoResponse.user[0];
            let friendsList = user.friends_list.friends
            let totalNumFriends = user.friends_list.num_friends
            let response

            if (req.query.friendUserName) {
                let friendUserName = req.query.friendUserName
                for (var i = 0; i < friendsList.length; i++)
                {
                    if(friendsList[i].user_name == friendUserName)
                    {
                        response = {
                            friend: friendsList[i]
                        }
                        break
                    }
                }
            } else {
                response = {
                    friends: friendsList,
                    num_friends: totalNumFriends
                }
            }
            
            res.json(response)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiAddFriend(req, res, next) {
        try{
            let userId
            let friendUserName
            if(req.body.user_id && req.body.friend_user_name) {
                userId = req.body.user_id
                friendUserName = req.body.friend_user_name
            } else {
                res.status(400).json("Please include user_id and friend_user_name in the body of the request.")
                return
            }

            const userResult = await FriendsDAO.getFriends(userId)
            const friendResult = await FriendsDAO.getFriendsByUsername(friendUserName)

            let user = userResult.user[0]
            if(!user)
            {
                res.status(400).json("Target user could not be found.")
                return
            }
            let friend = friendResult.user[0]
            if(!friend)
            {
                res.status(400).json("Target friend could not be found.")
                return
            }
            let friendsList = user.friends_list.friends
            let friendExists = false

            if (userId.toString() == friend._id.toString())
            {
                res.status(400).json("Cannot have a user friend themself.")
                return
            }

            for (var i = 0; i < friendsList.length; i++)
            {
                if(friendsList[i]._id.toString() == friend._id.toString())
                {
                    friendExists = true
                }
            }

            if(friendExists) {
                res.status(400).json("Target user is already friended with this user.")
                return
            }

            let friendInfo = {}
            friendInfo._id = friend._id
            friendInfo.user_name = friend.user_name
            friendInfo.character = friend.character
            user.friends_list.friends.push(friendInfo)
            user.friends_list.num_friends = user.friends_list.num_friends + 1

            const newFriendsList = user.friends_list

            const response = await FriendsDAO.updateUsersFriends(userId, newFriendsList)

            res.json({ friend: friendInfo, status: "success", response })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateFriend(req, res, next) {
        try{
            let userId
            let friendUserName
            if(req.body.user_id && req.body.friend_user_name) {
                userId = req.body.user_id
                friendUserName = req.body.friend_user_name
            } else {
                res.status(400).json("Please include user_id and friend_user_name in the body of the request.")
                return
            }

            const userResult = await FriendsDAO.getFriends(userId)
            const friendResult = await FriendsDAO.getFriendsByUsername(friendUserName)

            let user = userResult.user[0]
            if(!user)
            {
                res.status(400).json("Target user could not be found.")
                return
            }
            let friend = friendResult.user[0]
            if(!friend)
            {
                res.status(400).json("Target friend could not be found.")
                return
            }
            let friendsList = user.friends_list.friends
            let newFriendInfo = {}
            newFriendInfo._id = friend._id
            newFriendInfo.user_name = friend.user_name
            newFriendInfo.character = friend.character

            for (var i = 0; i < friendsList.length; i++)
            {
                if(friendsList[i]._id.toString() == friend._id.toString())
                {
                    user.friends_list.friends[i] = newFriendInfo
                    break
                }
            }

            const newFriendsList = user.friends_list

            const response = await FriendsDAO.updateUsersFriends(userId, newFriendsList)

            res.json({ friend: newFriendInfo, status: "success", response })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteFriend(req, res, next) {
        try{
            let userId
            let friendUserName
            if(req.body.user_id && req.body.friend_user_name) {
                userId = req.body.user_id
                friendUserName = req.body.friend_user_name
            } else {
                res.status(400).json("Please include user_id and friend_user_name in the body of the request.")
                return
            }

            const userResult = await FriendsDAO.getFriends(userId)
            
            let user = userResult.user[0]
            let friendsList = user.friends_list.friends
            let friendExists = false
            
            for (var i = 0; i < friendsList.length; i++)
            {
                if(friendsList[i].user_name == friendUserName)
                {
                    friendsList.splice(i, 1)
                    friendExists = true
                    break
                }
            }

            if(!friendExists) {
                res.status(400).json("Target user is not friended with this user.")
                return
            }

            user.friends_list.num_friends = user.friends_list.num_friends - 1

            const newFriendsList = user.friends_list

            const response = await FriendsDAO.updateUsersFriends(userId, newFriendsList)

            res.json({ status: "success", response })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}