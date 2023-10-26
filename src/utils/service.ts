
export const getFlightsInfo = async () => {
  const data = await fetch('json/data.json', {headers:{
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }}).then(res => res).then(res => res.json()).then(data => data);
  return data;
};

export const getLocaltions = async () => {
  const info = await getFlightsInfo();
  const locations = info.map(({FromAirportName}:{FromAirportName: string})  => FromAirportName)
  const filteredLocations = new Set(locations);
  return filteredLocations
}