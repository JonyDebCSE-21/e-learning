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
      <h1 className="my-5 text-lg font-bold border-b-2 border-blue-700 mb-3">
        Upcoming Events
      </h1>
      {events.length > 0 &&
        events.map((event) => (
          <div
            className="flex items-center justify-evenly mb-3 gap-5 border-2 border-blue-600 p-2 rounded-md"
            key={event._id} // Add a unique key for each event
          >
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
              <img className="w-full" src={event?.image} alt="" />
            </div>
            <div className="flex flex-col gap-2 justify-evenly">
              <div className="text-lg">Event: {event?.title}</div>
              <div className="text-lg">{event?.description}</div>
              <div>Date: {new Date(event?.date).toLocaleDateString()}</div>
              <div>
                <span
                  onClick={() => {
                    setInterested(interested + 1);
                    addInterestedEvent(event._id);
                  }}
                  className={`px-3 py-1 block cursor-pointer rounded-md font-bold ${
                    event?.interested?.includes(user?._id)
                      ? "bg-red-500 text-white" // Change the style for "Not Interested"
                      : "bg-blue-600 text-white" // Change the style for "Interested"
                  }`}>
                  {event?.interested?.includes(user?._id)
                    ? "Not Interested"
                    : "Interested"}
                </span>{" "}
                <span className="text-green-600 ml-2 font-bold">
                  {event?.interested?.length} person
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Events;
