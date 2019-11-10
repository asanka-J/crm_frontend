import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";
import Error from "./components/Error";
import { saveToken } from './utils';
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      selectedFile:null,
      errors: {}
    };
  }
  handleForm = e => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    };
    axios
      .post("http://159.65.183.33:8000/api/auth/register", data)
      // .post("http://127.0.0.1:8000/api/auth/register", data)
     
      .then(res => {
        saveToken(res.data.access_token);
        cookie.set("token", res.data.access_token);
        cookie.set("user", res.data.user);
        this.props.history.push("/profile");
      })
      .catch(e => this.setState({ errors: e.response.data.errors }));
  };

  handleInput = e => {
    console.log(e.target.name);
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="flex">
        <div className="w-1/3" />
        <div className="w-1/3 mt-10 p-4 bg-white">
          <form className="border border-gray-500" onSubmit={this.handleForm}>
            <div className="p-4">
              <h1 className="text-lg border-b border-gray-500">Register</h1>
              <div className="mt-4">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder=" Name"
                  onChange={this.handleInput}
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                <Error
                  error={
                    this.state.errors["name"] ? this.state.errors["name"] : null
                  }
                />
              </div>
              <div className="mt-4">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={this.handleInput}
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                <Error
                  error={
                    this.state.errors["email"]
                      ? this.state.errors["email"]
                      : null
                  }
                />
              </div>
              <div className="mt-4">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={this.handleInput}
                  placeholder=" Password"
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
                <Error
                  error={
                    this.state.errors["password"]
                      ? this.state.errors["password"]
                      : null
                  }
                />
              </div>
              <div className="mt-4">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="password_confirmation"
                  onChange={this.handleInput}
                  placeholder="Confirm password"
                  className="mt-1 p-2 bg-gray-200 rounded border border-gray-400 w-full"
                />
              </div>
              <div className="mt-4">
                  <button className="block mt-2 bg-purple-600 hover:bg-teal-dark text-white  text-lg mx-auto p-1 rounded" type="submit">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
