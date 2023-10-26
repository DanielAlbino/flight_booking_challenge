import React, { useEffect, useState } from "react";
import { getLocaltions } from "../../utils/service";
import { SearchBarProps } from "../../utils/types";

const options = {
  return: "return",
  oneWay: "oneway",
};

const SearchBar = (props: SearchBarProps) => {
  const { setDates, setLocation } = props;
  const [locations, setLocations] = useState([]);
  const [disableFrom, setDisableFrom] = useState(false);
  const [checked, setChecked]: any = useState(options.return);
  const [selectedLocations, setSelectedLocations] = useState({
    from: "",
    to: "",
  });
  const [selectedDates, setSelectedDates] = useState({
    from: "",
    to: "",
  });

  const handleSelectedOption = (event: any) => {
    if (event.target.value == "") return;
    const temp = selectedLocations;
    if (event.target.id == "from") {
      temp.from = event.target.value;
    }
    if (event.target.id == "to") {
      temp.to = event.target.value;
    }
    setLocation(temp);
    setSelectedLocations(temp);
  };

  const onGetLocations = async () => {
    const locations: any = Array.from(await getLocaltions());
    setLocations(locations);
  };

  const onDatesChange = (event: any) => {
    if (event.target.value == "") return;
    const temp = selectedDates;
    if (event.target.id == "from") {
      temp.from = event.target.value;
    }
    if (event.target.id == "to") {
      temp.to = event.target.value;
    }
    setDates(temp);
    setSelectedDates(temp);
  };

  useEffect(() => {
    onGetLocations();
  }, []);

  useEffect(() => {
    const temp = selectedLocations;
    temp.from = "";
    setLocation(temp);
    setSelectedLocations(temp);
  }, [disableFrom]);

  useEffect(() => {
    const temp = selectedDates;
    if (checked == options.oneWay) {
      temp.from = "";
      setDates(temp);
      setSelectedDates(temp);
    }
  }, [checked]);

  return (
    <>
      <div
        className="flex-inline shadow-md mx-5 mt-5"
        style={{ backgroundColor: "#3b82f6", borderRadius: 10, color: "white" }}
      >
        <div className="mt-4 ml-5 mr-5 " style={{ display: "inline-flex" }}>
          <div className="ml-5">
            <label
              htmlFor="from"
              className="block text-md font-medium leading-6 text-white-900"
            >
              From
            </label>
            <select
              disabled={disableFrom}
              id="from"
              onChange={handleSelectedOption}
              style={{ width: "40vw" }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected disabled>
                Where from?
              </option>
              {locations?.map((location: string) => (
                <option
                  value={location}
                  selected={selectedLocations.from == location}
                >
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="ml-5">
            <label
              htmlFor="to"
              className="block text-md font-medium leading-6 text-white-900"
            >
              To
            </label>
            <select
              id="to"
              onChange={handleSelectedOption}
              style={{ width: "40vw" }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected disabled>
                Where to?
              </option>
              {locations?.map((location: string) => (
                <option
                  value={location}
                  selected={selectedLocations.to == location}
                >
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex-inline shadow-md mx-5 mt-5 ml-10">
          <div
            className="flex items-center gap-x-3 mb-3"
            style={{ display: "inline-flex" }}
          >
            <input
              id="return"
              name="return"
              type="radio"
              checked={checked == options.return}
              value={options.return}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onClick={(e) => {
                setDisableFrom(false);
                setChecked(options.return);
              }}
            />
            <label
              htmlFor="return"
              className="ml-2 mr-5 text-sm font-medium text-white-900 dark:text-white-300"
            >
              Return
            </label>
            <input
              id="oneway"
              name="oneway"
              type="radio"
              checked={checked == options.oneWay}
              value={options.oneWay}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onClick={() => {
                setDisableFrom(true);
                setChecked(options.oneWay);
              }}
            />
            <label
              htmlFor="oneway"
              className="block text-sm font-medium leading-6 text-white-900 dark:text-white-300"
            >
              One-way
            </label>
            <div className="ml-5">
              <div className="flex min-w-0 gap-x-4">
                <div className="relative max-w-sm" hidden={disableFrom}>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input
                    id="from"
                    type="date"
                    value={selectedDates.from}
                    onChange={(e) => onDatesChange(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date"
                  />
                </div>
                <div className="mt-3" hidden={disableFrom}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                    />
                  </svg>
                </div>
                <div className="relative max-w-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input
                    id="to"
                    type="date"
                    value={selectedDates.to}
                    onChange={(e) => onDatesChange(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
