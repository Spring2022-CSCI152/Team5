import chai, { expect } from "chai"
import chaiHttp from "chai-http"
import pkg from 'request';
const { RequestCallback } = pkg;
import { describe } from "mocha"
import request from "request"
import sinon from "sinon"

var expect1 = chai.expect

chai.use(chaiHttp)

var id1 = "61ad8bcccbe8a437facea52e"
var id2 = "61a707daaa6b7d4a2a8b87c3"

describe("apiGetChat",function() {
    it("Gets the correct conversation given the correct userIds",function(done){
        let obj = {"ids":[id1,id2]}
        let result = {"ids":[id1,id2],
                "messages":
                [{"id":id1,"message":"Hey, how are you?"},{"id":id2,"message":"I am doing great!"}]
            }
        sinon.stub(request,"get").yields(null,null,result)
        async function lol(callback){
            request.get("http://localhost:5000/api/v1/chat/?userIds="+obj).end(function(error,response,body){
            if(error){
                callback(error)
            } else {
                callback(null,body)
            }
            expect1(body,result)
        })
        } 
        lol(RequestCallback)
        request.get.restore()
        done()
    })
    it("Returns an error message in the body when incorrect ids are used in the query",function(done){
        let obj = {"ids":[id1,"lmao"]}
        let result = {"error":"Incorrect ids used"}
        sinon.stub(request,"get").yields(null,null,result)
        async function lol(callback){
            request.get("http://localhost:5000/api/v1/chat/?userIds="+obj).end(function(error,response,body){
            if(error){
                callback(error)
            } else {
                callback(null,body)
            }
            expect1(body,result)
        })
        } 
        lol(RequestCallback)
        request.get.restore()
        done()
    })
})

describe("apiSendChat",function(){
    it("Adds message to the current conversation given a message and correct user ids and returns the updated conversation",function(done){
        let obj = {"ids":[id1,id2],"id":id1,"message":"Epic!"}
        let result = {"ids":[id1,id2],
            "messages":
                [{"id":id1,"message":"Hey, how are you?"},{"id":id2,"message":"I am doing great!"},{"id":id1,"message":"Epic!"}]
        }
        sinon.stub(request,"post").yields(null,null,result)
        async function lol(callback){
            request.post("http://localhost:5000/api/v1/chat/").send(JSON.stringify(obj)).end(function(error,response,body){
            if(error){
                callback(error)
            } else {
                callback(null,body)
            }
            expect1(body,result)
        })
        } 
        lol(RequestCallback)
        request.post.restore()
        done()
    })
    it("Returns an error message in the body when incorrect ids are used to send a chat",function(done){
        let obj = {"ids":[id1,"lmao"],"id":id1,"message":"Epic!"}
        let result = {"error":"Incorrect ids used"}
        sinon.stub(request,"post").yields(null,null,result)
        async function lol(callback){
            request.post("http://localhost:5000/api/v1/chat/").send(JSON.stringify(obj)).end(function(error,response,body){
            if(error){
                callback(error)
            } else {
                callback(null,body)
            }
            expect1(body,result)
        })
        } 
        lol(RequestCallback)
        request.post.restore()
        done()
    })
})

describe("apiDeleteChat",function(){
    it("Deletes a message given the correct message and userIds",function(done){
        let obj = {"ids":[id1,id2],"id":id1,"message":"Epic!"}
        let result = {"ids":[id1,id2],
            "messages":
                [{"id":id1,"message":"Hey, how are you?"},{"id":id2,"message":"I am doing great!"}]
        }
        sinon.stub(request,"delete").yields(null,null,result)
        async function lol(callback){
            request.delete("http://localhost:5000/api/v1/chat/").send(JSON.stringify(obj)).end(function(error,response,body){
            if(error){
                callback(error)
            } else {
                callback(null,body)
            }
            expect1(body,result)
        })
        } 
        lol(RequestCallback)
        request.delete.restore()
        done()
    })
    it("Returns an error message in the body when an incorrect id is given",function(done){
        let obj = {"ids":[id1,id2],"id":id1,"message":"Epic!"}
        let result = {"error":"Incorrect ids used"}
        sinon.stub(request,"delete").yields(null,null,result)
        async function lol(callback){
            request.delete("http://localhost:5000/api/v1/chat/").send(JSON.stringify(obj)).end(function(error,response,body){
            if(error){
                callback(error)
            } else {
                callback(null,body)
            }
            expect1(body,result)
        })
        } 
        lol(RequestCallback)
        request.delete.restore()
        done()
    })
})