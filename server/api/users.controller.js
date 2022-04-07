import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UsersDAO from "../dao/usersDAO.js"

const secret = 'test';

export default class UsersCtrl {
    static async apiGetUsers(req, res, next) {
        const usersPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.userName) {
            filters.user_name = req.query.userName
        } else if (req.query.id) {
            filters.id = req.query.id
        }

        const { usersList, totalNumUsers } = await UsersDAO.getUsers({
            filters,
            page,
            usersPerPage,
        })

        let response = {
            users: usersList,
            page: page,
            filters: filters,
            entries_per_page: usersPerPage,
            total_results: totalNumUsers,
        }
        res.json(response)
    }

    static async apiAddUser(req, res, next) {
        try{
            const userName = req.body.user_name

            let filters = {}
            filters.user_name = userName
            const oldUser = await UsersDAO.getUsers({filters})
            if (oldUser.totalNumUsers > 0) {
                res.status(400).json({ message: "Username already taken." })
                return
            }

            const password = req.body.password
            const charName = req.body.char_name
            const date = new Date()

            const hashedPassword = await bcrypt.hash(password, 12);

            const result = await UsersDAO.addUser(
                userName,
                hashedPassword,
                charName,
                date
            )

            const token = jwt.sign( { Username: result.user_name, id: result._id }, secret, { expiresIn: "1h" } );

            res.json({ result, token })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateUser(req, res, next) {
        try {
            const auth = req.body.auth ? parseInt(req.body.auth, 10) : 0

            if (auth) {

                if(!req.body.user_name || !req.body.password) {
                    res.status(400).json({ message: "Please use username and password in the body of the request" })
                }
                let filters = {}
                filters.user_name = req.body.user_name
                const oldUser = (await UsersDAO.getUsers({filters})).usersList[0]
                if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
                const isPasswordCorrect = await bcrypt.compare(req.body.password, oldUser.password);
                if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
                const token = jwt.sign({ Username: oldUser.user_name, id: oldUser._id }, secret, { expiresIn: "1h" });
                res.status(200).json({ result: oldUser, token }); 

            } else {
                
                const userId = req.body.id
                let userInfo = {}
                if(req.body.user_name) {
                    userInfo.user_name = req.body.user_name
                }
                if (req.body.password) {
                    userInfo.password = req.body.password
                }

                const userUpdateResponse = await UsersDAO.updateUser(
                    userId,
                    userInfo
                )

                var { error } = userUpdateResponse
                if (error) {
                    res.status(400).json({ error })
                }

                if (userUpdateResponse.modifiedCount === 0) {
                    throw new Error(
                        "unable to update user - id may be incorrect"
                    )
                }

                res.json({ status: "success" })
            }
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteUser(req, res, next) {
        try {
            const userId = req.body.id
            if (!userId)  {
                res.status(400).json({ error: "Please use the user id for deletion" });
            } else {
                const userDeleteResponse = await UsersDAO.deleteUser (
                    userId
                )
                res.json({ status: "success" })
            }
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}