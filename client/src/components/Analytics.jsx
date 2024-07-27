import React from 'react';
import { Progress } from "antd";

const Analytics = ({allTransaction}) => {

  //creating an array for category wise
  const categories =[
    "salary",
    "pocketMoney",
    "petrol",
    "tip",
    "project",
    "movie",
    "food",
    "bills",
    "medical",
    "grocery",
    "fees",
    "tax"
  ];


  //Calculations for total transactions
  //variables to store individiual data
  const totalTransactions = allTransaction.length;
  const totalIncomeTransactions = allTransaction.filter(transaction => transaction.type === "income");
  const totalExpenseTransactions = allTransaction.filter(transaction => transaction.type === "expense");

  //calculation variables
  const totalIncomePercent = (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpensePercent = (totalExpenseTransactions.length / totalTransactions) * 100;

  //Calculations for total Turnover
  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,0);

  //total income turnover
  const totalIncomeTurnover = allTransaction.filter(
    (transaction) => transaction.type === "income"
    ).reduce((acc, transaction) => acc + transaction.amount,0);

  //total expense turnover
  const totalExpenseTurnover = allTransaction.filter(
    (transaction) => transaction.type === "expense"
    ).reduce((acc, transaction) => acc + transaction.amount,0);  

  //Turnover percentages
  const totalIncomeTurnoverPercent = (totalIncomeTurnover/ totalTurnover) * 100;

  const totalExpenseTurnoverPercent = (totalExpenseTurnover/ totalTurnover) * 100;

  //displaying the given calculations
  return (
    <>
       <div className="row m-3 ">
          <div className="col-md-3">
            <div className="card">

              <div className="card-header">
                  Total Transactions : {totalTransactions}
              </div>

              <div className="card-body">
                <h5 className="text-success"> 
                  Income: {totalIncomeTransactions.length}
                </h5>   
                <h5 className="text-danger"> 
                  Expense: {totalExpenseTransactions.length} 
                </h5>

                <div className="d-flex flex-column align-items-center">
                  
                  <Progress 
                        type="circle" 
                        strokeColor={"green"} 
                        className="mx-2"
                        percent={totalIncomePercent.toFixed(0)}
                        />
                    
                    <Progress 
                        type="circle" 
                        strokeColor={"red"} 
                        className="mx-2"
                        percent={totalExpensePercent.toFixed(0)}
                    />
                  </div>
              </div>

            </div>
          </div>

          {/*Div for Total Turnover*/}

          <div className="col-md-3">
            <div className="card">

              <div className="card-header">
                  Total Turnover : {totalTurnover}
              </div>

              <div className="card-body">
                <h5 className="text-success"> 
                  Income: {totalIncomeTurnover} 
                </h5>   
                <h5 className="text-danger"> 
                  Expense: {totalExpenseTurnover} 
                </h5>

                <div d-flex flex-column align-items-center>
                  
                  <Progress 
                        type="circle" 
                        strokeColor={"green"} 
                        className="mx-2"
                        percent={totalIncomeTurnoverPercent.toFixed(0)}
                        />
                    
                    <Progress 
                        type="circle" 
                        strokeColor={"red"} 
                        className="mx-2"
                        percent={totalExpenseTurnoverPercent.toFixed(0)}
                    />
                  </div>
              </div>

            </div>
          </div>


        {/*Category Wise Transactions */}
          <div className="col-md-3">
            <h6 className="bg-dark p-2 text-light"> Category Wise Income</h6>
            {
              categories.map((category) => {
                const amount = allTransaction.filter(
                  (transaction) => 
                  transaction.type === "income" && 
                  transaction.category === category
                  )
                  .reduce((acc, transaction) => acc + transaction.amount,0);
                  
                  return(
                  amount > 0 && (
                    <div className='card'>
                      <div className='card-body'>
                        <h6> {category} </h6>
                        <Progress
                           percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
                        />
                      </div>
                    </div>
                  )
                  );
              })
            }
          </div>

          <div className="col-md-3">
            <h6 className="bg-warning p-2 text-light"> Category Wise Expense</h6>
            {
              categories.map((category) => {
                const amount = allTransaction.filter(
                  (transaction) => 
                  transaction.type === "expense" && 
                  transaction.category === category
                  )
                  .reduce((acc, transaction) => acc + transaction.amount,0);
                  
                  return(
                  amount > 0 && (
                    <div className='card mt-2'>
                      <div className='card-body'>
                        <h6> {category} </h6>
                        <Progress
                           percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
                        />
                      </div>
                    </div>
                  )
                  );
              })
            }
          </div>
        </div>
        <div className="row mt-3 analytics"></div>
    </>
  );
};

export default Analytics;