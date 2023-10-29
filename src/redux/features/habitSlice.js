import { createSlice } from "@reduxjs/toolkit";
let id = 1;

function getPreviousDaysOfWeek() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const previousDays = [];

  for (let i = 0; i <= 6; i++) {
    const previousDay = new Date(today);
    previousDay.setDate(today.getDate() - i);
    const dayName = daysOfWeek[previousDay.getDay()];
    const day = previousDay.getDate();
    const month = previousDay.getMonth() + 1; // Months are 0-based
    const year = previousDay.getFullYear();

    previousDays.push({ dayName, day, month, year });
  }

  return previousDays.reverse(); // Reversing the array to display in ascending order
}

export const habitSlice = createSlice({
  name: "habits",
  initialState: [],
  reducers: {
    addHabit: (state, action) => {
      const today = new Date();
      let day = today.getDate() - today.getDay();
      console.log(day);
      const month = today.getMonth();
      const year = today.getFullYear();
      const prevDays = getPreviousDaysOfWeek();

      // {
      //   id: 0,
      //   day: "Sunday",
      //   dd:day,
      //   mm:month,
      //   yyyy:year,
      //   isDone: "",
      // },
      const habit = {
        id: id++,
        name: action.payload,
        weekLog: prevDays.map((x, idx) => ({
          id: idx,
          day: x.dayName,
          dd: x.day,
          mm: x.month,
          yyyy: x.year,
          isDone: false,
        })),
      };
      console.log(habit.weekLog);
      const tempHabits = [...state, habit];
      return tempHabits;
    },

    deleteHabit: (state, action) => {
      const tempHabits = state.filter((habit) => habit.id !== action.payload);
      return tempHabits;
    },
    habitDone: (state, action) => {
      let tempHabits = state;
      for (let i = 0; i < tempHabits.length; i++) {
        if (tempHabits[i].id === Number(localStorage.getItem("id"))) {
          tempHabits[i].weekLog[action.payload].isDone = true;
        }
      }
      return tempHabits;
    },
    habitUnDone: (state, action) => {
      let tempHabits = state;
      for (let i = 0; i < tempHabits.length; i++) {
        if (tempHabits[i].id === Number(localStorage.getItem("id"))) {
          tempHabits[i].weekLog[action.payload].isDone = false;
        }
      }
      return tempHabits;
    },
    habitNone: (state, action) => {
      let tempHabits = state;
      for (let i = 0; i < tempHabits.length; i++) {
        if (tempHabits[i].id === Number(localStorage.getItem("id"))) {
          tempHabits[i].weekLog[action.payload].isDone = "";
        }
      }
      return tempHabits;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addHabit, deleteHabit, habitDone, habitUnDone, habitNone } =
  habitSlice.actions;

export default habitSlice.reducer;
