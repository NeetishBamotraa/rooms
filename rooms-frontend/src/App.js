import React, { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import ChatApp from "./ChatApp.js";
import MainPage from "./MainPage.js";

function App() {
  const [userlogin, setUserlogin] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              setUserlogin={(val) => {
                setUserlogin(val);
              }}
            />
          }
        />
        <Route path="/chatapp" element={<ChatApp userlogin={userlogin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
