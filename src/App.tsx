import type { Component } from "solid-js";

const App: Component = () => {
  return (
    <div class="flex flex-col items-center">
      <h1 class="text-3xl my-8 font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
        Task Manager App Ft. Solid JS
      </h1>

      <div class="flex items-center gap-2">
        <input
          class="w-full p-3 mt-1 text-sm border-2 border-indigo-600"
          id="add-task"
          type="text"
        />
        <button class="relative inline-block text-sm font-medium text-indigo-600 group active:text-indigo-500 focus:outline-none focus:ring">
          <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-indigo-600 group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span class="relative block px-8 py-3 bg-white border border-current">
            Add
          </span>
        </button>
      </div>
    </div>
  );
};

export default App;
