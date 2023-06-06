import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Loading from "./components/Loading";
const Home = lazy(() => import("./pages/Home"));
const Game = lazy(() => import("./pages/Game"));
const Error = lazy(() => import("./pages/Error"));

function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/game" exact element={<Game />} />
        <Route element={<Error />} />
      </Routes>
    </Suspense>
  );
}

export default Router;
