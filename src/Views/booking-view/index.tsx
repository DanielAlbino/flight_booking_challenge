import React, { useEffect, useState } from "react";
import SearchBar from "../../Components/Searchbar/";
import { dateFormater, getFlightsInfo } from "../../utils/service";
import CustomList from "../../Components/List";
import Modal from "../../Components/Modal";

const BookingView = () => {
  const [flights, setFlighs] = useState([]);
  const [filteredFlights, setfilteredFlights] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [selected, setselected] = useState({});

  useEffect(() => {
    handleFlightInfo();
  }, []);

  // Get the data and save it in a state
  const handleFlightInfo = async () => {
    const data = await getFlightsInfo();
    setFlighs(data);
  };

  // filter the flights depending on the from and to.
  const onFilterChange = (values: any) => {
    setfilteredFlights(
      flights.filter(
        (fligth: any) =>
          (values.from == "" && values.to == "") ||
          (values.to == "" &&
            fligth.FromAirportName.toLowerCase() ==
              values.from.toLowerCase()) ||
          (values.from == "" &&
            fligth.ToAirportName.toLowerCase() == values.to.toLowerCase()) ||
          (fligth.FromAirportName.toLowerCase() == values.from.toLowerCase() &&
            fligth.ToAirportName.toLowerCase() == values.to.toLowerCase())
      )
    );
  };

  // filter the flights depending on the dates
  const onDateChange = (values: any) => {
    setfilteredFlights(
      flights.filter(
        (fligth: any) =>
          dateFormater(fligth.ScheduledTimeFull.substring(0, 8)) ==
            values.to.replaceAll("-", "/") ||
          dateFormater(fligth.ScheduledTimeFull.substring(0, 8)) ==
            values.from.replaceAll("-", "/")
      )
    );
  };

  useEffect(() => {
    setfilteredFlights(flights);
  }, [flights]);

  return (
    <div className="">
      <SearchBar setLocation={onFilterChange} setDates={onDateChange} />
      <div className="ml-7" style={{ width: "95vw" }}>
        {!flights && <p>Loading data...</p>}
        {flights && !filteredFlights.length && (
          <div
            className="p-4 mt-5 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            No Flights for the selected filters
          </div>
        )}
        {flights &&
          filteredFlights.map((fligth, index) => (
            <CustomList
              key={index}
              flight={fligth}
              setToggle={setToggle}
              setselected={setselected}
            />
          ))}
      </div>

      {toggle && <Modal info={selected} setToggle={setToggle} />}
    </div>
  );
};

export default BookingView;
