import React, { useCallback, useEffect, useState } from "react";
import "./AutoCompleteSearchBar.css";
import { debounce } from "lodash";

const AutoCompleteSearchBar = () => {
  const [input, setInput] = useState("");
  const [searchedItem, setSearchedItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showResults, setShowResults] = useState(false); //this is to handle if we click outsie the input box
  const [activeIndex, setActiveIndex] = useState(-1);

  const fetchData = async (query) => {
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setSearchedItem(data.recipes || []);
    } catch (error) {
      console.log("Error fetching data:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const deboucedFetchedData = useCallback(
    debounce((input) => {
      fetchData(input);
    }, 300),
    []
  );

  useEffect(() => {
    if (input.trim() === "") {
      setSearchedItem([]);
      return;
    }

    deboucedFetchedData(input);

    return () => {
      deboucedFetchedData.cancel();
    };
  }, [input, deboucedFetchedData]);

  const handleKeyDown = (e) => {
    if (searchedItem.length === 0) return;

    if (e.key === "ArrowDown") {
      // Move down in the list
      setActiveIndex((prevIndex) =>
        prevIndex < searchedItem.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      // Move up in the list
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : searchedItem.length - 1
      );
    } else if (e.key === "Enter") {
      // Select the active item
      if (activeIndex >= 0 && activeIndex < searchedItem.length) {
        setInput(searchedItem[activeIndex].name); // Set the input to the selected item's name
        setShowResults(false); // Hide the results
      }
    }
  };

  return (
    <div>
      <h2 style={{ margin: "10px" }}>Auto-Complete Search Bar</h2>

      <input
        type="text"
        className="search-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
        onKeyDown={handleKeyDown}
      />

      {isLoading && <p className="result-container">Loading...</p>}

      {hasError && <p>Error fetching data. Please try again.</p>}

      {showResults && searchedItem.length > 0 ? (
        <ul className="result-container">
          {searchedItem.map((item, index) => (
            <li
              key={item.id}
              className={`result ${index === activeIndex ? "active" : ""}`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        !isLoading &&
        !hasError &&
        input.trim() !== "" && <p>No results found.</p>
      )}
    </div>
  );
};

export default AutoCompleteSearchBar;
