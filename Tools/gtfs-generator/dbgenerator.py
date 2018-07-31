import psycopg2

def main():
    conn = psycopg2.connect(dbname="kazebus", user="postgres", password="12345")    
    cur = conn.cursor()
#    try:
    cur.execute("DROP TABLE agency CASCADE")
    cur.execute("DROP TABLE stops CASCADE")
    cur.execute("DROP TABLE routes CASCADE")
    cur.execute("DROP TABLE trips CASCADE")
    cur.execute("DROP TABLE stop_times CASCADE")
    cur.execute("DROP TABLE calendar CASCADE")
    cur.execute("DROP TABLE calendar_dates CASCADE")
#    except:
#        pass

    cur.execute("CREATE TABLE agency (agency_id serial PRIMARY KEY,\
                                      agency_name varchar(30),\
                                      agency_url varchar(40),\
                                      agency_timezone varchar(20),\
                                      agency_lang char(2),\
                                      agency_phone varchar(20));")

    cur.execute("CREATE TABLE stops (stop_id serial PRIMARY KEY, \
                                     stop_name varchar (50), \
                                     stop_lat NUMERIC (8,6), \
                                     stop_lon NUMERIC (9,6), \
                                     stop_desc varchar (15));")
    
    cur.execute("CREATE TABLE routes (route_id integer PRIMARY KEY, \
                                      agency_id serial references agency(agency_id), \
                                      route_short_name varchar(20), \
                                      route_long_name varchar(150), \
                                      route_type numeric(1), \
                                      route_color char(6), \
                                      route_text_color char(6), \
                                      route_desc text);")

    cur.execute("CREATE TABLE calendar (service_id smallint PRIMARY KEY, \
                                        monday char(1), \
                                        tuesday char(1), \
                                        wednesday char(1), \
                                        thursday char(1), \
                                        friday char(1), \
                                        saturday char(1), \
                                        sunday char(1), \
                                        start_date date , \
                                        end_date date);")
    
    cur.execute("CREATE TABLE calendar_dates (service_id serial references calendar(service_id), \
                                              date date, \
                                              exception_type char(1));")


    cur.execute("CREATE TABLE trips (route_id integer references routes(route_id), \
                                     service_id serial references calendar(service_id), \
                                     trip_id integer PRIMARY KEY, \
                                     direction_id char(1));")
    
    cur.execute("CREATE TABLE stop_times (trip_id integer references trips(trip_id), \
                                          arrival_time time, \
                                          departure_time time, \
                                          stop_id serial references stops(stop_id), \
                                          stop_sequence serial);")


    conn.commit()
    cur.close()
    conn.close()

main()
