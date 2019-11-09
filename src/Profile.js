import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import loginImg from "./logo.svg";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { email: props.email, name: props.name, phoneNo: props.phoneNo, errors: {} ,selectedFile: props.image};
  }

  handleInput = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleForm = e => {
    e.preventDefault();
    const data = { email: this.state.email, name: this.state.name };
     
    axios.patch("http://159.65.183.33:8000/api/auth/update", data)
      .then(res => {
        // console.log(res.data);

        this.props.updateUser(res.data.user);
      })
      // .catch(e => this.setState({ errors: e.response.data }));
  };

  // fileChangedHandler = event => {
  //   this.setState({ selectedFile: event.target.files[0] })
  // }

  // uploadHandler = () => { // to implement
  //   const formData = new FormData()
  //   formData.append(
  //     'myFile',
  //     this.state.selectedFile,
  //     this.state.selectedFile.name
  //   )

  //   axios.post('http://159.65.183.33:8000/api/auth/profile-upload', formData, {
  //     onUploadProgress: progressEvent => {
  //       console.log(progressEvent.loaded / progressEvent.total)
  //     }
  //   })
  // }

  render() {
    return (

      <div>
 



      <section className="flex justify-center ">
      
        
        <form className="border border-gray-500 bg-gray-200  w-1/3 my-5 rounded" onSubmit={this.handleForm} >
          <div className="p-4">
            <h1 className="text-lg border-b border-gray-500">
              Edit Profile Details
            </h1>

          <div className="flex justify-center ">
            <div className="px-6 py-4 justify-center ">
            <img className="" src="https://tricky-photoshop.com/wp-content/uploads/2017/08/final-1.png" alt="Profile Image"/>
              
            </div>
          
          </div>
          
           <div className="flex justify-center ">
           <input type="file" />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={this.uploadHandler}>
            Upload
          </button>
          </div>

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
              <label>Telephone number</label>
              <input
                type="text"
                name="phoneNo"
                placeholder="Telephone number"
                onChange={this.handleInput}
                value={this.state.phoneNo}
                className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
              />
            </div>



            <div className="mt-4">
              <input
                type="submit"
                value="Update"
                className="mt-1 p-2 border border-gray-400 rounded cursor-pointer bg-purple-600 text-white"
              />
            </div>
          </div>
        </form>
      </section>
     
  </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.auth.user.name,
    email: state.auth.user.email
  };
};
export default connect(
  mapStateToProps,
  null
)(Profile);
