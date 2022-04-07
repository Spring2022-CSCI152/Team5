import chai, { expect } from "chai"
import chaiHttp from 'chai-http'
import { describe } from "mocha"
import request from "request"

chai.use(chaiHttp);
var expect1 = chai.expect

var id = "61ad754ace286ba11f98d240"
var url = "http://localhost:5000"
var path = '/api/v1/users/friends/'


describe("apiGetFriends",function(){
    it("Returns the friend list and number of friends that the user has when queryed by userId",function(done){
        request(url+path+"?userId="+id,function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            var res = JSON.parse(response.body)
            expect1(res.friends).is.an("array")
            expect1(res.num_friends).to.be.equal(1)
            done()
        })
    })
    it("Returns the specific friend when queryed by userId and friendUserName",function(done){
        request(url+path+"?userId="+id+"&friendUserName=gamer",function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            var res = JSON.parse(response.body)
            expect1(res.friend.user_name).to.be.equal("gamer")
            done()
        })
    })
    it("Returns the empty string when an incorrect id is queried",function(done){
        request(url+path+"?userId=lolster",function(error,response,body){
            expect1(response.statusCode).to.be.equal(500)
            var res = JSON.parse(response.body)
            expect1(res.error).is.an("string")
            done()
        })
    })
    it("Returns 400 with the message,Please query with a correct friend username, when a correct id is queried but wrong friendUserName is queried",function(done){
        request(url+path+"?userId="+id+"&friendUserName=lolster",function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("\"Please query with a correct friend username\"")
            done()
        })
    })
    it("Returns 400 with the message,Please query based on a userId., when with no queries",function(done){
        request(url+path,function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("\"Please query based on a userId.\"")
            done()
        })
    })
})

describe("apiAddFriend",function(){
    it("Successfully adds the friend and returns an object of the friend",function(done){
        var json = {
            "user_id":id,
            "friend_user_name":"lmao1"
        }
        chai
        .request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body.status).to.be.equal("success")
            expect1(response.body.friend.user_name).to.be.equal("lmao1")
            done()
        })
    })
    it("Returns a 400 error with the message, Target user could not be found, when an incorrect userId is sent",function(done){
        var json = {
            "user_id":415,
            "friend_user_name":"lmao1"
        }
        chai.request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Target user could not be found.")
            done()
        })
    })
    it("Returns a 400 error with the message, Target friend could not be found, when an incorrect friend user name is sent",function(done){
        var json = {
            "user_id":id,
            "friend_user_name":"lolseterlol"
        }
        chai.request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Target friend could not be found.")
            done()
        })
    })
    it("Returns 400 with the message, Please include user_id and friend_user_name in the body of the request., when nothing is sent",function(done){
        var json = {
        }
        chai.request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please include user_id and friend_user_name in the body of the request.")
            done()
        })
    })
})

describe("apiUpdateFriend",function(){
    it("Successfully returns the updated friend info when correct userId and friend user name are sent",function(done){
        var json = {
            "user_id":id,
            "friend_user_name":"lmao1"
        }
        chai.request(url).put(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body.status).to.be.equal("success")
            expect1(response.body.friend.user_name).to.be.equal("lmao1")
            done()
        })
    })
    it("Returns a 400 error with the message,Please include user_id and friend_user_name in the body of the request., when the json is empty",function(done){
        var json = {}
        chai.request(url).put(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please include user_id and friend_user_name in the body of the request.")
            done()
        })
    })
    it("Returns a 400 error with the message,Target user could not be found., when the userId is incorrect",function(done){
        var json = {
            "user_id":415,
            "friend_user_name":"lmao1"
        }
        chai.request(url).put(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Target user could not be found.")
            done()
        })
    })
    it("Returns a 400 error with the message,Target friend could not be found., when the friend user name is incorrect",function(done){
        var json = {
            "user_id":id,
            "friend_user_name":"lolsterlol"
        }
        chai.request(url).put(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Target friend could not be found.")
            done()
        })
    })
    
})

describe("apiDeleteFriend",function(){
    it("Succesfully deletes the friend from your friend list",function(done){
        var json ={
            "user_id":id,
            "friend_user_name":"lmao1"
        }
        chai
        .request(url).delete(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body.status).to.be.equal("success")
            done()
        })
    })
    it("Returns a 400 with the message, Target user not found., when an incorrect userId is used",function(done){
        var json ={
            "user_id":415,
            "friend_user_name":"lmao1"
        }
        chai
        .request(url).delete(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Target user not found.")
            done()
        })
    })
    it("Returns a 400 with the message, Target user is not friended with this user., when the friend username does not exist",function(done){
        var json ={
            "user_id":id,
            "friend_user_name":"lolsterlol"
        }
        chai
        .request(url).delete(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Target user is not friended with this user.")
            done()
        })
    })
    it("Returns a 400 message,Please include user_id and friend_user_name in the body of the request., when no user_id or friend user name is given",function(done){
        var json ={}
        chai
        .request(url).delete(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please include user_id and friend_user_name in the body of the request.")
            done()
        })
    })
})