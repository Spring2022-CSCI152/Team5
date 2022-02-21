import TasksDAO from "../dao/tasksDAO.js"
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

export default class TasksCtrl {
    static async apiGetTasks(req, res, next) {
        try{
            let userId
            if (req.query.userId) {
                userId = req.query.userId
            } else {
                res.status(400).json("Please query based on a userId.")
                return
            }

            let daoResponse = await TasksDAO.getTasks(userId)

            const user = daoResponse.user[0];
            let tasksList = user.tasks
            let totalNumTasks = tasksList.length
            let response

            if (req.query.taskId) {
                let taskId = req.query.taskId
                for (var i = 0; i < tasksList.length; i++)
                {
                    if(tasksList[i]._id.valueOf() == taskId)
                    {
                        response = {
                            task: tasksList[i]
                        }
                        break
                    }
                }
            } else if (req.query.taskName) {
                let taskName = req.query.taskName
                for (var i = 0; i < tasksList.length; i++)
                {
                    if(tasksList[i].name == taskName)
                    {
                        response = {
                            task: tasksList[i]
                        }
                        break
                    }
                }
            } else {
                response = {
                    tasks: tasksList,
                    num_tasks: totalNumTasks
                }
            }
            res.json(response)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiAddTask(req, res, next) {
        try{
            let userId
            let newTaskName
            if(req.body.user_id && req.body.task_name) {
                userId = req.body.user_id
                newTaskName = req.body.task_name
            } else {
                res.status(400).json("Please include user_id and task_name in the body of the request.")
                return
            }

            const userResult = await TasksDAO.getTasks(userId)

            let user = userResult.user[0]
            let tasksList = user.tasks
            let taskExists = false

            for (var i = 0; i < tasksList.length; i++)
            {
                if(tasksList[i].name == newTaskName)
                {
                    taskExists = true
                    break
                }
            }

            if(taskExists) {
                res.status(400).json("Task has already been created.")
                return
            }

            let newTask = {}
            newTask._id = ObjectId()
            newTask.name = newTaskName

            tasksList.push(newTask)

            const response = await TasksDAO.updateUsersTasks(userId, tasksList)

            res.json({ task: newTask, status: "success", response })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateTask(req, res, next) {
        try{
            let userId
            let taskId
            let oldTaskName
            let newTaskName

            if (req.body.user_id && req.body.task_id) {
                userId = req.body.user_id
                taskId = req.body.task_id
            } else if (req.body.user_id && req.body.old_task_name) {
                userId = req.body.user_id
                oldTaskName = req.body.old_task_name
            } else {
                res.status(400).json("Please include user_id and either task_id or old_task_name in the body of the request.")
                return
            }

            if (req.body.new_task_name) {
                newTaskName = req.body.new_task_name
            } else {
                res.status(400).json("Please include new_task_name in the body of the request.")
                return
            }

            const userResult = await TasksDAO.getTasks(userId)

            let user = userResult.user[0]
            let tasksList = user.tasks
            let taskExists = false
            let task

            if (taskId) {
                for (var i = 0; i < tasksList.length; i++)
                {
                    if (tasksList[i]._id.valueOf() == taskId)
                    {
                        if (tasksList[i].name == newTaskName) {
                            res.status(400).json("Target task already has this name.")
                            return
                        }
                        tasksList[i].name = newTaskName
                        taskExists = true
                        task = tasksList[i]
                        break
                    }
                }
            } else if (oldTaskName) {
                for (var i = 0; i < tasksList.length; i++)
                {
                    if( tasksList[i].name == oldTaskName)
                    {
                        if (tasksList[i].name == newTaskName) {
                            res.status(400).json("Target task already has this name.")
                            return
                        }
                        tasksList[i].name = newTaskName
                        taskExists = true
                        task = tasksList[i]
                        break
                    }
                }
            }
            
            if (!taskExists) {
                res.status(400).json("Target task could not be found.")
                return
            }

            const response = await TasksDAO.updateUsersTasks(userId, tasksList)

            res.json({ task, status: "success", response })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteTask(req, res, next) {
        try{
            let userId
            let taskId
            let taskName
            if (req.body.user_id && req.body.task_id) {
                userId = req.body.user_id
                taskId = req.body.task_id
            } else if (req.body.user_id && req.body.task_name) {
                userId = req.body.user_id
                taskName = req.body.task_name
            } else {
                res.status(400).json("Please include user_id and either task_id or task_name in the body of the request.")
                return
            }

            const userResult = await TasksDAO.getTasks(userId)

            let user = userResult.user[0]
            let tasksList = user.tasks
            let taskExists = false

            if (taskId) {
                for (var i = 0; i < tasksList.length; i++)
                {
                    if(tasksList[i]._id.valueOf() == taskId)
                    {
                        tasksList.splice(i, 1)
                        taskExists = true
                        break
                    }
                }
            } else if (taskName) {
                for (var i = 0; i < tasksList.length; i++)
                {
                    if(tasksList[i].name == taskName)
                    {
                        tasksList.splice(i, 1)
                        taskExists = true
                        break
                    }
                }
            }

            if(!taskExists) {
                res.status(400).json("Target task could not be found.")
                return
            }

            const response = await TasksDAO.updateUsersTasks(userId, tasksList)

            res.json({ status: "success", response })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}