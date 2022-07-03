import { Component, createEffect, createSignal, For } from "solid-js";
import { nanoid } from "nanoid";

type Task = {
  text: string;
  id: string;
  completed: boolean;
};

const App: Component = () => {
  // const tasks = JSON.parse(window.localStorage.getItem("tasks") || "");
  const [taskList, setTaskList] = createSignal([] as Task[]);

  const addTask = () => {
    const taskInput = document.querySelector("#add-task") as HTMLInputElement;
    if (!taskInput.value) return;

    const newTask: Task = {
      id: nanoid(3),
      text: taskInput.value,
      completed: false,
    };

    setTaskList([...taskList(), newTask]);
    taskInput.value = "";
  };

  const deleteTask = (taskId: string) => () => {
    const newTaskList = taskList().filter((task) => task.id !== taskId);
    setTaskList(newTaskList);
  };

  const toggleStatus = (taskId: string) => () => {
    const newTaskList = taskList().map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTaskList(newTaskList);
  };

  const setToLocalStorage = (newTaskList: Task[]) => {
    window.localStorage.setItem("tasks", JSON.stringify(newTaskList));
  };

  createEffect(() => {
    setToLocalStorage(taskList());
  });

  return (
    <div class="flex flex-col items-center gap-5">
      <h1 class="text-3xl my-8 font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
        Task Manager App Ft. Solid JS
      </h1>

      <div class="flex items-center gap-2">
        <input
          class="w-full outline-none p-3 text-sm border-2 border-black"
          id="add-task"
          type="text"
          placeholder="Enter task"
        />
        <button
          onClick={addTask}
          class="relative inline-block text-sm font-medium text-black group active:text-black focus:outline-none"
        >
          <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-black group-hover:translate-y-0 group-hover:translate-x-0"></span>
          <span class="relative block px-8 py-3 bg-white border-2 border-current">
            Add
          </span>
        </button>
      </div>

      {/* Tasks */}
      <div class="flex flex-col gap-6">
        <For each={taskList()}>
          {(task: Task) => (
            <div class="relative min-w-[400px] inline-block text-sm font-medium text-black group focus:outline-none">
              <span class="absolute inset-0 transition-transform translate-x-1 translate-y-1 bg-teal-400 group-hover:translate-y-0 group-hover:translate-x-0"></span>

              <div class="relative flex flex-col gap-3 items-center px-8 py-3 bg-white border-2 border-current">
                <div
                  class={`text-xl font-semibold capitalize ${
                    task.completed && "line-through"
                  }`}
                >
                  {task.text}
                </div>
                <div class="flex gap-3">
                  <button
                    onClick={toggleStatus(task.id)}
                    class="px-4 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black"
                  >
                    Toggle
                  </button>
                  <button
                    class="px-4 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black"
                    onClick={deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default App;
