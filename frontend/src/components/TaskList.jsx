import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({
  incompleteTasks,
  completedTasks,
  onDeleteTask,
  onEditTask,
  onToggleTaskCompletion,
  onOpenModal,
  tasksDueRef,
  pastDueTasksRef,
  completedTasksRef,
}) => {
  const setToMidnight = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const tasksDueTasks = incompleteTasks
    .filter((task) => {
      const taskDate = setToMidnight(new Date(task.taskdate));
      const today = setToMidnight(new Date());
      return taskDate >= today;
    })
    .sort((a, b) => {
      const aDate = setToMidnight(new Date(a.taskdate));
      const bDate = setToMidnight(new Date(b.taskdate));
      const today = setToMidnight(new Date());

      if (aDate.getTime() === today.getTime()) return -1;
      if (bDate.getTime() === today.getTime()) return 1;
      return aDate - bDate;
    });

  const pastDueTasks = incompleteTasks.filter((task) => {
    const taskDate = setToMidnight(new Date(task.taskdate));
    const today = setToMidnight(new Date());
    return taskDate < today;
  });

  return (
    <div className="w-full h-min p-6">
      <div
        ref={tasksDueRef}
        className="border-2 border-gray-700 p-6 rounded-2xl mb-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-green-400">Upcoming</h2>
        </div>
        <div className="space-y-4">
          {tasksDueTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
              onToggleCompletion={onToggleTaskCompletion}
              onOpenModal={onOpenModal}
            />
          ))}
          {tasksDueTasks.length === 0 && (
            <p className="text-gray-300">No tasks due available.</p>
          )}
        </div>
      </div>
      <div
        ref={pastDueTasksRef}
        className="border-2 border-gray-700 p-6 rounded-2xl mb-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-green-400">Past Due</h2>
        </div>
        <div className="space-y-4">
          {pastDueTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
              onToggleCompletion={onToggleTaskCompletion}
              onOpenModal={onOpenModal}
            />
          ))}
          {pastDueTasks.length === 0 && (
            <p className="text-gray-300">No past due tasks available.</p>
          )}
        </div>
      </div>
      <div
        ref={completedTasksRef}
        className="border-2 border-gray-700 p-6 rounded-2xl mb-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-green-400">Completed Tasks</h2>
        </div>
        <div className="space-y-4">
          {completedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
              onToggleCompletion={onToggleTaskCompletion}
              onOpenModal={onOpenModal}
            />
          ))}
          {completedTasks.length === 0 && (
            <p className="text-gray-300">No completed tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
