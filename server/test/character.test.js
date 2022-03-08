import chai, { expect } from "chai"
import chaiHttp from 'chai-http'
import { describe } from "mocha"
import request from "request"

chai.use(chaiHttp);
var expect1 = chai.expect

var id = "61a707daaa6b7d4a2a8b87c3"
var url = "http://localhost:5000"
var path = '/api/v1/users/character/'

describe("apiGetCharacter",function(){
    it("Returns the character object of a specific user when queried by userId",function(done){
        request(url+path+"?userId="+id,function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            var json =  JSON.parse(response.body)
            expect1(json).to.have.keys(["char_name","stats","inventory"])
            done()
        })
    })
    it("Returns empty string when an incorrect id is queried",function(done){
        request(url+path+"?userId=aylmao",function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body).to.be.equal("")
            done()
        })
    })
})

describe("apiUpdateCharacter",function(){
    it("Updates all of the character's info successfully when sent the user_id and the corrolating info",function(done){
        var json = {
            "user_id":id,
            "level":"1",
            "xp_to_next_level":"0",
            "max_hp":"10",
            "current_hp":"10",
            "gold":"10"
        }
        chai
            .request(url).put(path)
            .set("content-type","application/json").send(json).end(function(error,response,body){
                expect1(response.statusCode).to.be.equal(200)
                expect1(response.body.status).to.be.equal("success")
                done()
            })
    })
    it("Returns when an incorrect id is sent",function(done){
        var json = {
            "user_id":"aylmao",
            "level":"1",
            "xp_to_next_level":"0",
            "max_hp":"10",
            "current_hp":"10",
            "gold":"10"
        }
        chai
            .request(url).put(path)
            .set("content-type","application/json").send(json).end(function(error,response,body){
                expect1(response.statusCode).to.be.equal(200)
                expect1(response.body.status).to.be.equal("Wrong Id")
                done()
            })
    })
})