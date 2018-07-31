package main

import (
	"database/sql"
	"fmt"
	"os"
	"time"
)

// Db is the database variable
var Db *sql.DB

// InitDb connects to the Db
func InitDb() {
	//connStr := "user=postgres dbname=kazebus  password=12345 "
	var err error
	Db, err = sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Println(err)
	}
}

// RetrieveStops retrieves all stops from the database
func RetrieveStops(routeID int, directionID string) (stops Stops, err error) {
	stops = Stops{}
	rows, err := Db.Query(`SELECT stops.stop_id, stops.stop_name, stops.stop_lat, stops.stop_lon 
						   FROM routes as r
					 	   JOIN trips as t on r.route_id = t.route_id 
						   JOIN stop_times as st on st.trip_id = t.trip_id
						   JOIN stops on stops.stop_id = st.stop_id
						   WHERE r.route_id = $1 AND t.direction_id = $2
						   ORDER BY st.stop_sequence;`, routeID, directionID)
	if err != nil {
		panic(err)
	}
	for rows.Next() {
		s := Stop{}
		err = rows.Scan(&s.StopID, &s.StopName, &s.StopLocation.StopLat, &s.StopLocation.StopLon)
		if err != nil {
			panic(err)
		}
		//fmt.Println("stops_name | lat | lng")
		//fmt.Printf("%3v | %8v | %8v | %8v  \n", s.StopID, s.StopName, s.StopLat, s.StopLon)
		stops.StopArray = append(stops.StopArray, s)
	}
	return
}

//RetrieveRoutes retrieves all routes from the database
func RetrieveRoutes(routes *Routes) error {
	rows, err := Db.Query(`SELECT DISTINCT routes.route_id, routes.route_color 
						   FROM routes JOIN trips ON routes.route_id=trips.route_id 
						   GROUP BY routes.route_id, routes.route_color, trips.direction_id
						   ORDER BY route_id;`)
	if err != nil {
		panic(err)
	}
	for rows.Next() {
		r := Route{}
		err = rows.Scan(&r.RouteID, &r.RouteColor)
		if err != nil {
			panic(err)
		}
		routes.RouteArray = append(routes.RouteArray, r)
	}
	return nil
}

//RetrieveRoute retrieves a route by its ID from the database
func RetrieveRoute(id int) (route Route, err error) {
	route = Route{}
	err = Db.QueryRow(`SELECT route_id, COUNT(direction_id) AS direction_type
					   FROM route_detail 
					   WHERE route_id = $1
					   GROUP BY route_id, route_color
					   ORDER BY route_id;`, id).Scan(&route.RouteID, &route.RouteDirectionType)
	if err != nil {
		panic(err)
	}
	return
}

//RetrieveTime retrieves arrival time of a specific bus route
func RetrieveTime(routeID int, directionID string, stopID int) (stopTimes StopTimes, err error) {
	stopTimes = StopTimes{}
	m := map[int]string{
		1: "none",
		2: "CN",
		3: "T7,CN",
		4: "T2-6",
		5: "T2-6,CN"}

	rows, err := Db.Query(`SELECT trips.trip_id, stops.stop_name, stop_times.arrival_time, trips.service_id
						   FROM routes 	JOIN trips on routes.route_id = trips.route_id
										JOIN stop_times ON trips.trip_id = stop_times.trip_id
										JOIN stops ON stops.stop_id = stop_times.stop_id
							WHERE		routes.route_id = $1
									AND trips.direction_id = $2
									AND	stops.stop_id = $3`, routeID, directionID, stopID)
	if err != nil {
		panic(err)
	}
	for rows.Next() {
		r := StopTime{}
		time := time.Time{}
		var serviceID int
		err = rows.Scan(&r.TripID, &r.StopName, &time, &serviceID)
		r.ArrivalTime = time.Format("15:04")
		r.OffDates = m[serviceID]
		if err != nil {
			panic(err)
		}
		stopTimes.StopTimeArray = append(stopTimes.StopTimeArray, r)
	}
	return
}

func RetrieveTrip(routeID int, directionID string) (trips Trips, err error) {
	trips = Trips{}
	stops := Stops{}
	//var stops []Stop
	rows, err := Db.Query(`SELECT trips.trip_id, stops.stop_id, stops.stop_name, stops.stop_lat, stops.stop_lon, stop_times.arrival_time
						   FROM stops JOIN stop_times ON stops.stop_id = stop_times.stop_id
						   			  JOIN trips ON trips.trip_id = stop_times.trip_id
						   WHERE trips.route_id = $1 AND trips.direction_id = $2`, routeID, directionID)

	if err != nil {
		panic(err)
	}
	lastTripID := -1
	for rows.Next() {
		r := Trip{}
		s := Stop{}
		time := time.Time{}
		err = rows.Scan(&r.TripID, &s.StopID, &s.StopName,
			&s.StopLocation.StopLat, &s.StopLocation.StopLon, &time)
		if err != nil {
			panic(err)
		}
		s.ArrivalTime = time.Format("15:04") // convert time in format hh:mm into a string, 15:04 is a must string-argument here
		if lastTripID != r.TripID && lastTripID != -1 {
			// the current trip is read over, put it into array
			r.TripStops = stops.StopArray
			trips.TripArray = append(trips.TripArray, r)
			stops = Stops{} // reset the stops array

		} else {
			// when there is still stops in current trip, put those stops into a sub array
			//stops.StopArray = append(stops.StopArray, s)
			stops.StopArray = append(stops.StopArray, s)
		}

		lastTripID = r.TripID
	}
	return
}
