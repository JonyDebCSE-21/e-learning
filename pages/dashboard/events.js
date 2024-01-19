import DashboardLayout from "@/components/layout/DashboardLayout";
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

  const deleteEvent = (id) => {
    // console.log(id);
    axios.delete(`/api/admin/event?id=${id}`).then((res) => {
      if (res.data) {
        setEvents(events.filter((e) => e._id != id));
      }
    });
  };
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl text-[#D700E2] font-semibold mb-3 border-b border-[#A5009B] pb-4">
          Your Events
        </h1>
        <div className="grid grid-cols-2 gap-3">
          {events.length > 0 &&
            events.map((event) => (
              <div className="flex items-center justify-evenly mb-3 gap-5 border-2 border-blue-600 p-2 rounded-md">
                <div className="col-span-4 overflow-hidden flex justify-center items-center">
                  <img
                    className=" w-[100px] h-[100px]"
                    src={event.image}
                    alt=""
                  />
                </div>

                <div className="flex flex-col gap-2 justify-evenly text-white">
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
                      {event?.interested?.length} person
                    </span>
                  </div>
                </div>
                <div
                  onClick={() => {
                    deleteEvent(event._id);
                  }}
                  className="text-white bg-red-600 px-5 py-1 rounded-md font-bold cursor-pointer">
                  Delete
                </div>
              </div>
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Events;
