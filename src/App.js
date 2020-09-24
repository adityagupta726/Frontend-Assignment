import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";

import "./App.css";

const responseGoogle = (response) => {
  console.log(response);
};
//validation
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
            <div className="row">
        <div className="logo">
          <img src={require("./bobble.png")} />
          </div>
        </div>

        <div className="form-wrapper">
          <p><strong>SIGN UP</strong></p>
          <h1>Create your account</h1>
          <p style={{ color: "grey", marginTop: "0px" }}>
              Laanhsb snjsnhbg hsbdgydhe absgjsgdbhn hsbdg
            </p>
          <div></div>
          <div>
            <GoogleLogin
              clientId="426596176833-q44764j0ml732krbotan0155a2ni4a57.apps.googleusercontent.com"
              data-size="medium"
              buttonText="Sign up with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            &nbsp;&nbsp;
            <div
              class="fb-login-button"
              data-size="medium"
              data-button-type="login_with"
              data-layout="default"
              data-auto-logout-link="false"
              // data-use-continue-as="false"
              data-width=""
            ></div>
          </div>

          <br></br>
          <div class="separator"> &nbsp;&nbsp; or &nbsp;&nbsp; </div>
          <br />

          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName"></label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName"></label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email"></label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email Address"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password"></label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <small>
                By clicking Sign Up, you agree to our{" "}
                <a href="">Terms of Use</a> and our{" "}
                <a href="">Privacy Policy</a>.
              </small>
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
