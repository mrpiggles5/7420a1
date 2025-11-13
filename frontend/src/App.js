import React, { useState } from "react";
import RoomList from "./RoomList";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  return (
    <div>
      {isLoggedIn ? (
        <RoomList />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
