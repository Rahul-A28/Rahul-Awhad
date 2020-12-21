let chai = require("chai");
let server = require("../authentication");
let chaiHttp = require("chai-http");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe("Task API", ()=>{

    describe("POST /login", ()=>{
        it("It should check email id and password and send jwt token to client", (done)=>{
            let body = {"email":"b@b.com","password":"12345"};
            chai.request(server)
                .post("/login")
                .send(body)
                .end((err,res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    done();
                });
        });

    });

    describe("GET /verify", ()=>{
        it("It should verify the received token", (done)=>{
            let body = {"email":"b@b.com","password":"12345"};
            chai.request(server)
                .get("/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJAYi5jb20iLCJpYXQiOjE2MDg1MTIyNzgsImV4cCI6MTYwODUxMjg3OH0.ufaXdj9s60PdY0I6ewvsLQFTkPamA7C4XgCOa4rvKJA")                
                .end((err,res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    done();
                });
        });

    });

});