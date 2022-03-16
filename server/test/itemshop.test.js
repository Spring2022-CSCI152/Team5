import chai, { expect } from "chai"
import chaiHttp from 'chai-http'
import { describe } from "mocha"
import request from "request"

chai.use(chaiHttp);
var expect1 = chai.expect

var id = "61ad8bcccbe8a437facea52e"
var itemId = ""
var url = "http://localhost:5000"
var path = '/api/v1/itemshop/'

describe("apiGetItems",function(){
    it("Succesfully return an array items when queried by itemsPerPage",function(done){
        request(url+path+"?itemsPerPage=20",function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            var res = JSON.parse(response.body)
            expect1(res.items).to.be.an("array")
            expect1(res).to.have.keys(["page","filters","entries_per_page","total_results","items"])
            done()
        })
    })
    it("Successfully returns the specific item when queried by a correct name",function(done){
        request(url+path+"?name=Wood Sword",function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            var res = JSON.parse(response.body)
            expect1(res.items).to.be.an("array")
            expect1(res.items.length).to.be.equal(1)
            expect1(res).to.have.keys(["page","filters","entries_per_page","total_results","items"])
            done()
        })
    })
    it("Successfully returns the specific type of items when queried by a correct type",function(done){
        request(url+path+"?type=weapon",function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            var res = JSON.parse(response.body)
            expect1(res.items).to.be.an("array")
            expect1(res.items[0].type).to.be.equal("weapon")
            expect1(res).to.have.keys(["page","filters","entries_per_page","total_results","items"])
            done()
        })
    })
    it("Returns the full item list when no query is given",function(done){
        request(url+path,function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            var res = JSON.parse(response.body)
            expect1(res.items).to.be.an("array")
            expect1(res).to.have.keys(["page","filters","entries_per_page","total_results","items"])
            done()
        })
    })
    it("Returns an empty item list when queried by an incorrect item name",function(done){
        request(url+path+"?name=LMao",function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            var res = JSON.parse(response.body)
            expect1(res.items.length).to.be.equal(0)
            done()
        })
    })
    it("Returns an empty item list when queried by an incorrect type name",function(done){
        request(url+path+"?type=LMao",function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            var res = JSON.parse(response.body)
            expect1(res.items.length).to.be.equal(0)
            done()
        })
    })
})

describe("apiAddItem",function(){
    it("Successfully adds the item to the itemshop when the name,type, and cost are in the request",function(done){
        var json = {
            "name":"Diamond Axe",
            "type":"weapon",
            "cost":"200"
        }
        chai.request(url)
        .post(path).set("content-type","application/json")
        .send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body.newItem.itemsList.filter(function(item){return item.name == "Diamond Axe"})[0].name).to.be.equal("Diamond Axe")
            itemId = response.body.newItem.itemsList.filter(function(item){return item.name == "Diamond Axe"})[0]._id
            done()
        })
    })
    it("Returns a 400 with the message,Please include name, type, and cost., when no name is in the request",function(done){
        var json = {
            "type":"weapon",
            "cost":"200"
        }
        chai.request(url)
        .post(path).set("content-type","application/json")
        .send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please include name, type, and cost.")
            done()
        })
    })
    it("Returns a 400 with the message,Please include name, type, and cost., when no type is in the request",function(done){
        var json = {
            "name":"Lolster",
            "cost":"200"
        }
        chai.request(url)
        .post(path).set("content-type","application/json")
        .send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please include name, type, and cost.")
            done()
        })
    })
    it("Returns a 400 with the message,Please include name, type, and cost., when no cost is in the request",function(done){
        var json = {
            "type":"weapon",
            "name":"Lolster"
        }
        chai.request(url)
        .post(path).set("content-type","application/json")
        .send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please include name, type, and cost.")
            done()
        })
    })
    it("Returns a 400 with the message,Item already exists., when name is a duplicate",function(done){
        var json = {
            "name":"Diamond Axe",
            "type":"weapon",
            "cost":"200"
        }
        chai.request(url)
        .post(path).set("content-type","application/json")
        .send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Item already exists.")
            done()
        })
    })
})

describe("apiUpdateItem",function(){
    it("Successfully updates item when a correct id and name,type, and/or cost are given",function(done){
        var json = {
            "id":itemId,
            "name":"lol",
            "type":"weapon",
            "cost":100
        }
        chai.request(url)
        .put(path).set("content-type","application/json")
        .send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body.status).to.be.equal("success")
            done()
        })
    })
    it("Returns a 400 with the message, Please have a item id in the request, when no id is given",function(done){
        var json = {
            "name":"lol",
            "type":"weapon",
            "cost":100
        }
        chai.request(url)
        .put(path).set("content-type","application/json")
        .send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please have a item id in the request")
            done()
        })
    })
    it("Returns a 400 with the message, Please give a stat to update, when no stats are given in the request",function(done){
        var json = {
            "id":itemId
        }
        chai.request(url)
        .put(path).set("content-type","application/json")
        .send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please give a stat to update")
            done()
        })
    })
    it("Returns a 400 with the message,Please use a correct item id, when an incorrect item id is given",function(done){
        var json = {
            "id":415,
            "type":"weapon"
        }
        chai.request(url)
        .put(path).set("content-type","application/json")
        .send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please use a correct item id")
            done()
        })
    })
})
describe("apiDeleteItem",function(){
    it("Successfully deletes the item from the itemshop when the item id is given in the request",function(done){
        var json = {
            "id":itemId
        }
        chai.request(url)
        .delete(path).set("content-type","application/json")
        .send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body.status).to.be.equal("success")
            done()
        })
    })
    it("Returns a 400 with the message, Please use the item id for deletion, when no id is given",function(done){
        var json = {}
        chai.request(url)
        .delete(path).set("content-type","application/json")
        .send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please use the item id for deletion")
            done()
        })
    })
    it("Returns a 400 with the message,Please use a correct item id, when an incorrect item id is used",function(done){
        var json = {
            "id":"415"
        }
        chai.request(url)
        .delete(path).set("content-type","application/json")
        .send(json).end(function(error,response,body){
            expect1(response.statusCode).to.be.equal(400)
            expect1(response.body).to.be.equal("Please use a correct item id")
            done()
        })
    })
})