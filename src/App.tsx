import clsx from "clsx";
import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { QuizBuilder } from "./pages/builderPage";
import { HomePage } from "./pages/homePage";
import { Viewer } from "./pages/viewerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/viewer"
          element={
            <div className="max-w-screen-sm m-auto mt-[40px]">
              <Viewer />
            </div>
          }
        />
        <Route
          path="/builder"
          element={
            <AppWrapperWithNavbar>
              <QuizBuilder />
            </AppWrapperWithNavbar>
          }
        />
        <Route
          path="/"
          element={
            <AppWrapperWithNavbar>
              <HomePage />
            </AppWrapperWithNavbar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function AppWrapperWithNavbar({ children }: { children: React.ReactElement }) {
  return (
    <>
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
      <div className="max-w-screen-sm m-auto">{children}</div>
    </>
  );
}

export { App };
