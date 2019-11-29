/* Import package components */
import React from "react";
import { route } from "../global";

/* Import app components */
import InboxListPage from "../pages/InboxListPage";
import EventListPage from "../pages/EventListPage";
import LearnListPage from "../pages/LearnListPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import ProfilePage from "../pages/ProfilePage";
import LessonPage from "../pages/LessonPage";
import BookmarksPage from "../pages/BookmarksPage";
import TeachListPage from "../pages/TeachListPage";
import CreateEventPage from "../pages/CreateEventPage";
import CreateLessonPage from "../pages/CreateLessonPage";
import RatingPage from "../pages/RatingPage";
import EventPage from "../pages/EventPage";
import VersionPage from "../pages/VersionPage";

/* CSS Styles */
const ContainerStyles = {
  height: "calc(100vh - 56px)",
  width: "100vw",
  overflow: "auto",
  textAlign: "center"
};

export default function SubContent({ routeTo, routeOption }) {
  function renderView() {
    switch (routeOption) {
      case route.close:
        return <p>todo: close</p>;
      case route.inboxListPage:
        return <InboxListPage parentRouteTo={routeTo} />;
      case route.eventListPage:
        return <EventListPage parentRouteTo={routeTo} />;
      case route.teachListPage:
        return <TeachListPage parentRouteTo={routeTo} />;
      case route.learnListPage:
        return <LearnListPage parentRouteTo={routeTo} />;
      case route.bookmarkListPage:
        return <BookmarksPage parentRouteTo={routeTo} />;
      case route.signinPage:
        return <SignInPage parentRouteTo={routeTo} />;
      case route.signupPage:
        return <SignUpPage parentRouteTo={routeTo} />;
      case route.profilePage:
        return <ProfilePage parentRouteTo={routeTo} />;
      case route.lessonPage:
        return <LessonPage parentRouteTo={routeTo} />;
      case route.createLearnPage:
        return <CreateLessonPage parentRouteTo={routeTo} teach={false} />;
      case route.createTeachPage:
        return <CreateLessonPage parentRouteTo={routeTo} teach={true} />;
      case route.createEventPage:
        return <CreateEventPage parentRouteTo={routeTo} />;
      case route.ratingPage:
        return <RatingPage parentRouteTo={routeTo} />;
      case route.eventPage:
        return <EventPage parentRouteTo={routeTo} />;
      case route.versionPage:
        return <VersionPage parentRouteTo={routeTo} />;
      case route.todo:
        return <p>todo: please complete this component/page</p>;
      default:
        return new Error("This view does not exist");
    }
  }

  return (
    <>
      <div style={ContainerStyles}>{renderView()}</div>
    </>
  );
}
