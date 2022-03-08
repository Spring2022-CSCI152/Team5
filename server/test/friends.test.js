import chai, { expect } from "chai"
import chaiHttp from 'chai-http'
import { describe } from "mocha"
import request from "request"

chai.use(chaiHttp);
var expect1 = chai.expect

var id = "61ad80e9ce286ba11f98d242"
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
    it("Returns only the specific friend when queryed by userId and friendUserName",function(done){
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
    it("Returns the empty string when a correct id is queried but wrong friendUserName is queried",function(done){
        request(url+path+"?userId="+id+"&friendUserName=lolster",function(error,response,body){
            expect1(response.statusCode).to.be.equal(200)
            expect1(response.body).to.be.equal("")
            done()
        })
    })

})