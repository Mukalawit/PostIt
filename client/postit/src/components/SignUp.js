import "bootstrap/dist/css/bootstrap.css";
import "../css/custom.css";
import { useState } from "react";
function SignUp({ onRegistration }) {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegistration(values.username, values.password, values.email);
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
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Sign Up</h3>
                  <form onSubmit={handleSubmit}>
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
                      <label className="form-label" for="email">
                        Username
                      </label>
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
                      <label className="form-label" for="email">
                        Email
                      </label>
                    </div>

                    <div className="form-outline mb-4">
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
                      <label className="form-label" for="password">
                        Password
                      </label>
                    </div>

                    <button
                      className="btn btn-primary btn-lg col-12"
                      type="submit"
                      data-testid="button"
                    >
                      Sign Up
                    </button>
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
