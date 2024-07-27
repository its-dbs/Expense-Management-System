const express = require("express");
const {
    addTransaction, 
    getAllTransaction, 
    editTransaction,
    deleteTransaction,
    exportTransactions } = require("../controllers/transactionController");


//router object
const router = express.Router();

//routes
//router.post('url pattern', call back function (but here we use controller))
//adding transaction
router.post("/add-transaction", addTransaction);

//post get transactions
router.post("/get-transaction", getAllTransaction);

//editing transaction
router.post("/edit-transaction",editTransaction);

//delete transaction
router.post("/delete-transaction",deleteTransaction);

//Download transactions
router.post("/export-transaction",exportTransactions);

//export
module.exports = router;