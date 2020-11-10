let organization = {
    cname:"ABC Corp",
    address:{
        city:"Chennai",
        pincode:"9922929"
    }
};


let {cname,address:{city,pincode}} = organization;
console.log("Pincode:"+pincode);