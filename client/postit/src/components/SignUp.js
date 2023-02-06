import "bootstrap/dist/css/bootstrap.css";
import "../css/custom.css";
import { useState, useEffect } from "react";
import validator from "validator";
import analyzePassword from "../utils/analyzePassword";
function SignUp({ onRegistration, onError }) {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [values, setValues] = useState(initialValues);
  const [errMsg, setErrMsg] = useState("");
  const [passwordAdvice, setPasswordAdvice] = useState("");
  const [isValid, setIsValid] = useState(false);

  const hasFilledAllFields = () => {
    return (
      values.email &&
      values.password &&
      values.confirmPassword &&
      values.username
    );
  };

  const validate = (password) => {
    if (
      validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setPasswordAdvice("Password is strong");
    } else {
      setPasswordAdvice(analyzePassword(password));
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      validate(value);
    } else if (name === "confirmPassword") {
      doPasswordComparison(value);
    }
    setValues({ ...values, [name]: value });
  };
  const doPasswordComparison = (matchingPassword) => {
    if (validator.equals(values.password, matchingPassword)) {
      setPasswordAdvice("Passwords match");
    } else {
      setPasswordAdvice("Passwords do not match");
    }
  };
  useEffect(() => {
    const fieldStatus = hasFilledAllFields();
    setIsValid(fieldStatus);
    setErrMsg("");
  }, [values.username, values.email, values.password, values.confirmPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await onRegistration(
      values.username,
      values.password,
      values.email
    );

    if (response.status === 404) {
      setErrMsg("Not Found, connection to the server failed");
    } else if (response.status === 400) {
      setErrMsg("Bad Request");
    } else if (response.status === 409) {
      setErrMsg("This account is already in use");
    }
  };
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <h2 className="navbar-text">PostIt</h2>
      </nav>
      <section className="vh-100 custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong custom-rad">
                <div className="card-body p-5 text-center custom-shadow">
                  <h3 className="mb-5">Sign Up</h3>
                  <form onSubmit={handleSubmit}>
                    <div
                      className={errMsg ? "alert alert-danger" : "offscreen"}
                      role="alert"
                    >
                      {errMsg}
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="username"
                        className="form-control form-control-lg"
                        placeholder="Username"
                        name="username"
                        value={values.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        placeholder="name@domain.com"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <div
                        className={
                          passwordAdvice ? "alert alert-warning" : "offscreen"
                        }
                      >
                        {passwordAdvice}
                      </div>
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="confirmPassword"
                        className="form-control form-control-lg"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <button
                        className="btn btn-primary btn-lg col-12"
                        type="submit"
                        data-testid="button"
                        disabled={!isValid}
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                  <hr className="my-4" />
                  <p>
                    Already have an account? <a href="index.html">Log in</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
