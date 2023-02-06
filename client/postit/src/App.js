/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import API_ROUTES from "./utils/constants";
import { useState } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { RotatingLines } from "react-loader-spinner";

function App() {
  const promiseInProgress = usePromiseTracker();
  const [displaySignIn, setDisplaySignIn] = useState(false);

  const handleRegistration = async (username, password, email) => {
    try {
      const response = await axios.post(API_ROUTES.SIGN_UP, {
        username,
        password,
        email,
      });

      if (response.status === 201) {
        setDisplaySignIn(true);
      } else {
        return response;
      }
    } catch (e) {
      return e.response;
    }
  };
  return displaySignIn ? (
    promiseInProgress === true ? (
      <RotatingLines
        strokeColor="blue"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    ) : (
      <SignIn />
    )
  ) : (
    <SignUp onRegistration={handleRegistration} />
  );
}

export default App;
