import React, { useState, useEffect, useRef } from "react";
import Header from "../components/HomePage_Header";
import TaskList from "../components/TaskList";
import TaskModal from "../components/Taskmodal";
import { useNavigate } from "react-router-dom";
import config from "../config/index.js";
import { ArrowUp } from "lucide-react";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const tasksDueRef = useRef(null);
  const pastDueTasksRef = useRef(null);
  const completedTasksRef = useRef(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false); // State for scroll button visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/api/tasks`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          const errorData = await response.json();
          console.error("Error fetching tasks:", errorData.message);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Handle scroll event to show/hide the "Arrow Up" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const incompleteTasks = tasks.filter((task) => !task.is_completed);
  const completedTasks = tasks.filter((task) => task.is_completed);

  const addTask = () => {
    navigate("/add");
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/api/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(tasks.filter((task) => task.id !== id)); // Update the tasks state
      } else {
        const errorData = await response.json();
        console.error("Error deleting task:", errorData.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    navigate("/edit", { state: { task: taskToEdit } });
  };

  const toggleTaskCompletion = async (id) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          is_completed: !tasks.find((task) => task.id === id).is_completed,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(
          tasks.map((task) =>
            task.id === id
              ? { ...task, is_completed: !task.is_completed }
              : task
          )
        ); // Update the tasks state
      } else {
        const errorData = await response.json();
        console.error("Error toggling task completion:", errorData.message);
      }
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn("Section does not exist.");
    }
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <div className="flex flex-col bg-gray-900 min-h-screen">
      <Header />
      <div className="flex p-6 flex-col lg:flex-row">
        {/* Scroll-to-top and Add Task buttons */}
        <div className="flex flex-row justify-center fixed bottom-2 right-2">
          {showScrollButton && (
            <button
              onClick={() => {
                handleButtonClick("tasksDue");
                scrollToSection(tasksDueRef);
              }}
              className="bg-green-500 mx-2 text-white p-1 rounded-xl hover:bg-green-600 transition-all  mb-4 text-lg"
            >
              <ArrowUp size={"20px"} />
            </button>
          )}
          <button
            onClick={addTask}
            className="w-40 bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition-colors mb-4 text-lg"
          >
            Add Task
          </button>
        </div>

        {/* Task categories */}
        <div className="w-full flex flex-col gap-4 lg:w-1/4 lg:p-0 lg:m-6">
          <div className="flex flex-row lg:flex-col">
            <button
              onClick={() => {
                handleButtonClick("tasksDue");
                scrollToSection(tasksDueRef);
              }}
              className={`w-full py-2 rounded-xl hover:bg-gray-700 transition-colors text-green-400  text-center text-sm mb-2 border-2 border-gray-700 ${
                activeButton === "tasksDue" ? "bg-gray-700" : "bg-gray-800"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => {
                handleButtonClick("pastDue");
                scrollToSection(pastDueTasksRef);
              }}
              className={`w-full py-2 rounded-xl hover:bg-gray-700 transition-colors text-green-400  text-center text-sm mb-2 border-2 border-gray-700 ${
                activeButton === "pastDue" ? "bg-gray-700" : "bg-gray-800"
              }`}
            >
              Past Due
            </button>
            <button
              onClick={() => {
                handleButtonClick("completedTasks");
                scrollToSection(completedTasksRef);
              }}
              className={`w-full py-2 rounded-xl hover:bg-gray-700 transition-colors text-green-400  text-center text-sm mb-2 border-2 border-gray-700 ${
                activeButton === "completedTasks"
                  ? "bg-gray-700"
                  : "bg-gray-800"
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Task list */}
        <TaskList
          incompleteTasks={incompleteTasks}
          completedTasks={completedTasks}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
          onToggleTaskCompletion={toggleTaskCompletion}
          onOpenModal={openModal}
          tasksDueRef={tasksDueRef}
          pastDueTasksRef={pastDueTasksRef}
          completedTasksRef={completedTasksRef}
        />
      </div>

      {/* Task modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskManager;
