let chai = require("chai");
let server = require("../app");
let chaiHttp = require("chai-http");
const { response } = require("express");
const { download } = require("easyinvoice");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Task API', ()=>{

    // GET ROUTES
    describe("GET /getAvailableOrders", ()=>{
        it("It should GET all the Available Orders for a Washer", (done)=>{
            chai.request(server)
                .get("/getAvailableOrders")
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

        it("It should NOT GET all the Orders form the database", (done)=>{
            chai.request(server)
                .get("/getAvailableOrder")
                .end((err,res) => {
                    res.should.have.status(404);
                    
                    done();
                });
        });
    }); // describe end


    describe("GET /getAllOrders", ()=>{
        it("It should GET all the Orders from the database", (done)=>{
            chai.request(server)
                .get("/getAllOrders")
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

        it("It should NOT GET all the Available Orders for a Washer", (done)=>{
            chai.request(server)
                .get("/getAllOrder")
                .end((err,res) => {
                    res.should.have.status(404);
                    
                    done();
                });
        });
    }); // describe end



    // POST ROUTES
    describe("POST /razorPayOrder", ()=>{

        it("It should send order ID to Client", (done)=>{
            
            const bodyy = { amount:1000 };
            chai.request(server)
                .post("/razorPayOrder")
                .send(bodyy)
                .end((err,res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    done();
                });
        });

        // it("It should NOT send order ID to Client", (done)=>{
        //     body = {}
        //     chai.request(server)
        //         .post("/razorPayOrder")
        //         .send(body)
        //         .end((err,res) => {
        //             res.should.have.status(404);
                    
        //             done();
        //         });
        // });
    }); // describe end

    // Places a new order in the database
    describe("POST /newOrder", ()=>{

        it("It should place a new order in the database", (done)=>{
            const bodyy = { 
                custId:"aa@a.com",
                custName:"ABCD",
                carName:"ABCD",
                carLocation:"ABCD",
                carPlateNo:"ABCD",
                custPhoneNo:999,
                packageName:"ABCD",
                packagePrice:700
             };
            chai.request(server)
                .post("/newOrder")
                .send(bodyy)
                .end((err,res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    done();
                });
        });

        
    }); // describe end

    describe("POST /order", ()=>{

        it("It should RETURN a order to the client", (done)=>{
            const bodyy = { 
                _id:"5fd628fd9804ca0ba4a50dd7"
             };
            chai.request(server)
                .post("/order")
                .send(bodyy)
                .end((err,res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    done();
                });
        });

        it("It should not RETURN a order to the client", (done)=>{
            const bodyy = { 
                _id:"5fd628fd9804ca0b"
             };
            chai.request(server)
                .post("/order")
                .send(bodyy)
                .end((err,res) => {
                    res.should.have.status(400);
                    // res.body.should.be.a('array');
                    done();
                });
        });

        
    }); // describe end

    describe("POST /acceptOrder", ()=>{

        it("It accept a order for a washer", (done)=>{
            const body1 = { 
                orderId:"5fdb3cf515a6924084e42728",
                email:"b@b.com",
                name:"Josh",
                phone:78689789,
                isAcceptedDate:"2020-09-02"
             };
            chai.request("http://localhost:3002")
                .post("/acceptOrder")
                .send(body1)
                .end((err,res) => {
                    // console.log(body1);
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    done();
                });
        });
       
    }); // describe end


    describe("POST /startCleaning", ()=>{

        it("It Sets a inProgress feild in Database", (done)=>{
            const body1 = { 
                orderId:"5fdb3cf515a6924084e42728",
                
             };
            chai.request("http://localhost:3002")
                .post("/startCleaning")
                .send(body1)
                .end((err,res) => {
                    // console.log(body1);
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    done();
                });
        });
       
    }); // describe end

    describe("POST /finishCleaning", ()=>{

        it("It sets a isComplete field in database", (done)=>{
            const body1 = { 
                orderId:"5fdbc68e0aae5a3fb898d3ec",
                custId:"a@a.com"
             };
            chai.request("http://localhost:3002")
                .post("/finishCleaning")
                .send(body1)
                .end((err,res) => {
                    // console.log(body1);
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    done();
                });
        });
       
    }); // describe end


    describe("POST /myOrders", ()=>{

        it("It returns all the orders w.r.t to a email in database", (done)=>{
            const body1 = { 
                email:"admin@admin.com",
                
             };
            chai.request("http://localhost:3002")
                .post("/myOrders")
                .send(body1)
                .end((err,res) => {
                    // console.log(body1);
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    done();
                });
        });
       
    }); // describe end


    describe("POST /washerOrders", ()=>{

        it("It returns all the Washer orders w.r.t to a email in database", (done)=>{
            const body1 = { 
                email:"b@b.com",
                
             };
            chai.request("http://localhost:3002")
                .post("/washerOrders")
                .send(body1)
                .end((err,res) => {
                    // console.log(body1);
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    done();
                });
        });
       
    }); // describe end

    
    describe("POST /washerAvailableOrders", ()=>{

        it("It returns all the Washers with specific radius", (done)=>{
            const body1 = { 
                lat:12.4354326,
                lng:67.4554345
                
             };
            chai.request("http://localhost:3002")
                .post("/washerAvailableOrders")
                .send(body1)
                .end((err,res) => {
                    // console.log(body1);
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    done();
                });
        });
       
    }); // describe end



});



