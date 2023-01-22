import 'bootstrap/dist/css/bootstrap.css';

function SignIn(){
    return <div>
         <nav class="navbar navbar-dark bg-dark">
        <h2 class="navbar-text">PostIt</h2>
       </nav>

       <section class="vh-100" style={{backgroundColor: "#508bfc"}}>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card shadow-2-strong" style={{borderRadius: "1rem"}}>
                <div class="card-body p-5 text-center">
                  <h3 class="mb-5">Sign In</h3>
                  <form>
  
                  <div class="form-outline mb-4">
                    <input
                      type="text"
                      id="username"
                      class="form-control form-control-lg"
                      placeholder="Username"
                    />
                    <label class="form-label" for="email">Username</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      class="form-control form-control-lg"
                      placeholder="Password"
                      name="password"
                    />
                    <label class="form-label" for="password"
                      >Password</label>
                  </div>
  
                  <button class="btn btn-primary btn-lg col-12" type="submit">
                    Sign In
                  </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
}

export default SignIn;