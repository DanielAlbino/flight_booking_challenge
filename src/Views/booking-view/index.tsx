import React, { useEffect, useState } from "react";
import SearchBar from "../../Components/Searchbar/";
import { getFlightsInfo } from "../../utils/service";
import CustomList from "../../Components/List";

const BookingView = () => {
  const [flights, setFlighs] = useState([]);
  const [location, setLocation] = useState({ from: "", to: "" });
  const [dates, setDates] = useState({ from: "", to: "" });

  useEffect(() => {
    handleFlightInfo();
  }, []);

  const handleFlightInfo = async () => {
    const data = await getFlightsInfo();
    setFlighs(data);
  };

  return (
    <div className="">
      <SearchBar setLocation={setLocation} setDates={setDates} />
      <div className="ml-7" style={{ width: "95vw" }}>
        {!flights && <h3>No Flights for those specific dates</h3>}
        {flights &&
          flights.filter(
            (fligth: any) =>
              (location.from == "" && location.to == "") ||
              (fligth.FromAirportName.inlcudes(location.from) &&
                fligth.ToAirportName.inlcudes(location.to))
          ).map((fligth) => <CustomList flight={fligth}/>)}
      </div>
    </div>
  );
};

export default BookingView;
