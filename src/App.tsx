import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/layout/navbar";
import { QuizBuilder } from "./pages/builderPage";
import { HomePage } from "./pages/homePage";
import { ViewerPage } from "./pages/viewerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/viewer" element={<ViewerPage />} />
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
      <Navbar
        rightLinks={[
          { href: "/", label: "Home" },
          { href: "/builder", label: "Builder" },
        ]}
      />
      <div className="max-w-screen-sm m-auto mt-[40px]">{children}</div>
    </>
  );
}

export { App };
