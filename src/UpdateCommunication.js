import React, { Component } from "react";
import Select from 'react-select';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import cookie from "js-cookie";



const  communicationType = [
    { label: "Skype", value: "Skype"  },
    { label: "Phone", value: "Phone" }

];



class UpdateCommunication  extends Component {


    constructor(props) {
        super(props);

        this.state = {
            communication_id:this.props.location.state.id,
            communication_type:this.props.location.state.communication_type,
            communication_from :this.props.location.state.from,
            communication_to:this.props.location.state.to,
            communication_description:this.props.location.state.description,
            communication_schedule_date:this.props.location.state.communication_schedule_date,
            communication_schedule_time:this.props.location.state.communication_schedule_time,
            alert_message:this.props.location.state.alert_message,
            contactlist:[],
            communication_schedule_formatted_date: this.props.location.state.communication_schedule_date,
            errors: {}

        };

        this.handledescrption = this.handledescrption.bind(this);
        this.hanldecoomuncationto = this.hanldecoomuncationto.bind(this);
        this.handlealertmessage = this.handlealertmessage.bind(this);
        this.handlebackClick = this.handlebackClick.bind(this);
        this.updateCommuincationdetails = this.updateCommuincationdetails.bind(this);





    }

    componentDidMount() {

        axios('http://35.192.126.102:8280/services/contacts-list', {
            method: 'GET',
            mode: 'no-cors',

        }).then(response => {


            for (const [index,value] of response.data.entries()) {

                 console.log(value.name);

                this.state.contactlist.push({"label":value.name, "value":value.pk})

            }



        })



    }

    hanldecoomuncationtypechange = (selectedOption) => {

        this.state.communication_type=selectedOption.value;

    }

    hanldecoomuncationfrom = (selectedOption) => {


        this.setState({communication_from: selectedOption.label});


    }

    hanldecoomuncationto = (selectedOption) => {

        this.state.communication_to=selectedOption.label;
    }


    handledescrption(event) {
       this.setState({communication_description: event.target.value});
    }


    handleSheduleDate = date => {

        this.setState({
            communication_schedule_date: date
        });

        let formatDate  = new Date(date);
        let sheduleDate = new Date(formatDate.getTime() - (formatDate.getTimezoneOffset() * 60000 ))
            .toISOString()
            .split("T")[0];

        this.state.communication_schedule_formatted_date=sheduleDate;


    }

    onChangesheudletime = time => {


        this.setState({

            communication_schedule_time : time}

            )

        this.state.communication_schedule_time=time;



    }

    handlealertmessage(event) {

        this.setState({"alert_message":event.target.value})
    }


    handlebackClick() {

        this.props.history.push({
            pathname: '/communications',

        })
    }


    updateCommuincationdetails(){


        const data = { communication_id: this.state.communication_id,
                       communication_type :this.state.communication_type,
                       communication_from:this.state.communication_from,
                       communication_to: this.state.communication_to,
                       communication_description:this.state.communication_description,
                       communication_schedule_formatted_date:this.state.communication_schedule_formatted_date,
                       communication_schedule_time:this.state.communication_schedule_time,
                       alert_message:this.state.alert_message
                      };

        axios.post("http://dev.crm.com/api/updatecommunications", data)
            .then(res => {

                alert(res.data);
            })
            .catch(e => this.setState({ errors: e.response.data.errors  }));


    }

    render() {
        return (
            <div className="flex ">


                <div className="w-1/4" />
                <div className="lg:w-1/2 mt-10 p-4 bg-white">


                    <div className="p-4">
                        <h1 className="text-lg border-b border-gray-500">Update Communications</h1>

                        <div className="mt-10">
                            <div className={"mt-6"}>
                                <label>Communication Type</label>
                            </div>
                            <div className={"mt-4"}>

                                <label> <Select  onChange={this.hanldecoomuncationtypechange} options={ communicationType }  defaultInputValue={this.state.communication_type}/></label>
                            </div>



                        </div>


                        <div className="mt-10">
                            <div className={"mt-6"}>
                                <label>From</label>
                            </div>
                            <div className={"mt-4"}>

                                <label> <Select  onChange={this.hanldecoomuncationfrom}  options={ this.state.contactlist } defaultInputValue={this.state.communication_from} /></label>
                            </div>



                        </div>


                        <div className="mt-10">
                            <div className={"mt-6"}>
                                <label>To</label>
                            </div>
                            <div className={"mt-4"}>

                                <label> <Select  onChange={this.hanldecoomuncationto}  options={ this.state.contactlist } defaultInputValue={this.state.communication_to} /></label>
                            </div>



                        </div>


                        <div className="mt-10">
                            <div className={"mt-6"}>
                                <label>Description</label>
                            </div>
                            <div className={"mt-4"}>

                                <textarea  rows="8"  cols="50" value={this.state.communication_description}   onChange={this.handledescrption}  />
                            </div>



                        </div>

                        <div className="mt-10">
                            <div className={"mt-6"}>
                                <label>Schedule Date</label>
                            </div>
                            <div className={"mt-4"}>

                                <div className={"mt-4"}>
                                    <DatePicker
                                        selected={  new Date(this.state.communication_schedule_date)}
                                        minDate={new Date()}
                                        onChange={this.handleSheduleDate}
                                    />
                                </div>
                            </div>



                        </div>


                        <div className="mt-10">
                            <div className={"mt-6"}>
                                <label>Schedule Time</label>
                            </div>
                            <div className={"mt-4"}>

                                <div className={"mt-4"}>
                                    <TimePicker
                                        onChange={this.onChangesheudletime}
                                        value={this.state.communication_schedule_time}
                                    />
                                </div>
                            </div>



                        </div>


                        <div className="mt-10">
                            <div className={"mt-6"}>
                                <label>Alert Message</label>
                            </div>
                            <div className={"mt-4"}>

                                <div className={"mt-4"}>
                                    <textarea  rows="8"  cols="50" value={
                                        this.state.alert_message


                                    }   onChange={this.handlealertmessage}  />
                                </div>
                            </div>



                        </div>



                        <div className="mt-10">
                            <div className={"mt-6"}>


                                <span> <button onClick={this.updateCommuincationdetails}
                                    className="bg-purple-600 hover:bg-teal-dark text-white  text-lg  p-1 rounded"
                                > Save Changes
                                </button> </span> <span>  <button onClick={this.handlebackClick}
                                className=" bg-purple-600 hover:bg-teal-dark text-white  text-lg  p-1 rounded"
                            > Back
                                </button> </span>


                            </div>
                        </div>
                        <div className="mt-4items-center">

                        </div>







                    </div>

                </div>
            </div>




        );
    }
}

export default  UpdateCommunication;
