import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addHabit } from "../redux/features/habitSlice";
import "../assets/css/Navbar.css";

const Navbar = ({ name }) => {
  const dispatch = useDispatch();
  const [hour, setHour] = useState(0);
  const [habitName, setHabitName] = useState("");

  useEffect(() => {
    const date = new Date();
    setHour(date.getHours());
  }, []);

  const handleSaveClick = () => {
    if (habitName.trim() === "") {
      alert("Please enter a habit name.");
      return;
    }

    dispatch(addHabit(habitName));
    setHabitName("");
    // alert();
    document.getElementById("myModal")?.classList.remove("show");
  };

  return (
    <>
      <div className="navbar">
        <h3>
          {hour <= 12
            ? "Morning"
            : hour <= 17
            ? "Afternoon"
            : hour <= 21
            ? "Evening"
            : "Night"}
        </h3>
        <div className="right-nav">
          <h5>{name}</h5>
          <button
            className="addhabit-btn"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            <i className="fa-solid fa-plus"></i> Add Habits
          </button>
        </div>
      </div>

      <div
        className="modal fade myModal"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                New Habit
              </h5>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="habitName" className="form-label">
                  NAME
                </label>
                <input
                  type="text"
                  className="form-control py-3"
                  id="habitName"
                  value={habitName}
                  onChange={(e) => setHabitName(e.target.value)}
                  placeholder="Enter habit"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary px-5"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn custom-btn text-white px-5"
                data-bs-dismiss="modal"
                onClick={handleSaveClick}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Navbar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Navbar;
