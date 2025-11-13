import React, { useState } from "react";
import RoomList from "./RoomList";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
  };

  const token = localStorage.getItem("accessToken");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {isLoggedIn ? (
        <>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#d9534f",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "8px 12px",
              marginBottom: "15px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
          <RoomList token={token} />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
