import React, { useEffect, useState } from "react";
import { getLocaltions } from "../../utils/service";
import { SearchBarProps } from "../../utils/types";

const options = {
  return: "Return",
  oneWay: "One way",
};

const SearchBar = (props: SearchBarProps) => {
  const {setDates, setLocation} = props
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState({from:'', to: ''});

  const handleSelectedOption = (event: any) => {
    const temp = selectedLocations;
    if( event.target.id == 'from'){
      temp.from = event.target.value
    } 
    if( event.target.id == 'to'){
      temp.to = event.target.value
    } 
    setSelectedLocations(temp)

  };

  const onInputChange = (event: any) => {
    console.log(event.target.name, event.target.value);
  };

  const onGetLocations = async () => {
    const locations: any = Array.from(await getLocaltions());
    setLocations(locations)
  };

  useEffect(() => {
    onGetLocations();
  }, []);


  return (
    <>
      <div className="flex-inline">
        <div className="mt-2 ml-5 mr-5 flex-inline">
          <label
            htmlFor="from"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            From
          </label>
          <select
            id="from"
            onChange={handleSelectedOption}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {locations?.map((location: string) => (
              <option value={location} selected={selectedLocations.from == location}>{location}</option>
            ))}
          </select>
          <label
            htmlFor="to"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            To
          </label>
          <select
            id="to"
            onChange={handleSelectedOption}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {locations?.map((location: string) => (
              <option value={location} selected={selectedLocations.to == location}>{location}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
