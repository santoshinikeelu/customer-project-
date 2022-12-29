const cardModel = require("../models/cardModel")
const customerModel = require("../models/customerModel")

const createCard = async function(req,res){
    try{
        let details = req.body
        let getCard = await cardModel.find().count()
        let {cardNumber, cardType, customerName, status, customerID} = details
        cardNumber = "C"+("00"+(getCard+1)).slice(-3)
        details.cardNumber = cardNumber

        if(!cardType){
            return res.status(400).send({status:false,message:"Please provide CardType"})
        }
        if(!["REGULAR","SPECIAL"].includes(cardType)){
            return res.status(400).send({status:false,message:"Please provide cardType only from - ( REGULAR , SPECIAL )"})
        }
        if(!customerName){
            return res.status(400).send({status:false,message:"Please provide Customer Name"})
        }
        if(!status){
            return res.status(400).send({status:false,message:"Please provide status"})
        }
        if(!["ACTIVE","INACTIVE"].includes(status)){
            return res.status(400).send({status:false,message:"Please provide status only from - ( ACTIVE , INACTIVE )"})
        }
        if(!customerID){
            return res.status(400).send({status:false,message:"Please provide customerId"})
        }
        let checkCustomerId = await customerModel.findOne({_id:customerID})
        if(!checkCustomerId){
            return res.status(404).send({status:false,message:"No Customer exists with the given customerID"})
        }

        let cardData = await cardModel.create(details)
        return res.status(201).send({status:true, Data: cardData})

    }
    catch(err){
        return res.status(500).send({status:false,msg:"internal server error",error:err.message})
    }
}
const getCard = async function(req,res){
    try{
        let getCardData = await cardModel.find({status:"ACTIVE"})
            return res.status(200).send({status:true,Data:getCardData})

    }
    catch(err){
        return res.status(500).send({status:false,msg:"internal server error",error:err.message})
    }
}
module.exports = {createCard,getCard}