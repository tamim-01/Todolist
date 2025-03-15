import React from "react";
import { Trash2, PenSquare } from "lucide-react";

const TaskItem = ({
  task,
  onDelete,
  onEdit,
  onToggleCompletion,
  onOpenModal,
}) => {
  const getDaysLeft = (taskDate) => {
    const today = new Date();
    const taskDate2 = new Date(taskDate);
    const timeDiff = taskDate2.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft;
  };

  const getDisplayText = (taskDate) => {
    const daysLeft = getDaysLeft(taskDate);
    if (daysLeft > 0) {
      return `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`;
    } else if (daysLeft === 0) {
      return "Today";
    } else {
      return `${Math.abs(daysLeft)} day${
        Math.abs(daysLeft) !== 1 ? "s" : ""
      } passed`;
    }
  };

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div
      className={`${
        task.is_completed ? "bg-gray-800" : "bg-gray-700"
      } p-4 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center justify-between`}
    >
      <div
        onClick={() => onOpenModal(task)}
        className="flex-1 flex flex-col mb-4 md:mb-0"
      >
        <h3
          className={`font-medium text-lg md:text-xl mb-1 ${
            task.is_completed ? "line-through text-gray-400" : "text-green-400"
          }`}
          style={{ marginRight: "1rem" }}
        >
          {task.title}
        </h3>
        <p
          className={`text-sm md:text-lg ${
            task.is_completed ? "line-through text-gray-400" : "text-gray-300"
          }`}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            marginRight: "1rem",
          }}
        >
          {task.description}
        </p>
      </div>
      <div className="flex items-center gap-2 min-w-fit">
        {task.is_completed ? (
          <p className="line-through text-gray-400">
            {formatDate(task.taskdate)}
          </p>
        ) : (
          <p className="text-green-400">{getDisplayText(task.taskdate)}</p>
        )}
        <input
          type="checkbox"
          checked={task.is_completed}
          onChange={() => onToggleCompletion(task.id)}
          className="my-auto w-5 h-5 rounded-3xl"
        />
        <button
          className="text-green-400 hover:text-green-500"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task.id);
          }}
        >
          <PenSquare size={24} />
        </button>
        <button
          className="text-red-400 hover:text-red-500 -ml-0.5"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
        >
          <Trash2 size={24} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
