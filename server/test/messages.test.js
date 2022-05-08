import chai, { expect } from "chai"
import chaiHttp from 'chai-http'
import { describe } from "mocha"
import request from "request"

chai.use(chaiHttp);
var expect1 = chai.expect

var convoId = "624e5d175385477138d8c1b2"
var id1 = "61a707daaa6b7d4a2a8b87c3"
var url = "http://localhost:5000"
var path = '/api/v1/messages/message/'

//Add test back whe nwe have updated the database with correcct conversations
describe("addNewMessage",function(){
    /*
    it("Sucessfully adds new message when sent a string in the body of the request",function(done){
        let json = {
            "conversationId":convoId,
            "senderId":id1,
            "text":"Whats good my mans?"
        }
        chai
        .request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body).to.have.keys("createdAt","updateAt","_id","sender")
            expect1(response.body.sender).to.be.equal(id1)
            done()
        })
    })
    */

    it("Returns 400 when no conversationId is given in the body of the request",function(done){
        let json = {
            "senderId":id1,
            "text":"Whats good my mans?"
        }
        chai
        .request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("No conversationId in request")
            done()
        })
    })

    it("Returns 400 when no senderId is given in the body of the request",function(done){
        let json = {
            "conversationId":convoId,
            "text":"Whats good my mans?"
        }
        chai
        .request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("No senderId in request")
            done()
        })
    })

    it("Returns 400 when no text is given in the body of the request",function(done){
        let json = {
            "conversationId":convoId,
            "senderId":id1
        }
        chai
        .request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("No text in request")
            done()
        })
    })

    it("Returns 400 when the wrong conversationId is given in the body of the request",function(done){
        let json = {
            "conversationId":"lol",
            "senderId":id1,
            "text":"Whats good my mans?"
        }
        chai
        .request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("ConversationId and senderId do not match to a conversation")
            done()
        })
    })

    it("Returns 400 when the wrong senderId is given in the body of the request",function(done){
        let json = {
            "conversationId":convoId,
            "senderId":"lol",
            "text":"Whats good my mans?"
        }
        chai
        .request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("ConversationId and senderId do not match to a conversation")
            done()
        })
    })
})

describe("getOldMessages",function(){
    it("Returns successfully when the correct convoId is given",function(done){
        let json = {
            "convoId":convoId
        }
        chai
        .request(url).get(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body).to.have.keys("_events","_eventsCount")
            done()
        })
    })

    it("Returns 400 error when no convoId is given",function(done){
        let json = {}
        chai
        .request(url).get(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("No convoId given in the request")
            done()
        })
    })

    it("Returns 200 with an empty convo when incorrect convoId is given",function(done){
        let json = {"convoId":"brother"}
        chai
        .request(url).get(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body).to.have.keys("_events","_eventsCount")
            done()
        })
    })
})