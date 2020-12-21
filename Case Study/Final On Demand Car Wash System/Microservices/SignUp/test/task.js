let chai = require("chai");
let server = require("../app");
let chaiHttp = require("chai-http");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe("Task Api", ()=>{

    describe("POST /register", ()=>{

        it("It should create a new User", (done)=>{
            let body = {"firstName":"Mocha",
            "lastName":"Chai",
            "dob":"22/02/88",
            "email":"mocha@g.com",
            "phone":"687898",
            "type":"Customer",
            "password":"1234",
            "state":"Maharashtra",
            "city":"Mumbai",
            "street":"MR Road"
            };
            chai.request(server)
                .post("/register")
                .send(body)
                .end((err,res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    done();
                });
        });

    }); 

    describe("POST /user", ()=>{

        it("It should create a new User", (done)=>{
            let body = {
            "email":"mocha@g.com"            
            };
            chai.request(server)
                .post("/user")
                .send(body)
                .end((err,res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    done();
                });
        });

    }); //end of inner describe

    describe("GET /viewAllCustomers", ()=>{

        it("It should get all customers", (done)=>{
            
            chai.request(server)
                .get("/viewAllCustomers")
                .end((err,res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    done();
                });
        });

    }); //end of inner describe

    describe("GET /viewAllWashers", ()=>{

        it("It get all washers", (done)=>{
            
            chai.request(server)
                .get("/viewAllWashers")
                .end((err,res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    done();
                });
        });

    }); //end of inner describe


    describe("POST /saveProfile", ()=>{

        it("It should create a new User", (done)=>{
            let body = {"firstName":"Mocha2",
            "lastName":"Chai",
             "dob":"22/02/87",
            "email":"mocha@g.com",
            "phone":"6878980"
            };
            chai.request(server)
                .post("/saveProfile")
                .send(body)
                .end((err,res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    done();
                });
        });

    }); //end of inner describe

    describe("POST /updateCords", ()=>{

        it("It should create a new User", (done)=>{
            let body = {"email":"swagger@g.com",
            "geometry": {"type":"point", "coordinates":["16.0","17.0"]}
            };
            chai.request(server)
                .post("/updateCords")
                .send(body)
                .end((err,res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    done();
                });
        });

    }); //end of inner describe


});