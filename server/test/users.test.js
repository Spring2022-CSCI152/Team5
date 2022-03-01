import chai, { expect } from "chai"
import chaiHttp from 'chai-http'
import { describe } from "mocha"
import request from "request"

chai.use(chaiHttp);
var expect1 = chai.expect

//Change this id to a valid one in the database for each test
//By default, it will choose the id of the new user after the apiAddUser test
var id = ""
//Change this username to a new one for each test
var username = "brother5"
var url = "http://localhost:5000"
var path = '/api/v1/users/'

describe("apiGetUsers", function() {
    it("Returns user with same user_name when queryed with user_name", function(done){
        request(url+path+"?userName=John76",function(error,response,body) {
            expect1(response.statusCode).to.equal(200)
            var json = JSON.parse(response.body)
            expect1(json.users[0]["user_name"]).to.equal("John76")
            done()
        })

    })
    it("Returns user with same _id when queryed by id",function(done){
        request(url+path+"?id=61a707daaa6b7d4a2a8b87c3",function(error,response,body) {
            expect1(response.statusCode).to.equal(200)
            var json = JSON.parse(response.body)
            expect1(json.users[0]["_id"]).to.equal("61a707daaa6b7d4a2a8b87c3")
            done()
        }) 
    })
    it("Returns a list of all the users when queryed by usersPerPage", function(done){
        request(url+path+"?usersPerPage=20",function(error,response,body) {
            expect1(response.statusCode).to.equal(200)
            var json = JSON.parse(response.body)
            expect1(json.users).to.be.an("array")
            done()
        })
    })
    
})

//Will probably set up with a randomizer later to test with new user each time
//For now, make different test cases each time you want to test
describe("apiAddUser",function() {
    it("Returns the new users token when they are added if they are a new user, else it says username taken",function(done){
        var requestStr = "{\"user_name\":\""+username+"\",\"password\":\"aybruh1\",\"char_name\":\"lmaoster\"}"
        chai
            .request(url).post('/api/v1/users')
            .set('content-type',"application/json").send(JSON.parse(requestStr)).end(function(error,response,body){
                if(response.statusCode == 400){
                    expect1(response.body.message).to.be.equal("Username already taken.")
                    done()
                } else{
                    expect1(response.statusCode).to.equal(200)
                    expect(response.body.result.user_name).to.be.equal(username)
                    id = response.body.result._id
                    console.log(id)
                    done()
                }
            })
    })
})

describe("apiUpdateUser",function(){
    it("Successfully authorizes the user when correct username and password combination are entered with auth set to 1",function(done){
        var requestStr =  "{\"user_name\":\"aylmao90\",\"password\":\"aybruh1\",\"auth\":\"1\"}"
        chai
            .request(url).put('/api/v1/users')
            .set("content-type","application/json").send(JSON.parse(requestStr)).end(function(error,response,body){
                expect1(response.statusCode).to.equal(200)
                expect(response.body.result.user_name).to.be.equal("aylmao90")
                done()
            })
    })
    it("Succesfully responses with Invalid credentials when incorrect credentials are used",function(done){
        var requestStr =  "{\"user_name\":\"aylmao35\",\"password\":\"aybru\",\"auth\":\"1\"}"
        chai
            .request(url).put('/api/v1/users')
            .set("content-type","application/json").send(JSON.parse(requestStr)).end(function(error,response,body){
                expect1(response.statusCode).to.equal(400)
                expect(response.body.message).to.be.equal("Invalid credentials")
                done()
            })
    })
    it("Successfully allows user to update username and password when user id,new username,and new password are passed",function(done){
        var requestStr = "{\"user_name\":\""+"lolster"+"\",\"password\":\"ay1\",\"id\":\""+id+"\"}"
        chai
        .request(url).put('/api/v1/users')
        .set("content-type","application/json").send(JSON.parse(requestStr)).end(function(error,response,body){
            expect1(response.statusCode).to.equal(200)
            expect(response.body.status).to.be.equal("success")
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
            expect(response.statusCode).to.be.equal(200)
            expect(response.body.status).to.be.equal("success")
            done()
        })
    })
})