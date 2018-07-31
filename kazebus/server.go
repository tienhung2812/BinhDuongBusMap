package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

// Route data type
type Route struct {
	RouteID            int    `json:"route_id"`
	RouteColor         string `json:"color,omitempty"`
	RouteDirectionID   int    `json:"route_direction_id,omitempty"`
	RouteDirectionType int    `json:"route_type,omitempty"`
}

// Routes data type
type Routes struct {
	RouteArray []Route `json:"routes"`
}

// Location data type
type Location struct {
	StopLat float64 `json:"lat"`
	StopLon float64 `json:"lon"`
}

// Stop data type
type Stop struct {
	StopID       int      `json:"stop_id"`
	StopName     string   `json:"stop_name"`
	StopLocation Location `json:"location"`
	ArrivalTime  string   `json:"time,omitempty"`
}

// Stops data type
type Stops struct {
	StopArray []Stop `json:"stops"`
}

// StopTime data type
type StopTime struct {
	TripID      int    `json:"trip_id"`
	StopName    string `json:"stop_name"`
	ArrivalTime string `json:"time"`
	OffDates    string `json:"off_dates"`
}

// StopTimes data type
type StopTimes struct {
	StopTimeArray []StopTime `json:"stop_times"`
}

// Trip data type
type Trip struct {
	TripID int `json:"trip_id"`
	//TripStops Stops `json:"stop_detail"`
	TripStops []Stop `json:"stops"`
}

// Trips datatype
type Trips struct {
	TripArray []Trip `json:"trips"`
}

func main() {
	InitDb()
	//initDb()
	defer Db.Close() //keep the connection until we shutdown the server
	router := mux.NewRouter()
	router.HandleFunc("/stops/{routeID}-{directionID}", getStops).Methods("GET")
	router.HandleFunc("/routes", getRoutes).Methods("GET")
	router.HandleFunc("/route/{id}", getRoute).Methods("GET")
	router.HandleFunc("/stoptime/{routeID}-{directionID}-{stopID}", getStopTimes).Methods("GET")
	router.HandleFunc("/trip/{routeID}-{directionID}", getTrips).Methods("GET")
	//fmt.Println()
	log.Fatal(http.ListenAndServe(":"+os.Getenv("PORT"), router))

}

func getStops(w http.ResponseWriter, r *http.Request) {
	//stops := Stops{}
	vars := mux.Vars(r)
	routeID, err := strconv.Atoi(vars["routeID"])
	if err != nil {
		return
	}
	directionID := vars["directionID"]

	stops, err := RetrieveStops(routeID, directionID)
	out, err := json.MarshalIndent(&stops, "", "\t")
	if err != nil {
		http.Error(w, err.Error(), 500)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
	//fmt.Fprintf(w, string(out))

}

func getRoutes(w http.ResponseWriter, r *http.Request) {
	routes := Routes{}
	RetrieveRoutes(&routes)
	out, err := json.MarshalIndent(&routes, "", "\t")
	if err != nil {
		http.Error(w, err.Error(), 500)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

func getRoute(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		return
	}

	route, err := RetrieveRoute(id)
	if err != nil {
		return
	}
	out, err := json.MarshalIndent(&route, "", "\t")
	if err != nil {
		http.Error(w, err.Error(), 500)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
	return
}

func getStopTimes(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	routeID, err := strconv.Atoi(vars["routeID"])
	if err != nil {
		panic(err)
	}
	directionID := vars["directionID"]

	stopID, err := strconv.Atoi(vars["stopID"])
	if err != nil {
		panic(err)
	}
	stopTimes, err := RetrieveTime(routeID, directionID, stopID)
	out, err := json.MarshalIndent(&stopTimes, "", "\t")
	if err != nil {
		http.Error(w, err.Error(), 500)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
	return
}

func getTrips(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	routeID, err := strconv.Atoi(vars["routeID"])
	if err != nil {
		panic(err)
	}
	directionID := vars["directionID"]
	trips, err := RetrieveTrip(routeID, directionID)
	out, err := json.MarshalIndent(&trips, "", "\t")
	if err != nil {
		http.Error(w, err.Error(), 500)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
	return
}
