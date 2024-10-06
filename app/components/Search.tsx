import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { fetchCities } from "~/services/weatherService";

export default function Search() {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const navigate = useNavigate();

  const handleChange = async (e: any) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      try {
        const data = await fetchCities(value);
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    } else {
      setCities([]);
    }
  };

  const handleSelectCity = (city: string, country: string) => {
    setQuery("");
    setCities([]);
    setHighlightedIndex(0);
    navigate(`/?city=${city}&country=${country}`);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < cities.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : cities.length - 1
      );
    } else if (e.key === "Enter") {
      const selected: any = cities[highlightedIndex];
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
        className="w-full min-w-[46rem] py-[14px] px-2 
        rounded-[.6rem] bg-light-gray text-[13px] leading-[18px] 
        text-light-white text-light-text outline-none 
        placeholder:text-light-white"
      />
      {cities.length > 0 && (
        <ul className="absolute left-0 right-0 overflow-y-auto text-[13px] leading-[18px] mt-2 text-light-white bg-light-gray gap-2 rounded-[.6rem]">
          {cities.map((city: any, index: number) => (
            <li
              key={city.id}
              onClick={() => handleSelectCity(city.city, city.country)}
              className={`flex flex-col p-2 rounded-[.6rem] cursor-pointer ${
                index === highlightedIndex ? "bg-dark-white" : ""
              }`}
            >
              <span>{city.city}</span>
              <span>{city.country}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
