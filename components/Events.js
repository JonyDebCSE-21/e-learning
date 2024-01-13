import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [interested, setInterested] = useState(0);
  const user = useSelector((state) => state.userReducer.user);

  const fetchEvents = () => {
    axios.get("/api/admin/event").then((res) => setEvents(res.data.events));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addInterestedEvent = (id) => {
    axios
      .put("/api/admin/event", {
        id,
        interested,
        userId: user._id,
      })
      .then((res) => {
        if (res.data) {
          fetchEvents();
        }
      });
  };

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <div>{event.name}</div>
            <div>{event.date}</div>
            <div>Interested: {event.interested}</div>
            <button onClick={() => addInterestedEvent(event._id)}>
              Interested
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
