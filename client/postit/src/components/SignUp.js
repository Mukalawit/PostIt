import 'bootstrap/dist/css/bootstrap.css';
import { useState } from "react";
function SignUp({onRegistration}){
  const [username,setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleUsernameInput = (event) =>{
    setUsername(event.target.value);
  }

  const handleEmailInput = (event)=>{
    setEmail(event.target.value);
  }

  const handlePasswordInput=(event)=>{
    setPassword(event.target.value);
  }


  const handleSubmit=(event)=>{
    event.preventDefault();
    onRegistration(username,password,email);
  }
    return (
     <div>   
        <nav className="navbar navbar-dark bg-dark">
        <h2 className="navbar-text">PostIt</h2>
       </nav>
    <section className="vh-100" style={{backgroundColor: "#508bfc"}}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
            <div className="card-body p-5 text-center">
              <h3 className="mb-5">Sign Up</h3>
              <form onSubmit={handleSubmit}>

              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="username"
                  className="form-control form-control-lg"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameInput}
                  required
                />
                <label className="form-label" for="email">Username</label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={handleEmailInput}
                  required
                />
                <label className="form-label" for="email">Email</label>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordInput}
                  required
                />
                <label className="form-label" for="password"
                  >Password</label
                >
              </div>

              <button className="btn btn-primary btn-lg col-12" type="submit" data-testid="button">
                Sign Up
              </button>
              </form>
              <hr className="my-4" />
              <p>Already have an account? <a href="index.html">Log in</a></p>
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