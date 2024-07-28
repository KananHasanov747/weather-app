import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Seach({ fetchData }) {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const handleChange = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 0) {
      const response = await axios.get(`/api/cities/?q=${e.target.value}`);
      setCities(response.data);
    }
  };

  const handleSelectCity = (city, country) => {
    setQuery("");
    setCities([]);
    setHighlightedIndex(0);
    fetchData(city, country);
  };

  // TODO:
  // [ ] 1. Fix Arrows usage and highlightedIndex
  // [ ] 2. Add overflow-y: auto for <ul>
  const handleKeyDown = (e) => {
    if (e.key == "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < cities.length - 1 ? prevIndex + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : cities.length - 1,
      );
    } else if (e.key == "Enter") {
      const selected = cities[highlightedIndex];
      handleSelectCity(selected.city, selected.country);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        name="search"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for cities"
        className="w-full min-w-[46rem] py-[14px] px-2 rounded-[.6rem] bg-light-gray text-[13px] leading-[18px] text-light-white text-light-text outline-none placeholder:text-light-white"
      />
      {/* TODO: fix the hidden list */}
      <ul className="absolute left-0 right-0 text-[13px] leading-[18px] mt-2 text-light-white bg-light-gray gap-2 rounded-[.6rem]">
        {cities.map((city, index) => (
          <li
            key={index}
            className={`p-2 rounded-[.6rem] ${index === highlightedIndex ? "bg-dark-white" : ""}`}
          >
            {city.city}
          </li>
        ))}
      </ul>
    </div>
  );
}
