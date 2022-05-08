import chai, { expect } from "chai"
import chaiHttp from 'chai-http'
import { describe } from "mocha"
import request from "request"

chai.use(chaiHttp);
var expect1 = chai.expect

var id = "62783c09206b6f30e8135ac3"
var taskId = ""
var url = "http://localhost:5000"
var path = '/api/v1/users/tasks/'


//Tests to add:
//Query with correct UserId and taskId
//Query with correct UserId and incorrect taskId
describe("apiGetTasks",function(){
    it("Returns the user's list of tasks when queried by a correct userId",function(done){
        request(url+path+"?userId="+id,function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            var res = JSON.parse(response.body)
            expect1(res.tasks).to.be.an("array")
            done()
        })
    })
    it("Returns the specific task when queried by a correct userId and taskName",function(done){
        request(url+path+"?userId="+id+"&taskName=Math",function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            var res = JSON.parse(response.body)
            expect1(res.task.name).to.be.equal("Math")
            done()
        })
    })
    it("Returns a 400 with the message,Please query based on a userId.,when no userId is given",function(done){
        request(url+path,function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("\"Please query based on a userId.\"")
            done()
        })
    })
    it("Returns a 500 error when an incorrect id is queried with",function(done){
        request(url+path+"?userId=61ad8bcccbe8a437facea578",function(error,response,body){
            expect1(response.statusCode).to.be.equal(500)
            done()
        })
    })
    it("Returns a 400 with the message, Please query with the correct task name or id, when queried with correct user id but incorrect task name or id",function(done){
        request(url+path+"?userId="+id+"&taskName=lmaoster",function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("\"Please query with the correct task name or id\"")
            done()
        })
    })
})

describe("apiAddTask",function(){
    it("Successfully adds a task when user id and task name are given in the post request",function(done){
        var json = {
            "user_id":id,
            "task_name":"lolsterlol"
        }
        chai
        .request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body.status).to.be.equal("success")
            taskId = response.body.task._id
            done()
        })
    })
    it("Returns a 400 with the message,Please include user_id and task_name in the body of the request., when no taskName is sent",function(done){
        var json = {"user_id":id}
        chai
        .request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please include user_id and task_name in the body of the request.")
            done()
        })
    })
    it("Returns a 400 with the message,Please include user_id and task_name in the body of the request., when no user_id is sent",function(done){
        var json = {"task_name":"lolsterlol"}
        chai
        .request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please include user_id and task_name in the body of the request.")
            done()
        })
    })
    it("Returns a 500 when the incorrect user_id is in the body of the request",function(done){
        var json = {
            "user_id":415,
            "task_name":"lolsterlol"
        }
        chai
        .request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(500)
            done()
        })
    })
    it("Returns a 400 with the message,Task has already been created., when a duplicate taskName is given",function(done){
        var json = {
            "user_id":id,
            "task_name":"Math"
        }
        chai
        .request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Task has already been created.")
            done()
        })
    })
})

describe("apiUpdateTask",function(){
    it("Returns successfully when a correct user_id, new task name, and old task name are given the put request",function(done){
        var json = {
            "user_id":id,
            "old_task_name":"lolsterlol",
            "new_task_name":"lmaoster"
        }
        chai
        .request(url).put(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body.status).to.be.equal("success")
            done()
        })
    })
    it("Returns successfully when a correct user_id, new task name, and old task name are given the put request",function(done){
        var json = {
            "user_id":id,
            "task_id":taskId,
            "new_task_name":"lmaoster1"
        }
        chai
        .request(url).put(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body.status).to.be.equal("success")
            done()
        })
    })
    it("Returns a 400 with the message,Please include user_id and either task_id or old_task_name in the body of the request., when user_id is not given",function(done){
        var json = {
            "old_task_name":"lolsterlol",
            "new_task_name":"lmaoster"
        }
        chai
        .request(url).put(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please include user_id and either task_id or old_task_name in the body of the request.")
            done()
        })
    })
    it("Returns a 400 with the message,Please include user_id and either task_id or old_task_name in the body of the request., when old_task_name or task_id is not given",function(done){
        var json = {
            "user_id":id,
            "new_task_name":"lmaoster"
        }
        chai
        .request(url).put(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please include user_id and either task_id or old_task_name in the body of the request.")
            done()
        })
    })
    it("Returns a 400 with the message,Please include new_task_name in the body of the request., when new task name is not given",function(done){
        var json = {
            "user_id":id,
            "old_task_name":"lolsterlol"
        }
        chai
        .request(url).put(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please include new_task_name in the body of the request.")
            done()
        })
    })
    it("Returns a 400 with the message,Target task already has this name., when the old task and new task name match",function(done){
        var json = {
            "user_id":id,
            "old_task_name":"Math",
            "new_task_name":"Math"
        }
        chai
        .request(url).put(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Target task already has this name.")
            done()
        })
    })
    it("Returns a 400 with the message,Target task could not be found., when the old task name does not exist",function(done){
        var json = {
            "user_id":id,
            "old_task_name":"lolsterlol1",
            "new_task_name":"lolsterlol"
        }
        chai
        .request(url).put(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Target task could not be found.")
            done()
        })
    })
    it("Returns a 400 with the message,Target task could not be found., when the task_id does not exist",function(done){
        var json = {
            "user_id":id,
            "task_id":"bruh",
            "new_task_name":"lolsterlol"
        }
        chai
        .request(url).put(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Target task could not be found.")
            done()
        })
    })
    it("Returns a 500  when the user_id does not exist",function(done){
        var json = {
            "user_id":515,
            "old_task_name":"lolsterlol",
            "new_task_name":"lolsterlol1"
        }
        chai
        .request(url).put(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(500)
            done()
        })
    })
})

describe("apiDeleteTask",function(){
    it("Successfuly deletes a task when user id and task name/task_id are given in the delete request",function(done){
        var json = {}
        if(Math.random()){
            json = {
                "user_id":id,
                "task_name":"lmaoster1"
            }
        } else {
            json = {
                "user_id":id,
                "task_id":taskId
            }
        }
        chai
        .request(url).delete(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body.status).to.be.equal("success")
            done()
        })
    })
    it("Returns a 400 with the message,Please include user_id and either task_id or task_name in the body of the request., when the user_id is not present in the request",function(done){
        var json = {
            "task_name":"lmaoster"
        }
        chai
        .request(url).delete(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please include user_id and either task_id or task_name in the body of the request.")
            done()
        })
    })
    it("Returns a 400 with the message,Please include user_id and either task_id or task_name in the body of the request., when the user_id is not present in the request",function(done){
        var json = {
            "task_id":taskId
        }
        chai
        .request(url).delete(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please include user_id and either task_id or task_name in the body of the request.")
            done()
        })
    })
    it("Returns a 400 with the message,Please include user_id and either task_id or task_name in the body of the request., when the user_id is not present in the request",function(done){
        var json = {
            "task_name":"lmaoster",
            "task_id":taskId
        }
        chai
        .request(url).delete(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please include user_id and either task_id or task_name in the body of the request.")
            done()
        })
    })
    it("Returns a 400 with the message,Please include user_id and either task_id or task_name in the body of the request., when the user_id is not present in the request",function(done){
        var json = {
            "user_id":id
        }
        chai
        .request(url).delete(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please include user_id and either task_id or task_name in the body of the request.")
            done()
        })
    })
    it("Returns a 400 with the message,Target task could not be found., when an incorrect task name is given",function(done){
        var json = {
            "user_id":id,
            "task_name":"bruhlol"
        }
        chai
        .request(url).delete(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Target task could not be found.")
            done()
        })
    })
    it("Returns a 400 with the message,Target task could not be found., when an incorrect task_id is given",function(done){
        var json = {
            "user_id":id,
            "task_id":"bruhlol"
        }
        chai
        .request(url).delete(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Target task could not be found.")
            done()
        })
    })
    it("Returns a 500  when an incorrect user_id is given",function(done){
        var json = {
            "user_id":415,
            "task_name":"Math"
        }
        chai
        .request(url).delete(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(500)
            done()
        })
    })
})