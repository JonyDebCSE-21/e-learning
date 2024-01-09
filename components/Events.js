import axios from "axios";
import React, { useEffect, useState } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [interested, setInterested] = useState(0);

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
      })
      .then((res) => {
        if (res.data) {
          fetchEvents();
        }
      });
  };

  // console.log("in", interested);

  // console.log(events);
  return (
    <div>
      <h1 className="my-5 border-b-2 border-blue-700 mb-3">Events</h1>
      {events.length > 0 &&
        events.map((event) => (
          <div className="flex items-center justify-evenly mb-3 gap-5 border-2 border-blue-600 p-2 rounded-md">
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
              <img className="w-full" src={event.image} alt="" />
            </div>
            <div className="flex flex-col gap-2 justify-evenly">
              <div className="text-lg ">Event: {event.title}</div>
              <div>Date: {event.date}</div>
              <div>
                <span
                  onClick={() => {
                    setInterested(interested + 1);
                    addInterestedEvent(event._id);
                  }}
                  className="bg-blue-600 px-3 py-1 block cursor-pointer rounded-md text-white font-bold">
                  Interested
                </span>{" "}
                <span className="text-green-600 ml-2 font-bold">
                  {event.interested ? event.interested : 0} person
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Events;
