export interface flightProps {
    date?: string,
    hour?:string,
    FlightId: string,
    FromAirport: string,
    FromAirportName: string,
    ToAirport: string,
    ToAirportName: string,
    AirlineName: string,
    ScheduledTimeFull: string
  }

export interface SearchBarProps {
  setLocation: any,
  setDates: any
}