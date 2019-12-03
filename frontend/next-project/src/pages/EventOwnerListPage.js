/* Import package components */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { route, getApiRoute } from "../global";
import useStores from "../hooks/useStores";

/* Import app components */
import DialogPage from "../components/DialogPage";
import EventOwnerCard from "./EventOwnerCard";
import LoadingNav from "../components/LoadingNav";

export default function EventOwnerListPage({ parentRouteTo }) {
  const [routeArgs, setRouteArgs] = useState([]);
  const [routeOption, setRouteOption] = useState(route.close);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const routeTo = option => {
    if (option === route.close) {
      setDialogOpen(false);
    } else {
      setDialogOpen(true);
    }
    setRouteOption(option);
  };
  const handleLinkLesson = lesson_id => {
    axios
      .get(`${getApiRoute("lessons/")}${lesson_id}`)
      .then(result => {
        const lessonData = result.data;
        // console.log(lesson);
        setRouteArgs({ lesson: lessonData, showAction: false });
        routeTo(route.lessonPage);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  };
  const handleAction = (event_id, action) => {
    console.log(action);
    axios
      .post(
        `${getApiRoute("events/")}${event_id}/status`,
        { status: action },
        getToken()
      )
      .then(result => {
        // console.log(result);
        console.log("approve/decline event successfully");
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
    parentRouteTo(route.close);
  };
  const [eventList, setEventList] = useState([]);
  const {
    userStore: { getToken, currentUser }
  } = useStores();
  useEffect(() => {
    axios
      .get(
        `${getApiRoute("events/my")}`,
        {
          params: {
            status: ["pending"],
            user_name: currentUser.name
          }
        },
        getToken()
      )
      .then(result => {
        const eventlist = result.data.data.owner;
        setEventList(eventlist);
        setIsLoading(false);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }, []);

  if (isLoading) {
    return <LoadingNav />;
  }
  return (
    <>
      {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
      <div
        style={{
          marginTop: "10px",
          display: "grid",
          justifyContent: "center",
          gridGap: "10px"
        }}
        id="cardBox"
      >
        {eventList.map((event, index) => (
          <EventOwnerCard
            key={index}
            event={event}
            handleLinkLesson={handleLinkLesson}
            handleAction={handleAction}
          />
        ))}
        {/* </div> */}
        <DialogPage
          routeTo={routeTo}
          routeOption={routeOption}
          routeArgs={routeArgs}
          dialogOpen={dialogOpen}
        />
      </div>
    </>
  );
}
