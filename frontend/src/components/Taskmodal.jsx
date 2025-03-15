import React from "react";

const TaskModal = ({ isOpen, onClose, task }) => {
  if (!isOpen || !task) return null;

  const getDaysLeft = (taskDate) => {
    const today = new Date();
    const taskDate2 = new Date(taskDate);
    const timeDiff = taskDate2.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft;
  };

  const daysLeft = getDaysLeft(task.taskdate);
  const formattedDate = new Date(task.taskdate).toLocaleDateString();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-10">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-3xl w-full">
        <h2 className="text-4xl font-bold mb-4 text-green-400">{task.title}</h2>
        <p className="text-gray-300 text-2xl mb-4">{task.description}</p>
        <p className="text-gray-400 text-lg mb-2">Due Date: {formattedDate}</p>
        <p className="text-gray-400 text-lg mb-4">Days Until Due: {daysLeft}</p>
        <button
          onClick={onClose}
          className="bg-green-500 text-white py-2 px-4 w-full rounded-lg hover:bg-green-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
