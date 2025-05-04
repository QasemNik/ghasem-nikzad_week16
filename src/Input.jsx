import { useEffect, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

const Input = ({ hint, cities }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const savedCity = localStorage.getItem("selectedCity");
    if (savedCity) {
      setInputValue(savedCity);
    }
  }, []);

  const handleChange = useCallback(
    (e) => {
      const value = e.target.value.trim();
      setInputValue(value);

      if (value.length > 0) {
        const filtered = cities.filter((city) =>
          city.toLowerCase().startsWith(value.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5));

        if (cities.some((city) => city.toLowerCase() === value.toLowerCase())) {
          setError(null);
          setSuccess("✅ شهر در لیست موجود است");
          localStorage.setItem("selectedCity", value);
        } else {
          setSuccess(null);
          setError("⚠️ این شهر در لیست وجود ندارد");
        }
      } else {
        setSuggestions([]);
        setError(null);
        setSuccess(null);
      }
    },
    [cities]
  );

  const handleSelect = useCallback((city) => {
    setInputValue(city);
    setSuggestions([]);
    localStorage.setItem("selectedCity", city);
    setError(null);
    setSuccess("✅ شهر با موفقیت انتخاب شد");
  }, []);

  const suggestionsList = useMemo(() => {
    return suggestions.map((city, index) => (
      <li
        key={index}
        onClick={() => handleSelect(city)}
        className="p-2 cursor-pointer hover:bg-gray-100"
      >
        {city}
      </li>
    ));
  }, [suggestions, handleSelect]);

  return (
    <div className="relative w-full max-w-md mx-auto mt-10">
      <label htmlFor="input" className="block mb-1 font-medium">
        {hint}
      </label>
      <input
        id="input"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter a City ..."
        className="border border-gray-300 bg-white/5 rounded mt-8 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {error && (
        <p className="text-red-500 text-sm font-medium mx-auto mt-1">{error}</p>
      )}
      {success && (
        <p className="text-green-600 text-sm font-medium mx-auto mt-1">{success}</p>
      )}
      {suggestions.length > 0 && (
        <div>
          <span className="text-gray-500 text-sm">آیا منظور شما این بود؟</span>
          <ul className="absolute z-10 bg-white border border-gray-200 rounded shadow-md w-full mt-1">
            {suggestionsList}
          </ul>
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  hint: PropTypes.string.isRequired,
  cities: PropTypes.string.isRequired,
};

export default Input;
