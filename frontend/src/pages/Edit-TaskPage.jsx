import React, { useState } from "react";
import Header from "../components/header";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import config from "./../config/index.js";
import "react-day-picker/style.css";
const Edittask = () => {
  const location = useLocation();
  const { task } = location.state || {};
  const navigate = useNavigate();

  const [selected, setSelected] = useState(
    task ? new Date(task.taskdate) : new Date()
  );
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");

  const defaultClassNames = getDefaultClassNames();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    const taskdate = formatDate(selected);

    try {
      const response = await fetch(
        `${config.apiBaseUrl}/api/tasks/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ title, description, taskdate }),
        }
      );

      if (response.ok) {
        console.log("Task added successfully");
        setTitle("");
        setDescription("");
        setSelected(new Date());
        navigate("/manager");
      } else {
        const errorData = await response.json();
        console.error(
          "Error adding task:",
          errorData.message || response.statusText
        );
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="min-w-[320px] bg-gray-900 min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto pb-28 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="bg-gray-800 shadow-[0_2px_25px_5px_rgb(88,88,88,0.1)] rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-center text-green-400">
                Edit your task
              </h2>
              <div className="mb-4">
                <label className="block mb-2 sm:mb-3 text-xl sm:text-2xl font-medium text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Write a title"
                  className="w-full p-3 border rounded bg-gray-700 text-lg sm:text-xl font-medium text-gray-300"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 sm:mb-3 text-xl sm:text-2xl font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  placeholder="Add Description"
                  className="w-full p-3 border rounded bg-gray-700 h-24 sm:h-32 text-lg sm:text-xl font-medium text-gray-300"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
                classNames={{
                  today: `border-green-500`,
                  selected: `bg-green-500 border-green-500 text-white rounded-xl`,
                  root: `${defaultClassNames.root} shadow-[0_2px_14px_-1px_rgb(3,3,3,0.1)] p-4 sm:p-7 rounded-2xl bg-gray-700`,
                  chevron: `${defaultClassNames.chevron} fill-green-500`,
                  day: `${defaultClassNames.day} text-sm sm:text-base text-gray-300`,
                }}
              />
            </div>
          </div>
          <div className="mt-8 w-full lg:w-1/2 sm:mt-10 flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-3 rounded-lg w-1/2 mr-1 text-lg hover:bg-green-600"
            >
              Confirm
            </button>
            <button
              className="bg-red-500 w-1/2 text-white text-base p-2 px-5 ml-1 rounded-lg hover:bg-red-600"
              onClick={() => {
                navigate("/manager");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edittask;
