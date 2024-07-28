import React from "react";
import { Routes, Route } from "react-router-dom";
import Weather from "./pages/Weather";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Weather />} />
    </Routes>
  );
}
