import { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaRegCircle,
  FaTrash,
  FaTasks,
  FaCalendarAlt,
} from "react-icons/fa";

// Import API functions
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/leadApi"; // path adjust if needed

export default function TasksTab({ leadId }) {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await getTasks(leadId);
      setTaskList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (leadId) fetchTasks();
  }, [leadId]);

  // Add Task
  const addTaskHandler = async (e) => {
    e.preventDefault();

    if (!task.trim()) return;

    setLoading(true);

    try {
      await createTask({
        leadId,
        title: task,
      });

      setTask("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // Toggle Task
  const toggleTaskHandler = async (id, currentStatus) => {
    try {
      await updateTask(id, {
        completed: !currentStatus,
      });

      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Task
  const deleteTaskHandler = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-2">
      {/* Input */}
      <form
        onSubmit={addTaskHandler}
        className="relative mb-8"
      >
        <input
          type="text"
          value={task}
          onChange={(e) =>
            setTask(e.target.value)
          }
          placeholder="What needs to be done for this lead?"
          className="w-full pl-4 pr-32 py-4 bg-white border-2 border-gray-100 rounded-2xl shadow-sm focus:border-blue-500 text-sm"
        />

        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-xl text-sm font-bold"
        >
          {loading ? "..." : "Add Task"}
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2 mb-4">
          <FaTasks />
          Active Tasks —{" "}
          {
            taskList.filter(
              (t) => !t.completed
            ).length
          }
        </h4>

        {taskList.length === 0 && (
          <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed">
            <p className="text-gray-400 text-sm">
              No tasks assigned yet.
            </p>
          </div>
        )}

        {taskList.map((t) => (
          <div
            key={t._id}
            className={`group flex items-center justify-between p-4 rounded-xl border ${
              t.completed
                ? "bg-gray-50 border-gray-100"
                : "bg-white border-gray-200 shadow-sm hover:border-blue-300"
            }`}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  toggleTaskHandler(
                    t._id,
                    t.completed
                  )
                }
                className="text-xl"
              >
                {t.completed ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaRegCircle className="text-gray-300" />
                )}
              </button>

              <div>
                <p
                  className={`text-sm font-medium ${
                    t.completed
                      ? "line-through text-gray-400"
                      : "text-gray-700"
                  }`}
                >
                  {t.title}
                </p>

                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <FaCalendarAlt />
                  {new Date(
                    t.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                deleteTaskHandler(t._id)
              }
              className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500"
            >
              <FaTrash size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}