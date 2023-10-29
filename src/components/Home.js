import React from "react";
import Habits from "./Habits";
import Navbar from "./Navbar";
import "../assets/css/Home.css";

const Home = () => {
  return (
    <>
      <div className="home-wrapper">
        <Navbar name="Detail View" />
        <Habits />
      </div>
    </>
  );
};

export default Home;
