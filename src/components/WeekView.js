import React from "react";
import { Link } from "react-router-dom";
import DayView from "./DayView";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import "../assets/css/Home.css";

const WeekView = () => {
  // call use selector hook for getting state from reducer
  let habitsState = useSelector((state) => state?.habits);

  // getting habit from habits state acording to local storage id and set it on habit
  let habit = {};
  for (let i = 0; i < habitsState?.length; i++) {
    if (habitsState[i].id === Number(localStorage.getItem("id"))) {
      habit = habitsState[i];
    }
  }

  return (
    <>
    <div className="home-wrapper">
      <Navbar name="Week View" />
      <h1 className="text-center py-4" style={{ textTransform: "capitalize" }}>
        {habit.name}
      </h1>
      <div className="days-container">
        {habit.weekLog?.map((day, index) => (
          <DayView day={day} key={index} />
        ))}
      </div>
      <div className="text-center my-4">
        <button className="btn custom-btn" type="button">
          <Link to="/">Back to Detail View</Link>
        </button>
      </div>
      </div>
    </>
  );
};

export default WeekView;
