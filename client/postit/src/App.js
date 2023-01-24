/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import API_ROUTES from "./utils/constants";
import { useState } from "react";

function App() {
  const [displaySignIn, setDisplaySignIn] = useState(false);

  const handleRegistration = async (username, password, email) => {
    try {
      const response = await axios.post(API_ROUTES.SIGN_UP, {
        username,
        password,
        email,
      });

      if (response.status === 201) setDisplaySignIn(true);
    } catch (e) {
      console.log(e);
    }
  };
  return displaySignIn ? (
    <SignIn />
  ) : (
    <SignUp onRegistration={handleRegistration} />
  );
}

export default App;
