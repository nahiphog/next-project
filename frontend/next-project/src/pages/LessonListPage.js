/* Import package components */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { route, getApiRoute } from "../global";

/* Import app components */
import DialogPage from "../components/DialogPage";
import SearchBar from "../components/SearchBar";
import ListCard from "../components/ListCard";

export default function LessonListPage({ teach }) {
  const [routeArgs, setRouteArgs] = useState([]);
  const [routeOption, setRouteOption] = useState(route.close);
  const [dialogOpen, setDialogOpen] = useState(false);
  const routeTo = option => {
    if (option === route.close) {
      setDialogOpen(false);
    } else {
      setDialogOpen(true);
    }
    setRouteOption(option);
  };
  const [lessonsData, setLessonsData] = useState({
    datas: []
  });

  useEffect(() => {
    axios
      .get(`${getApiRoute("lessons/filter?")}teach=${teach}`)
      .then(result => {
        console.log(result.data);
        setLessonsData({
          datas: result.data
        });
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }, []);

  return (
    <div>
      <div style={{ width: "100vw" }}>
        <SearchBar setLessonsData={setLessonsData} teach={teach}/>
      </div>
      <div
        style={{ marginTop: "10px", display: "grid", justifyContent: "center", gridGap:"10px" }}
        id="cardBox"
      >
        {lessonsData.datas.map(lesson => (
          <div
            key={lesson.id}
            onClick={() => {
              routeTo(route.lessonPage);
              setRouteArgs(lesson);
            }}
          >
            <ListCard lesson={lesson} />
          </div>
        ))}
      </div>
      <DialogPage
        routeTo={routeTo}
        routeOption={routeOption}
        routeArgs={routeArgs}
        dialogOpen={dialogOpen}
      />
    </div>
  );
}
