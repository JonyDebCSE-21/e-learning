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
            className="flex flex-col md:flex-row items-start justify-evenly mb-2 gap-1 border-2 border-blue-600 p-1 rounded-2xl"
            key={event._id} // Add a unique key for each event
          >
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={event?.image}
                alt=""
              />
            </div>

            <div className="flex flex-col gap-1 justify-evenly md:ml-4">
              {/* Set a fixed width for the title container */}
              <div className="text-base font-bold md:w-55">{event?.title}</div>
              <div className="text-sm font-medium ">
                Date: {new Date(event?.date).toLocaleDateString()}
              </div>
              <div className="text-xs md:mt-auto">{event?.description}</div>

              {/* Move the description under the image */}

              <div>
                <span
                  onClick={() => {
                    setInterested(interested + 1);
                    addInterestedEvent(event._id);
                  }}
                  className={`px-3 py-1 inline-block cursor-pointer rounded-md font-bold ${
                    event?.interested?.includes(user?._id)
                      ? "bg-orange-600 text-white"
                      : "bg-blue-600 text-white"
                  }`}>
                  {event?.interested?.includes(user?._id)
                    ? "Not Interested"
                    : "Interested"}{" "}
                  <span
                    className={`text-black font-bold ${
                      event?.interested?.length > 0 ? "" : ""
                    }`}>
                    {event?.interested?.length}
                  </span>
                </span>
              </div>
              {/* <div className="text-lg md:mt-auto">{event?.description}</div> */}
            </div>

            {/* Move the description to the bottom */}
          </div>
        ))}
    </div>
  );
};

export default Events;
