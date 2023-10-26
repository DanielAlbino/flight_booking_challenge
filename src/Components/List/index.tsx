import { dateFormater, hourFormater } from "../../utils/service";
import { flightProps } from "../../utils/types";

const CustomList = ({
  flight,
  setToggle,
  setselected,
}: {
  flight: flightProps;
  setToggle: any;
  setselected: any;
}) => {
  // Format the hour and date
  const date = dateFormater(flight.ScheduledTimeFull.substring(0, 8));
  const hour = hourFormater(flight.ScheduledTimeFull.substring(8, 12));

  // modal handler to set the modal, and add the formated hour and date to the data.
  const handleModal = () => {
    flight.date = date;
    flight.hour = hour;
    setToggle(true);
    setselected(flight);
  };

  return (
    <ul role="list" className="divide-y divide-gray-100">
      <li
        key={flight.FlightId + Math.random() + 20}
        className="flex justify-between gap-x-6 py-5 m-10 my-2 p-5 shadow-md"
      >
        <div className="flex min-w-0 gap-x-4">
          <div className="flex-auto">
            <p className="text-xl font-semibold leading-6 text-gray-900">
              From
            </p>
            <div className="flex-inline">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {flight.FromAirport}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {flight.FromAirportName}
              </p>
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
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <div className="min-w-0 flex-auto" style={{ width: 100 }}>
            <p className="text-xl font-semibold leading-6 text-gray-900">
              Airline
            </p>
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {flight.AirlineName}
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              Airport of {flight.FromAirportName}
            </p>
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
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </div>
        </div>
        <div>
          <div className="min-w-0 flex-auto mr-5">
            <p className="text-xl font-semibold leading-6 text-gray-900">To</p>
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {flight.ToAirport}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {flight.ToAirportName}
            </p>
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
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
          </div>
        </div>
        <div>
          <p className="text-xl font-semibold leading-6 text-gray-900 mb-2">
            Departs
          </p>
          <p className="text-md font-semibold leading-6 text-gray-900">
            {date} at {hour}
          </p>
        </div>
        <button
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          style={{ width: 100 }}
          onClick={handleModal}
        >
          Select
        </button>
      </li>
    </ul>
  );
};

export default CustomList;
