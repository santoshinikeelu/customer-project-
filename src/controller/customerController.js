const customerModel = require("../models/customerModel")
const { v4: uuidv4 } = require('uuid');
const createCustomer = async function(req,res){
    try{
        const data =req.body
        const {firstName,lastName,mobileNumber,emailID,DOB,address,status}=data
        if(data.customerID){
            await customerModel.deleteOne({customerID : data.customerID})
            return res.status(200).send({status : true , message : " deleted successfully"})
        }
        if(Object.keys(data).length == 0){
            let customers = await customerModel.find({status : "ACTIVE"})
            return res.status(200).send({status : true , data : customers})
        }
        data.customerID = uuidv4()
        if(!firstName){
            return res.status(404).send({status:false, message: "First Name is not present"})
        }
        
        if (!/^[a-zA-Z]+$/.test(firstName)) {
            return res.status(400).send({ status: false, msg: "First Name is invalid" })
        }
         if(!lastName){
            return res.status(404).send({status:false, message: "Last Name is not present"})
        }
        if (!/^[a-zA-Z]+$/.test(lastName)){
            return res.status(400).send({ status: false, msg: "Last Name is invalid" })
        }
         if(!mobileNumber){
            return res.status(404).send({status:false, message: "Mobile Number is not present"})
        }
        if (!/^[0]?[6789]\d{9}$/.test(mobileNumber)) {
            return res.status(400).send({ status: false, msg: "Mobile Number is invalid" })
        }
         if(!DOB){
            return res.status(404).send({status:false, message: "DOB is not present"})
        }
         if(!/^\d{4}-\d{2}-\d{2}$/.test(DOB)){
            return res.status(404).send({status:false, message: "DOB is not valid"})
        }
         if(!emailID){
            return res.status(404).send({status:false, message: "Email Id is not present"})
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailID)){
            return res.status(400).send({ status: false, msg: "email is invalid" })
        }
         if(!address){
            return res.status(404).send({status:false, message: "Address is not present"})
        }
         if(!status){
            return res.status(404).send({status:false, message: "Status is not present"})
        }
        if(!["ACTIVE","INACTIVE"].includes(status)){
         return res.status(400).send({status:false,message:"Pls provide status only from - ( ACTIVE , INACTIVE )"})
        }
        const customerData = await customerModel.create(data)
        return res.status(201).send({status:true,msg:"custmer created successfully",data:customerData})
    }
    catch(err){
        return res.status(500).send({status:false,msg:"internal server error",error:err.message})
    }
}

//====================================GET CUSTOMER=============================//

const getCustomer = async function(req,res){
    try{
        let getData = await customerModel.find({status:"ACTIVE"})
        return res.status(200).send({status:true, Data:getData})
     }
    catch(err){
        return res.status(500).send({status:false,msg:"internal server error",error:err.message})
    }
}




module.exports = {createCustomer,getCustomer}