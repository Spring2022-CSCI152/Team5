import chai, { expect } from "chai"
import chaiHttp from 'chai-http'
import { describe } from "mocha"
import request from "request"

chai.use(chaiHttp);
var expect1 = chai.expect

var id = ""
var username = "brother17"
var url = "http://localhost:5000"
var path = '/api/v1/users/'

describe("apiGetUsers", function() {
    it("Returns user with same user_name when queryed with user_name", function(done){
        request(url+path+"?userName=brother17",function(error,response,body) {
            expect1(response.statusCode).to.equal(200)
            var json = JSON.parse(response.body)
            expect1(json.users[0]["user_name"]).to.equal("brother17")
            done()
        })

    })
    it("Returns user with same _id when queryed by id",function(done){
        request(url+path+"?id=62783c09206b6f30e8135ac3",function(error,response,body) {
            expect1(response.statusCode).to.equal(200)
            var json = JSON.parse(response.body)
            expect1(json.users[0]["_id"]).to.equal("62783c09206b6f30e8135ac3")
            done()
        }) 
    })
    it("Returns a list of all the users when queryed by Page, with the new page number applied", function(done){
        request(url+path+"?page=1",function(error,response,body) {
            expect1(response.statusCode).to.equal(200)
            var json = JSON.parse(response.body)
            expect1(json.users).to.be.an("array")
            expect1(json.page).to.be.equal(1)
            done()
        })
    })
    it("Returns a list of all the users when queryed by Page as a string, page attribute is null", function(done){
        request(url+path+"?page=lmao",function(error,response,body) {
            expect1(response.statusCode).to.equal(200)
            var json = JSON.parse(response.body)
            expect1(json.users).to.be.an("array")
            expect1(json.page).to.be.equal(null)
            done()
        })
    })
    it("Returns a list of all the users when queryed by itemsPerPage, with the correct users per page applied", function(done){
        request(url+path+"?itemsPerPage=25",function(error,response,body) {
            expect1(response.statusCode).to.equal(200)
            var json = JSON.parse(response.body)
            expect1(json.users).to.be.an("array")
            expect1(json.entries_per_page).to.be.equal(25)
            done()
        })
    })
    it("Returns a list of all the users when queryed by itemsPerPage as a string, entries_per_page attribute is null", function(done){
        request(url+path+"?itemsPerPage=lmao",function(error,response,body) {
            expect1(response.statusCode).to.equal(200)
            var json = JSON.parse(response.body)
            expect1(json.users).to.be.an("array")
            expect1(json.entries_per_page).to.be.equal(null)
            done()
        })
    })
    it("Returns a list of all the users with no queries",function(done){
        request(url+path,function(error,response,body){
            expect1(response.statusCode).to.equal(200)
            var json = JSON.parse(response.body)
            expect1(json.users).to.be.an("array")
            done()
        })
    })
    it("Returns 200 with full users list when queryed with incorrect user_name", function(done){
        request(url+path+"?userName=Johnlol",function(error,response,body) {
            expect1(response.statusCode).to.equal(200)
            var json = JSON.parse(response.body)
            expect1(json.users).to.be.an("array")
            done()
        })

    })
    
    it("Returns 200 with full users list when queryed by incorrect id",function(done){
        request(url+path+"?id=415",function(error,response,body) {
            expect1(response.statusCode).to.equal(200)
            var json = JSON.parse(response.body)
            expect1(json.users).to.be.an("array")
            done()
        })
    })
    it("Returns user with same user_name when queryed with user_name and an incorrect id", function(done){
        request(url+path+"?userName=brother17&id=lolster",function(error,response,body) {
            expect1(response.statusCode).to.equal(200)
            var json = JSON.parse(response.body)
            expect1(json.users[0]["user_name"]).to.equal("brother17")
            done()
        })

    })
})

describe("apiAddUser",function() {
    it("Returns the new users token when they are added if they are a new user, else it says username taken",function(done){
        var requestStr = {"user_name":"lmao1","password":"aybruh1","char_name":"lmaoster"}
        chai
            .request(url).post('/api/v1/users')
            .set('content-type',"application/json").send(requestStr).end(function(error,response,body){
                expect1(response.statusCode).to.equal(200)
                expect1(response.body.result.user_name).to.be.equal("lmao1")    
                id = response.body.result._id
                done()
            })
    })
    it("Returns a 400 with the message, Username already taken., when the username given is already in the database",function(done){
        var request = {
            "user_name":"brother17",
            "password":"lolster",
            "char_name":"bruh"
        }
        chai.request(url).post("/api/v1/users")
        .set("content-type","application/json").send(request).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Username already taken.")
            done()
        })
    })
    it("Returns a 400 with the message,Please enter a username,password, and a character name., when a username is not given",function(done){
        var request = {
            "password":"lolster",
            "char_name":"bruh"
        }
        chai.request(url).post("/api/v1/users")
        .set("content-type","application/json").send(request).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please enter a username,password, and a character name.")
            done()
        })
    })
    it("Returns a 400 with the message,Please enter a username,password, and a character name., when a password is not given",function(done){
        var request = {
            "user_name":"lolster",
            "char_name":"bruh"
        }
        chai.request(url).post("/api/v1/users")
        .set("content-type","application/json").send(request).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please enter a username,password, and a character name.")
            done()
        })
    })
    it("Returns a 400 with the message,Please enter a username,password, and a character name., when a character name is not given",function(done){
        var request = {
            "password":"lolster",
            "user_name":"bruh"
        }
        chai.request(url).post("/api/v1/users")
        .set("content-type","application/json").send(request).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please enter a username,password, and a character name.")
            done()
        })
    })
    it("Returns a 400 with the message,Please enter a username,password, and a character name., when nothing given",function(done){
        var request = {}
        chai.request(url).post("/api/v1/users")
        .set("content-type","application/json").send(request).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please enter a username,password, and a character name.")
            done()
        })
    })
})

describe("apiUpdateUser",function(){
    it("Successfully authorizes the user when correct username and password combination are entered with auth set to 1",function(done){
        var request =  {user_name:"brother17",password:"aybruh1",auth:"1"}
        chai
            .request(url).put('/api/v1/users')
            .set("content-type","application/json").send(request).end(function(error,response,body){
                expect1(response.statusCode).to.equal(200)
                expect1(response.body.result.user_name).to.be.equal("brother17")
                done()
            })
    })
    it("Returns 400 with message, Please use username and password in the body of the request, when no password is given",function(done){
        var request =  {user_name:"brother17",auth:"1"}
        chai
            .request(url).put('/api/v1/users')
            .set("content-type","application/json").send(request).end(function(error,response,body){
                expect1(response.statusCode).to.equal(400)
                expect1(response.body.message).to.be.equal("Please use username and password in the body of the request")
                done()
            })
    })
    it("Returns 400 with message, Please use username and password in the body of the request, when no username is given",function(done){
        var request =  {"password":"aybruh1",auth:"1"}
        chai
            .request(url).put('/api/v1/users')
            .set("content-type","application/json").send(request).end(function(error,response,body){
                expect1(response.statusCode).to.equal(400)
                expect1(response.body.message).to.be.equal("Please use username and password in the body of the request")
                done()
            })
    })
    it("Returns 400 with message, Invalid credentials, when incorrect credentials are used",function(done){
        var request =  {"user_name":"brother17","password":"aybru","auth":"1"}
        chai
            .request(url).put('/api/v1/users')
            .set("content-type","application/json").send(request).end(function(error,response,body){
                expect1(response.statusCode).to.equal(400)
                expect1(response.body.message).to.be.equal("Invalid credentials")
                done()
            })
    })
    it("Returns 404 with message, User doesn't exist, when incorrect user_name is given",function(done){
        var request =  {"user_name":"brotherllama","password":"aybruh1","auth":"1"}
        chai
            .request(url).put('/api/v1/users')
            .set("content-type","application/json").send(request).end(function(error,response,body){
                expect1(response.statusCode).to.equal(404)
                expect1(response.body.message).to.be.equal("User doesn't exist")
                done()
            })
    })
    it("Successfully allows user to update username and password when user id,new username,and new password are passed",function(done){
        var request = {"user_name":"lolster","password":"ay1","id":id}
        chai
        .request(url).put('/api/v1/users')
        .set("content-type","application/json").send(request).end(function(error,response,body){
            expect1(response.statusCode).to.equal(200)
            expect1(response.body.status).to.be.equal("success")
            done()
        })
    })
    it("Returns 500 when user id and new username are passed",function(done){
        var request = {"user_name":"lolster","id":id}
        chai
        .request(url).put('/api/v1/users')
        .set("content-type","application/json").send(request).end(function(error,response,body){
            expect1(response.statusCode).to.equal(500)
            done()
        })
    })
    it("Returns 500 when user id and new password are passed",function(done){
        var request = {"password":"ay1","id":id}
        chai
        .request(url).put('/api/v1/users')
        .set("content-type","application/json").send(request).end(function(error,response,body){
            expect1(response.statusCode).to.equal(500)
            done()
        })
    })
    it("Returns 500 when only userId is passed",function(done){
        var request = {"id":id}
        chai
        .request(url).put('/api/v1/users')
        .set("content-type","application/json").send(request).end(function(error,response,body){
            expect1(response.statusCode).to.equal(500)
            done()
        })
    })
    it("Returns a 500 when empty object is sent in request",function(done){
        var request = {}
        chai
        .request(url).put('/api/v1/users')
        .set("content-type","application/json").send(request).end(function(error,response,body){
            expect1(response.statusCode).to.equal(500)
            done()
        })
    })
})

describe("apiDeleteUser",function(){
    it("Deletes user when id is passed through",function(done){
        var request = {"id":id}
        chai
        .request(url).delete('/api/v1/users')
        .set("content-type","application/json").send(request).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body.status).to.be.equal("success")
            done()
        })
    })
    it("Returns a 400 with the message,Please use the user id for deletion, when no userId is passed",function(done){
        var request = {}
        chai
        .request(url).delete('/api/v1/users')
        .set("content-type","application/json").send(request).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please use the user id for deletion")
            done()
        })
    })
    it("Returns a 400 with the message,Please use a correct user id., when the incorrect userId is passed",function(done){
        var request = {"id":415}
        chai
        .request(url).delete('/api/v1/users')
        .set("content-type","application/json").send(request).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please use a correct user id.")
            done()
        })
    })
})