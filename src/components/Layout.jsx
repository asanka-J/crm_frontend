import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import cookie from "js-cookie";

function Layout(props) {

  const handleLogout = e => {
    e.preventDefault();
    cookie.remove("token");
    props.logout();
  };
  
  return (
    <div>
      <nav className="flex justify-between">
        <h1 className="py-4 mx-10">User Module</h1>
        <div className="flex justify-between">
          {!props.loggedIn ? (
            <Fragment>
              <Link
                className="m-3 py-1 px-2 bg-purple-700 text-white rounded inline-block"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="m-3 py-1 px-2 bg-purple-700 text-white rounded inline-block"
                to="/register"
              >
                Register
              </Link>
            </Fragment>
          ) : (
            <Fragment>

              <Link
                  className="m-3 py-1 px-2 bg-purple-700 text-white rounded inline-block"
                  to="/dashboard"
                >
                Dashboard
              </Link>
              <Link
                className="m-3 py-1 px-2 bg-purple-700 text-white rounded inline-block"
                to="/profile"
              >
                Profile
              </Link>
              
              <Link
                className="m-3 py-1 px-2 bg-purple-700 text-white rounded inline-block"
                to="/logout"
                onClick={handleLogout}
              >
                Logout
            </Link>
            </Fragment>
          )}
        </div>
      </nav>
      {props.children}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: "SET_LOGOUT" })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
