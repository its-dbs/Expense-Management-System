import React, {useState, useEffect} from "react";
import {Form, Input, message, Modal, Select, Table, DatePicker} from "antd";
import {
  UnorderedListOutlined, 
  AreaChartOutlined, 
  EditOutlined, 
  DeleteOutlined,
  FileExcelOutlined} from '@ant-design/icons';
import Layout from '../components/Layout/Layout';
import axios from "axios";
import Loading from "../components/Loading";
import moment from "moment";
import Analytics from "../components/Analytics";
import { saveAs } from 'file-saver';
const { RangePicker } = DatePicker;


const HomePage = () => {

  //Display of modal
  const [showModal, setShowModal] = useState(false);
  //loading state
  const [loading, setLoading] = useState(false);
  //storing values from db
  const [allTransaction, setAllTransaction] = useState([]);
  //state for frquency: 7 represents the days
  const [frequency, setFrequency] = useState('7');
  const [selectedDate, setSelectedDate] = useState([]);
  //state for icons view data // iitially set to table
  const [viewData, setViewData] = useState('table');
  //state for editing records
  const [editTable, setEditTable] = useState(null);
  //handling type
  const [type, setType] = useState("all");


  //table data
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span> {moment(text).format('YYYY-MM-DD')} </span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Actions',
      render : (text,record) => (
        <div>
          <EditOutlined onClick={() => {
            setEditTable(record);
            setShowModal(true);
          }}/>
          <DeleteOutlined 
            className="mx-2" 
            onClick = {() => {
              deleteHandler(record);
            }} 
          />
        </div>
      )

    },
  ];

 /////////-------------------------------------------GET ALL TRANSACTIONs----------------------------------------------------///////////

  //useEffect - we can call multiple functions here without dependencies
  useEffect (() => {

      //displaying / getting all transactions
    const getAllTransactions = async () =>{
      try {

        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        //post(path in server.js file/ path in transactionRoutes.js file)
        const res = await axios.post("/transactions/get-transaction", {
          userId: user._id,
          frequency,
          selectedDate,
          type,
         });

        
        setAllTransaction(res.data);
        setLoading(false);
       // console.log(res.data);

      }

      catch (error)
      { 
          message.error('Fetch issue with transaction');
          console.log(error);
      }
};

    getAllTransactions();
  }, [frequency, selectedDate, type, setAllTransaction]);


 /////////--------------------------------------------------ADD, EDIT and DELETE TRANSACTION SUBMIT FORM HANDLER---------------------------------------///////////

 //delete transaction 
 const deleteHandler = async(record) => {
    try{
      setLoading(true);
       await axios.post("/transactions/delete-transaction", 
       {transactionId: record._id,
      });
       setLoading(false);
       message.success("Transaction deleted successfully");
    }
    catch(error)
    {
      setLoading(false);  
      console.log(error);
      message.error("Unable to delete record");
    }

 };
  //form handling 
  //inbuilt we get the value prop to handle the value submitted through the form
  const submitForm = async (values) => {
    //console.log(values);

      try{
          const user = JSON.parse(localStorage.getItem("user"));
          setLoading(true);
          //send the endpoint/path of the route/subroute mentioned in app.use in server.js file
          //{userId: get from local storage._id}
          if(editTable)
          {
            await axios.post('/transactions/edit-transaction',{
              payload: {
                ...values,
                userId: user._id
              },
              transactionId: editTable._id
            });
            setLoading(false);
            message.success("Transactions Updated Successfully");

          }
          else
          {
            await axios.post('/transactions/add-transaction',{
              ...values, 
              userId: user._id
            });
            setLoading(false);
            message.success("Transactions Added Successfully");

          }
          setShowModal(false);
          setEditTable(null);

          //Reset the form fields after successful submission
         

         }
    catch(error)
    {
      setLoading(false);
      message.error("Please fill all the fields");
    }
      
  };

/*////////-----------------------------------------DOWNLOADING EXCEL SHEET AND HANDLING THE DOWNLOAD--------------------///////////*/
const handleDownloadExcel = async () => {
  try {
    const response = await axios.post('/transactions/export-transaction', {}, {
      responseType: 'blob'  // Set responseType to 'blob' to receive binary data
    });

    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Trigger download using FileSaver.js
    saveAs(blob, 'AllTransactions.xlsx');

    message.success('Excel file downloaded successfully');
  } catch (error) {
    console.error('Error downloading Excel file:', error);
    message.error('Failed to download Excel file');
  }
};
  

/*////////-----------------------------------------APPLYING FILTERS TO THE TRANSACTION DATA--------------------///////////*/

  return (
    <Layout>

      {loading && <Loading />}

      {/* division for filters*/}
      <div className="filters">
          <div> 
            <h6> Select Frequency</h6>
              <Select value={frequency} onChange ={(values) => setFrequency(values) } >
                  <Select.Option value="7"> Last 1 Week </Select.Option>
                  <Select.Option value="31"> Last 1 Month </Select.Option>
                  <Select.Option value="365"> Last 1 Year </Select.Option>
                  <Select.Option value="custom"> Custom </Select.Option>
              </Select>

              {/* conditionally cheching frequency*/}
              {frequency === "custom" && 
                <RangePicker
                   value = {selectedDate} 
                   onChange ={(values) => setSelectedDate(values)}
                  />
              }
          </div>

          <div className="filter-tab"> 
            <h6> Select Type</h6>
              <Select value={type} onChange ={(values) => setType(values) } >
                  <Select.Option value="all"> All </Select.Option>
                  <Select.Option value="income"> Income </Select.Option>
                  <Select.Option value="expense"> Expense </Select.Option>
                  
              </Select>

              {/* conditionally cheching frequency*/}
              {frequency === "custom" && 
                <RangePicker
                   value = {selectedDate} 
                   onChange ={(values) => setSelectedDate(values)}
                  />
              }
          </div>

{/*////////-----------------------------------------TO HIGHLIGH THE ICONS WHICH IS ACTIVE AND DISPLAY THE SELECTED PAGE--------------------///////////*/}

          <div className="switch-icons">
              <UnorderedListOutlined 
                className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`}
                onClick = {() => setViewData('table')}/>

              <AreaChartOutlined 
                className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`}
                onClick = {() => setViewData('analytics')}/>

            </div>
{/*////////-----------------------------------------TO Export the transaction data as excel file--------------------///////////*/}
            <div>
                <h6>Download All 
                    <FileExcelOutlined 
                      className="mx-2" 
                      onClick = {handleDownloadExcel}
                    />
                  </h6>
            </div>

          <div> 
            <button className="btn btn-primary" 
              onClick = {() => setShowModal(true)}>
                 Add New Transaction
             </button>
          </div>
      </div>




{/*////////-----------------------------------------DISPLAYING THE TRANSACTION USING TABLE OR CHART ON THE PAGE--------------------///////////*/}

      {/* division for Table*/}
      <div className="content"> 
              {viewData === 'table' ? 
              <Table columns = {columns} dataSource ={allTransaction} / >
              :
              <Analytics allTransaction = {allTransaction}/>}
          
      </div>

{/*////////-----------------------------------------ADDING TRANSACCTION FORM--------------------------------------------///////////*/}

          {/* based on the state given above , the modal will be opened or closed*/}
          //test
          <Modal title= {editTable ? "Edit Transaction" : "Add Transaction"}
                  open = {showModal}
                  onCancel = {() => setShowModal(false)}
                  footer = {false}
          > 

              <Form 
                  layout="vertical" 
                  onFinish = {submitForm} 
                  initialValues={editTable}
              >

                <Form.Item label="Amount: " name="amount">
                  <Input type="text" />
                </Form.Item>

                <Form.Item label="Type: " name="type">
                  <Select>
                      <Select.Option value="income"> Income</Select.Option>
                      <Select.Option value="expense"> Expense</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Category: " name="category">
                <Select>
                      <Select.Option value="salary"> Salaray</Select.Option>
                      <Select.Option value="pocketMoney"> Pocket Money</Select.Option>
                      <Select.Option value="petrol"> Petrol</Select.Option>
                      <Select.Option value="tip"> Tip</Select.Option>
                      <Select.Option value="project"> Project</Select.Option>
                      <Select.Option value="movie"> Movie</Select.Option>
                      <Select.Option value="food"> Food & Drinks</Select.Option>
                      <Select.Option value="bills"> Bills</Select.Option>
                      <Select.Option value="medical"> Medical</Select.Option>
                      <Select.Option value="grocery"> Grocery</Select.Option>
                      <Select.Option value="fees"> Fee</Select.Option>
                      <Select.Option value="tax"> Tax</Select.Option>

                  </Select>
                </Form.Item>

                <Form.Item label="Reference: " name="reference">
                  <Input type="text" />
                </Form.Item>

                <Form.Item label="Description: " name="description">
                  <Input type="text" />
                </Form.Item>

                <Form.Item label="Date: " name="date">
                  <Input type="date" />
                </Form.Item>

                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                  {" "}
                    SAVE 
                  </button>
                  
                </div>

              </Form>
          </Modal>
    </Layout>
  );
};

export default HomePage;