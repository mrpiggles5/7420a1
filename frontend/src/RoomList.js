import React, { useEffect, useState } from "react";
import axios from "axios";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/rooms/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  if (loading) return <p>Loading rooms...</p>;

  return (
    <div>
      <h2>Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <strong>{room.name}</strong> — Capacity: {room.capacity}
            {room.location && (
              <> — Location: {room.location}</>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomList;
