const express = require("express")
const router = express()
const customerController = require("../controller/customerController")
const cardController = require("../controller/cardController")

router.post("/customer",customerController.createCustomer)
router.get("/customer",customerController.getCustomer)
router.post("/card",cardController.createCard)
router.get("/card",cardController.getCard)


module.exports = router