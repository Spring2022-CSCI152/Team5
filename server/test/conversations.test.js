import chai, { expect } from "chai"
import chaiHttp from 'chai-http'
import { describe } from "mocha"
import request from "request"

chai.use(chaiHttp);
var expect1 = chai.expect

var id1 = "62783c09206b6f30e8135ac3"
var id2 = "62783d02aeab4bd3e8de9e53"
var url = "http://localhost:5000"
var path = '/api/v1/conversations/conversation/'

describe("apiAddNewConvo",function(){
    it("Returns successfully with convo when given correct sender and reciever id",function(done){
        var json = {
            "senderId":id1,
            "recieverId":id2
        }
        chai
        .request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body).to.have.keys("members","createdAt","updatedAt","_id")
            done()
        })
    })

    it("Returns 400 when no sender id is given",function(done){
        var json = {
            "recieverId":id2
        }
        chai
        .request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("No senderId or recieverId given")
            done()
        })
    })

    it("Returns 400 when no reciever id is given",function(done){
        var json = {
            "senderId":id1
        }
        chai
        .request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("No senderId or recieverId given")
            done()
        })
    })

    it("Returns 400 when the wrong senderId is given",function(done){
        var json = {
            "senderId":"lolsterlol",
            "recieverId":id2
        }
        chai
        .request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Wrong senderId and/or recieverId")
            done()
        })
    })

    it("Returns 400 when the wrong recieverId is given",function(done){
        var json = {
            "senderId":id1,
            "recieverId":"lolsterlol"
        }
        chai
        .request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Wrong senderId and/or recieverId")
            done()
        })
    })

    it("Returns 400 when empty object is sent",function(done){
        var json = {}
        chai
        .request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("No senderId or recieverId given")
            done()
        })
    })
})

describe("apiGetConvoOfUser",function(){
    it("Returns successfully with convo when queried with correct userId",function(done){
        request(url+path+"?userId="+id1,function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            var json =  JSON.parse(response.body)
            expect1(json[0]).to.have.keys("_id","members","createdAt","updatedAt")
            done()
        })
    })

    it("Returns 400 with the message No userId given when no userId query is present",function(done){
        request(url+path,function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("\"No userId given\"")
            done()
        })
    })

    it("Returns 200 with an empty response when the wrong userId is given",function(done){
        request(url+path+"?userId=lolsterlol",function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body).to.be.equal("[]")
            done()
        })
    })

})