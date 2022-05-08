import chai, { expect } from "chai"
import chaiHttp from 'chai-http'
import { describe } from "mocha"
import request from "request"

chai.use(chaiHttp);
var expect1 = chai.expect

var id = "62783c09206b6f30e8135ac3"
var itemId = "6275d379fccd40be9db5a095"
var deleteId = ""
var url = "http://localhost:5000"
var path = '/api/v1/users/inventory/'

describe("apiGetInventory",function(){
    it("Returns the users whole inventory when queried by user_id",function(done){
        request(url+path+"?userId="+id,function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            var res = JSON.parse(response.body)
            expect1(res.items).to.be.an("array")
            done()
        })
    })
    it("Returns a particular item when queried by user_id and item_id",function(done){
        request(url+path+"?userId="+id+"&item_id"+itemId,function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            var res = JSON.parse(response.body)
            expect1(res.items[0].name).to.be.equal("Shield")
            expect1(res.items[0].type).to.be.equal("Diamond")
            done()
        })
    })
    it("Returns a 400 with the message,Please query based on a userId., when no id is queried with",function(done){
        request(url+path,function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            var res = JSON.parse(response.body)
            expect1(res).to.be.equal("Please query based on a userId.")
            done()
        })
    })
    it("Returns a 500 when an incorrect id is queried with",function(done){
        request(url+path+"?userId=415",function(error,response,body){
            expect1(response.statusCode).to.be.equal(500)
            done()
        })
    })
    
    it("Returns 400 with the message,Please query with a correct item name, when a correct userId but wrong item id are queried with",function(done){
        request(url+path+"?userId="+id+"&item_id=Wood Sw",function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("\"Please query with a correct item id\"")
            done()
        })
    })
    
})

describe("apiAddItem",function(){
    it("Successfully adds item to users inventory when correct userid and item id are given in the request",function(done){
        var json = {
            "user_id":id,
            "item_id":"6275d379fccd40be9db5a097"
        }
        chai.request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body.status).to.be.equal("success")
            deleteId = response.body.item._id
            done()
        })
    })
    it("Returns 400 with the message, Please include user_id and item_id in the body of the request., when no user_id is present",function(done){
        var json = {
            "item_id":"61ad112a63f0cb9a2e0f06d1"
        }
        chai.request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please include user_id and item_id in the body of the request.")
            done()
        })
    })
    it("Returns 400 with the message, Please include user_id and item_id in the body of the request., when no item_id is present",function(done){
        var json = {
            "user_id":id
        }
        chai.request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please include user_id and item_id in the body of the request.")
            done()
        })
    })
    it("Returns 400 with the message, Target user could not be found., when an incorrect user_id is given",function(done){
        var json = {
            "user_id":415,
            "item_id":"61ad112a63f0cb9a2e0f06d1"
        }
        chai.request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Target user could not be found.")
            done()
        })
    })
    it("Returns 400 with the message, Target item could not be found., when an incorrect item_id is given",function(done){
        var json = {
            "user_id":id,
            "item_id":"61ad112a63f0cb9a2e0f06d0"
        }
        chai.request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Target item could not be found.")
            done()
        })
    })
    it("Returns 400 with the message,Target item is already in the user's inventory., when trying to add an existing inventory item",function(done){
        var json = {
            "user_id":id,
            "item_id":itemId
        }
        chai.request(url).post(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Target item is already in the user's inventory.")
            done()
        })
    })
})

describe("apiDeleteItem",function(){
    it("Successfully deletes item when a correct userId and item id are given in the request",function(done){
        var json = {
            "user_id":id,
            "item_id":deleteId
        }
        chai.request(url).delete(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body.status).to.be.equal("success")
            done()
        })
    })
    it("Returns 400 with the message, Please include user_id and item_id in the body of the request., when no user_id is present",function(done){
        var json = {
            "item_id":itemId
        }
        chai.request(url).delete(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please include user_id and item_id in the body of the request.")
            done()
        })
    })
    it("Returns 400 with the message, Please include user_id and item_id in the body of the request., when no item_id is present",function(done){
        var json = {
            "user_id":id
        }
        chai.request(url).delete(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please include user_id and item_id in the body of the request.")
            done()
        })
    })
    it("Returns 400 with the message, Target user could not be found., when an incorrect user_id is given",function(done){
        var json = {
            "user_id":415,
            "item_id":itemId
        }
        chai.request(url).delete(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Target user could not be found.")
            done()
        })
    })
    
    it("Returns 400 with the message, Target item not found in user's inventory., when an incorrect item_id is given",function(done){
        var json = {
            "user_id":id,
            "item_id":"61ad112a63f0cb9a2e0f06d0"
        }
        chai.request(url).delete(path)
        .set("content-type","application/json").send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Target item not found in user's inventory.")
            done()
        })
    })
})