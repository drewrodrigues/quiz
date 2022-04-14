import clsx from "clsx";
import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { QuizBuilder } from "./pages/builderPage";

function App() {
  return (
    <BrowserRouter>
      <header className="bg-blue-200 p-[20px] mb-[20px]">
        <div className="flex justify-between items-center max-w-screen-sm m-auto">
          <main>
            <a href="/" className="font-bold">
              Quizer
            </a>
          </main>

          <aside className="text-[14px]">
            <NavLink
              to="/"
              className={({ isActive }) =>
                clsx(isActive && "border-b-[2px] border-blue-300")
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/builder"
              className={({ isActive }) =>
                clsx(isActive && "border-b-[2px] border-blue-300", "ml-[10px]")
              }
            >
              Builder
            </NavLink>
          </aside>
        </div>
      </header>

      <div className="max-w-screen-sm m-auto">
        <Routes>
          <Route path="/builder" element={<QuizBuilder />} />
          <Route path="/" element={<p>Landing page</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export { App };
