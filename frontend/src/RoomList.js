import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://7420a1.vercel.app" // your deployed domain (can adjust later)
    : "http://127.0.0.1:8000";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get rooms
        const roomRes = await axios.get(`${API_BASE_URL}/api/rooms/`);
        setRooms(roomRes.data);

        // get user's reservations (only if logged in)
        if (accessToken) {
          const resRes = await axios.get(`${API_BASE_URL}/api/reservations/`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setReservations(resRes.data);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  const handleBook = async (roomId) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/reservations/`,
        { room: roomId },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setMessage("✅ Room booked successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error booking room.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  };

  if (loading) return <p>Loading rooms...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Conference Rooms</h1>
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
        Logout
      </button>
      {message && <p>{message}</p>}

      <ul>
        {rooms.map((room) => {
          const isReserved = reservations.some(
            (r) => r.room === room.id
          );
          return (
            <li key={room.id} style={{ marginBottom: "10px" }}>
              <strong>{room.name}</strong> — Capacity: {room.capacity} <br />
              <em>{room.location}</em> <br />
              {isReserved ? (
                <span style={{ color: "green" }}>Already reserved</span>
              ) : (
                <button onClick={() => handleBook(room.id)}>
                  Book Room
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RoomList;
