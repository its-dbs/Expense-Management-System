//Importing the transaction model
const transactionModel = require("../models/transactionModel"); 
const moment = require("moment");
const excelJS = require("exceljs");


//Function to get all transactions
const getAllTransaction = async (req, res) => {
    try
    {
        const {frequency, selectedDate, type} = req.body;

        const transactions = await transactionModel.find({
            ...(frequency !== "custom" ? {
                date:{
                    $gt : moment().subtract(Number(frequency), "d").toDate(),
                },
            } : {
                date: {
                    $gte: selectedDate[0],
                    $lte: selectedDate[1],
                    },
            }),
            
            userId: req.body.userId,
        
            ...(type !== "all" && {type}),
        });

        res.status(200).json(transactions);
    }
    catch (error)
    {
        console.log(error);
        res.status(500).json(error);
    }
};

//Function to add all transactions
const addTransaction = async(req, res) => {
    try{
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();
        res.status(201).send("Transaction Created");
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
};

//Function to edit  transactions
const editTransaction = async(req,res) => {
    try{
        await transactionModel.findOneAndUpdate(
            {_id: req.body.transactionId},
                req.body.payload);
            res.status(200).send("Transaction edited successfully");
    }
    
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }

};

//Function to delete  transactions
const deleteTransaction = async(req, res) =>{
    try{
        await transactionModel.findOneAndDelete(
            {_id: req.body.transactionId});
            res.status(200).send("Transaction deleted successfully");
    
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }

};

//Function to export transaction data
const exportTransactions = async(req, res) => {
        try{
            //creating an object of new workbook
            const workbook = new excelJS.Workbook();
            const worksheet = workbook.addWorksheet("All Transactions");

            //append data in the worksheet
            //creating an array and adding objects inside it
            worksheet.columns = [
                {header: "Sr_No.", key: "t_id"},
                {header: "User Id.", key: "userId"},
                {header: "Amount", key: "amount"},
                {header: "Type", key: "type"},
                {header: "Category", key: "category"},
                {header: "Reference", key: "reference"},
                {header: "Description", key: "description"},
                {header: "Date", key: "date"},

            ];

            //Adding the sr.no key
            let counter = 1;

            //taking data from the database
            const allData = await transactionModel.find();

            //Fetching data 1 by 1 from allData
            allData.forEach((transaction) => {
                transaction.t_id = counter;

                worksheet.addRow(transaction);

                counter++;
            });

            //selecting the 1st row and editing it as bold
            worksheet.getRow(1).eachCell((cell) => {
                cell.font = {bold:true};
            });

            //downloading the excel workbook
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
            );

            res.setHeader(
                "Content-Disposition",
                `attachment; filename=AllTransactions.xlsx`

            );

            return workbook.xlsx.write(res).then(() => {
                res.status(200);
            });


        }
        catch(error)
        {
            console.log(error.message);

        }
};


module.exports = {
    getAllTransaction, 
    addTransaction, 
    editTransaction,
    deleteTransaction,
    exportTransactions,
};