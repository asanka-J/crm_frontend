import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { withRouter } from 'react-router-dom'


class CommunicationList  extends Component {



    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            tableData: [],
            tableColumns : [
                {
                    name: 'Id',
                    selector: 'id',

                },
                {
                    name: 'Type',
                    selector: 'communication_type',

                },
                {
                    name: 'From',
                    selector: 'from',

                },
                {
                    name: 'To',
                    selector: 'to',

                },

                {
                    name: 'Schedule Date',
                    selector: 'communication_schedule_date',

                },
                {
                    name: 'Schedule Time',
                    selector: 'communication_schedule_time',

                },
                {

                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                    cell:row => <button onClick={()=>this.handleButtonClick(row.id,row.communication_type,row.from,row.to,row.communication_schedule_date,row.communication_schedule_time,row.description,row.alert_message)}>Update</button>
                }

            ],


        };


}





    handleButtonClick = (id,communication_type,from,to,communication_schedule_date,communication_schedule_time,decription,alert_message) => {

          if (decription==null){

              decription="";


          }

          if(alert_message == null){

              alert_message="";
          }

        this.props.history.push({
            pathname: '/updatecommunication',
            state: {
                id: id,
                communication_type :communication_type,
                from:from,
                to:to,
                communication_schedule_date:communication_schedule_date,
                communication_schedule_time:communication_schedule_time,
                description:decription,
                alert_message:alert_message

            }
        })



    };





    handleChange = date => {
        this.setState({
            startDate: date
        });

        let formatDate  = new Date(date);
        let sheduleDate = new Date(formatDate.getTime() - (formatDate.getTimezoneOffset() * 60000 ))
            .toISOString()
            .split("T")[0];

        axios('http://dev.crm.com/api/getcommunicationsbydate/'+sheduleDate, {
            method: 'GET',
            mode: 'no-cors',

        }).then(response => {

             console.log(response.data);


            this.setState({
                tableData: response.data

            });

        })

        // alert("Selected date is "+dateString);
    };

    render() {
        return (
            <div className="flex ">


                <div className="w-1/4" />
                <div className="lg:w-1/2 mt-10 p-4 bg-white">


                        <div className="p-4">
                            <h1 className="text-lg border-b border-gray-500">View Communications</h1>

                            <div className="mt-10">
                                <div className={"mt-6"}>
                                    <label>Please select the Schedule Date</label>
                                </div>

                                <div className={"mt-4"}>
                                    <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.handleChange}
                                        minDate={new Date()}
                                    />
                                </div>


                            </div>

                            <div className="mt-10">
                                <DataTable
                                    title="Available Schedule Communications"
                                    columns={this.state.tableColumns}
                                    data={this.state.tableData}
                                />
                            </div>

                        </div>

                </div>
            </div>




        );
    }
}

export default  withRouter(CommunicationList);
