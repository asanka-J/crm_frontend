import React, { Component } from 'react';

export class editUser extends Component {

    updateUser(){

        // "implement update user method and state updates'
            
    }


    render() {

         return (
            <div>

                <section className="flex justify-center ">
                    <form className="border border-gray-500 bg-gray-200  w-1/3 my-5 rounded" >
                        <h1>Edit</h1>
                        <p>{this.props.selected_user.customer_id}</p>
                        <p>{this.props.selected_user.name}</p>
                        <p>{this.props.selected_user.role}</p>
                        <p>{this.props.selected_user.image}</p>
                        <p>{this.props.selected_user.last_updated}</p>
                        <button className="bg-blue-800  hover:bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={ this.props.closeModel} >Submit</button> 
                        <button className="bg-blue-800  hover:bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={ this.props.closeModel} >Close</button> 
                   
                    </form> 
                </section>
    
            </div>
        );
    }
}

export default editUser;
