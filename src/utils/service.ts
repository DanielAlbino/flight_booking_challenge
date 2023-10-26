
// Get the data from the json file
export const getFlightsInfo = async () => {
  const data = await fetch('json/data.json', {headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }}).then(res => res).then(res => res.json()).then(data => data);
  return data;
};

// get the data from the json file, gets all the locations and filters by the correct number of locations that exists.
export const getLocaltions = async () => {
  const info = await getFlightsInfo();
  const locations = info.map(({FromAirportName}:{FromAirportName: string})  => FromAirportName)
  const filteredLocations = new Set(locations);
  return filteredLocations
}


//formats date to the correct required format
export const dateFormater = (date: string) => {
  return (
    date.substring(0, 4) +
    "/" +
    date.substring(4, 6) +
    "/" +
    date.substring(6, 8)
  );
};

//formats hour to the required format
export const hourFormater = (date: string) => {
  return date.substring(0, 2) + ":" + date.substring(2, 4);
};