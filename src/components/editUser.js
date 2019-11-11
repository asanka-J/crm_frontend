import React, { Component } from 'react';
import axios from 'axios';

export class editUser extends Component {
    

    constructor(props) {
        super(props);
      
        this.state = { userID:props.selected_user.id,email: props.selected_user.email_address, name: props.selected_user.name, errors: {} ,image: props.selected_user.image,role: props.selected_user.role ,last_updated:props.selected_user.last_updated}
    }


    updateUser = e => {
        e.preventDefault();
        const data = { email: this.state.email, name: this.state.name };
         
        axios.patch("http://159.65.183.33:8000/api/users/update/"+this.state.userID, data)
          .then(res => {
         alert("sucessfully updated");
          })
        
      };

    handleInput = e => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        
        this.setState({ [name]: value });
      };

    setSelectedOption(e){
        e.preventDefault();
        console.log(e.target.value)
    }


    render() {

         return (
            <div>

            
                <div className="p-4">
                  

                    <section className="flex justify-center">
                        <form className="border border-gray-500 bg-gray-200  w-1/3 p-4 my-5 rounded" >
                        <h1 className="text-lg border-b border-gray-500">
                      Edit User Details
                    </h1>
                       
                            <div className="mt-4">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    onChange={this.handleInput}
                                    value={this.state.name}
                                    className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                                />
                                </div>
                            
                                <div className="mt-4">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={this.handleInput}
                                    value={this.state.email}
                                    className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                                />
                                </div>
                            

                           

                                <div className="mt-4">
                                <label>Role</label>
                                    <select className="block appearance-none w-full bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" onChange={this.setSelectedOption} id="grid-state">
                                    <option  value={this.state.role} disabled>{this.props.selected_user.role}</option>
                                    <option  value="User">User</option>
                                    <option  value="Admin">Admin</option>
                                    <option  value="Super Admin">Super Admin</option>
                                </select>
                                </div>

                                <div className="mt-4">
                                <label>Image</label>
                                <input type="file" />
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
                                    Upload
                                </button>
                                </div>

                                <div className="mt-4">
                                <label>Last Updated</label>
                                <div className="select-none ">
                                     {this.state.last_updated}
                                    </div>
                             
                                </div>

                                <button className="bg-blue-800  hover:bg-blue-500 text-white font-bold py-2 px-4  rounded" onClick={ this.updateUser} >Submit</button> 
                                <button className="bg-blue-800  hover:bg-blue-500 text-white font-bold py-2 px-4 m-4 rounded" onClick={ this.props.closeModel} >Back</button> 
                    


                        </form> 
                    </section>
                </div>                
               
            </div>
        );
    }
}

export default editUser;
