import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./Components/Header/Header";
import Profile from "./Components/Profile/Profile";
import SignUp from "./Components/SignUp/SignUpForm";

function App() {
  const [userState, setUserState] = useState({});

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Header />
                <SignUp setUserState={setUserState} />
              </div>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              userState ? (
                <Profile
                  setUserState={setUserState}
                  userName={userState.firstName}
                />
              ) : (
                <div>
                  <Header />
                  <SignUp setUserState={setUserState} />
                </div>
              )
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
