import React, { useEffect, useState } from "react";
import axios from "axios";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/rooms/") // direct working backend URL
      .then((response) => {
        setRooms(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading rooms...</p>;
  if (rooms.length === 0) return <p>No conference rooms available.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Conference Rooms</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <strong>{room.name}</strong> — Capacity: {room.capacity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomList;
