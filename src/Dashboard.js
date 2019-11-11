import React, { Component } from 'react'
import Axios from 'axios'
import ReactTable  from 'react-table'
import "react-table/react-table.css"
import EditUser from './components/editUser'



export class Dashboard  extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
        users:[],selectedUser:[],showModel:false
      }

      this.closeModel = this.closeModel.bind(this)
    }

    
  
    componentDidMount(){
      const url= "http://159.65.183.33:8000/api/users";
  
      Axios.get(url).then(users => {
        this.setState({users:users.data}) 
        });
  
    }

    refreshUsers(){
      console.log("refreshing");
      const url= "http://159.65.183.33:8000/api/users";
  
      Axios.get(url).then(users => {
        this.setState({users:users.data}) 
        });

    }


    deleteRow(userID){
      Axios.post("http://159.65.183.33:8000/api/users/delete/"+userID).then(() => {
     
        this.refreshUsers();
        });
    }

    EditRow(userID){
      Axios.get("http://159.65.183.33:8000/api/users/"+userID).then(response => {
     
        this.setState({selectedUser:response.data,showModel:true})
        });
    }

    closeModel(){
      this.setState({showModel:false})
      this.refreshUsers()
    }

  render() {
    const columns=[ 
      {
        Header: 'Users',
        columns: [
          {
            Header: 'User ID',
            accessor: 'id',
            filterable : true,
            width:120,
            maxWidth:150,
            minWidth:100,
          
          },
          {
            Header: 'Name',
            accessor: 'name',
            filterable : true
          },
          {
            Header: 'Email address',
            accessor: 'email_address',
            filterable : true
          },
          {
            Header: 'role',
            accessor: 'role',
          },
          {
            Header: '',
            Cell: props =>{
             return(
               <button className="bg-blue-800  hover:bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={()=>{
                this.EditRow(props.original.id)
              }}
               
               >Edit</button> 
             )
            },
            sortable:false,
            width:120,
            maxWidth:150,
            minWidth:100,
          },
          {
            Header: '',
            Cell: props =>{
             return(
               <button className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={()=>{
                 this.deleteRow(props.original.id)
               }}>Delete</button>
             )
            },
            sortable:false,
            width:120,
            maxWidth:150,
            minWidth:100,

          },
        ],
      },
    ]

    if(this.state.showModel){
      return (
        <div>
          <EditUser selected_user={this.state.selectedUser} closeModel={this.closeModel}></EditUser>       
        </div>
      );
      
    }

      return (
        <div className=" bg-gray-200">
  
         <section className="p-10">
         {/* <div className="w-1/3" /> */}

            <ReactTable
              columns={columns}
              data={this.state.users}
              noDataText={"Loading User list"}
              ></ReactTable>
        </section>
        
      </div>
      );
  }
}




export default Dashboard;


