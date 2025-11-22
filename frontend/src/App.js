import React, { useState, useEffect } from "react";
import Login from "./Login";
import RoomList from "./RoomList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Check if token exists on page load
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("username");

    if (token) {
      setIsLoggedIn(true);
      if (storedUser) setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");

    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      {/* HEADER */}
      <header style={{ marginBottom: "20px", fontSize: "18px" }}>
        {isLoggedIn ? (
          <>
            <strong>Logged in as {username}</strong>
            <button
              onClick={handleLogout}
              style={{
                marginLeft: "10px",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <strong>Please log in</strong>
        )}
      </header>

      {/* MAIN CONTENT */}
      {isLoggedIn ? (
        <RoomList />
      ) : (
        <Login
          onLogin={(user) => {
            setIsLoggedIn(true);
            setUsername(user);
          }}
        />
      )}
    </div>
  );
}

export default App;
