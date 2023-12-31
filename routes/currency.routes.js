const express = require("express");
const router = express.Router();

const CurrencyController = require("../controllers/currency.controller");

const currencyCtrlInstance = new CurrencyController();

router.get("/", currencyCtrlInstance.list.bind(currencyCtrlInstance));
router.get("/conversion", currencyCtrlInstance.convertor.bind(currencyCtrlInstance));

module.exports = router;