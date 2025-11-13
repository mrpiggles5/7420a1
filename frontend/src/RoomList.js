import React, { useEffect, useState } from "react";
import axios from "axios";

function RoomList({ token }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/rooms/", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((response) => {
        setRooms(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
        setLoading(false);
      });
  }, [token]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Conference Rooms</h1>
      {loading ? (
        <p>Loading rooms...</p>
      ) : rooms.length > 0 ? (
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>
              <strong>{room.name}</strong> — Capacity: {room.capacity}
              <br />
              <em>{room.location}</em>
              <br />
              {room.description && <p>{room.description}</p>}
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No rooms available.</p>
      )}
    </div>
  );
}

export default RoomList;
