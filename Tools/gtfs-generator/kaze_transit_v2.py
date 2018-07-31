#!/usr/bin/python
# -*- coding: utf-8 -*-

from __future__ import print_function
import transitfeed
import pandas as pd
import psycopg2
from psycopg2 import sql
from datetime import date, datetime
import os
import zipfile
import os


FORWARD = 'L\xc6\xb0\xe1\xbb\xa3t \xc4\x91i' # Lượt đi 
BACKWARD = 'L\xc6\xb0\xe1\xbb\xa3t v\xe1\xbb\x81' # Lượt về 
DEST = '/home/phatvo/Projects/KazeBus/transitfeed/becamex-binhduong-vn/'    # destionation of exported tables in form of csv 
ZIP_LOC = '/home/phatvo/Projects/KazeBus/transitfeed/becamex-binhduong-vn/' # the location of zip file 

# The function reads stop information and insert into database
def fillStops(cur):    
    stops_file = pd.read_csv("data/stops.csv", encoding='utf-8')
    for i in range(len(stops_file)):
        name = stops_file.iloc[i].stop_name.strip()
        lat  = stops_file.iloc[i].stop_lat
        lng  = stops_file.iloc[i].stop_lon
        stop_desc = stops_file.iloc[i].stop_desc        
        if pd.isnull(stop_desc):
            stop_desc = ''
        cur.execute("INSERT INTO stops (stop_name, stop_lat, stop_lon, stop_desc) \
                     VALUES (%s, %s, %s, %s);", (name, lat, lng, stop_desc))            

# The function insert agency information into database
def fillAgency(cur):
    cur.execute("INSERT INTO agency (agency_name, agency_url, agency_timezone, agency_lang, agency_phone) \
                 VALUES (%s, %s, %s, %s, %s);", \
                        ("Becamex Tokyu Bus Co.,ltd", \
                        "http://www.becamex-tokyu-bus.com/", \
                        "Asia/Ho_Chi_Minh", \
                        "vi", \
                        "842742220555"))

# The function inserts route information into database
def fillRoutes(cur):
    routes = [
        (51, 1, "51", "Tuyến Xanh Biển 51: Toà nhà Becamex - Chùa Bà Thiên Hậu - hikari - Đại học Quốc tế miền đông", 
         3, "0000ff", "FFFFFF", "Lượt đi: Toà nhà Becamex -> Chùa Bà Thiên Hậu -> hikari -> Đại học Quốc tế Miền Đông. "+
                                "Lượt về : Đại học Quốc tế Miền Đông -> hikari -> Chùa Bà Thiên Hậu -> Tòa nhà Becamex"),
        
        (52, 1, "52", "Tuyến Xanh Biển 52: Tòa nhà Becamex - Chùa Bà Thiên Hậu - hikari", 3, "0000ff", "FFFFFF", 
                                "Lượt đi: Tòa nhà Becamex -> Chùa Bà Thiên Hậu -> hikari. "+
                                "Lượt về : hikari -> Chùa Bà Thiên Hậu -> Tòa nhà Becamex"),
        
        (53, 1, "53", "Tuyến Xanh Biển 53: Tòa nhà Becamex - Chùa Bà Thiên Hậu - Trường Ngô Thời Nhiệm", 3, "0000ff", "FFFFFF",
                                "Lượt đi: Tòa nhà Becamex -> Chùa Bà Thiên Hậu -> Trường Ngô Thời Nhiệm. "
                                "Lượt về : Trường Ngô Thời Nhiệm -> Chùa Bà Thiên Hậu -> Tòa nhà Becamex"),
        
        (55,1, "55", "Tuyến Nâu 55: Tòa nhà Becamex - Ngã Ba Đại Lộ Bình Dương - Huỳnh Văn Lũy - hikari - Đại học Quốc tế Miền Đông", 
         3, "654321", "FFFFFF", "Lượt đi: Tòa nhà Becamex -> Ngã Ba Đại Lộ Bình Dương -> hikari -> Đại học Quốc tế  Miền Đông. "
                                "Lượt về: Đại học Quốc tế Miền Đông -> hikari -> Ngã Ba Đại Lộ Bình Dương -> Huỳnh Văn Lũy -> Tòa nhà Becamex"),
        
        (39 ,1, "39", "Tuyến Đỏ 39: Tòa nhà Becamex - Huỳnh Văn Lũy - hikari - KCN VSIP2", 3, "ff0000", "FFFFFF",
                                "Lượt đi: Tòa nhà Becamex -> Huỳnh Văn Lũy -> hikari -> KCN VSIP2. "+
                                "Lượt về: KCN VSIP2 -> hikari -> Huỳnh Văn Lũy -> Tòa nhà Becamex"),
        
        (66, 1, "66", "Tuyến Vàng 66: Đại học Quốc tế Miền Đông - SORA gardens - hikari - ĐHQT MĐ", 3, "ffff00", "551A8B",\
                                "Một chiều: Đại học Quốc tế Miền Đông -> SORA gardens -> hikari -> ĐHQT MĐ"),
        
        (67 ,1, "67", "Tuyến Xanh Lá 67: hikari - Chợ Phú Chánh - hikari", 3, "00ff00", "FFFFFF",\
                                "Một chiều: hikari -> Chợ Phú Chánh -> hikari"),
        
        (68 ,1, "68", "Tuyến Hồng 68: hikari - Nhà ở an sinh xã hội Hòa Lợi - Khu công nghiệp VSIP2", 3, "ff69b4", "FFFFFF",\
                                "Lượt đi: hikari -> Nhà ở an sinh xã hội Hòa Lợi-> KCN VSIP2. "+\
                                "Lượt về : Khu công nghiệp VSIP2 -> Nhà ở an sinh xã hội Hòa Lợi -> hikari")
    ]

    for route in routes:
        cur.execute("INSERT INTO routes (route_id, agency_id, route_short_name, \
                                        route_long_name, route_type, route_color, route_text_color, route_desc) \
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s);", 
                    (route[0], route[1], route[2], route[3], route[4], route[5], route[6], route[7]))
                                                                                        
# The function inserts calendar information into database
def fillCalendar(cur):    
    start_date = date(2018, 6, 9)
    end_date = date(2019,6,9)

    # a service runs every day
    cur.execute("INSERT INTO calendar (service_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday, start_date, end_date) \
                 VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);", \
                 (1, 1, 1, 1, 1, 1, 1, 1, start_date, end_date))
    
    # a service runs every day except sunday
    cur.execute("INSERT INTO calendar (service_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday, start_date, end_date) \
                 VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);", \
                 (2, 1, 1, 1, 1, 1, 1, 0, start_date, end_date))

    # a service runs only on weekdays: from monday to friday
    cur.execute("INSERT INTO calendar (service_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday, start_date, end_date) \
                 VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);", \
                 (3, 1, 1, 1, 1, 1, 0, 0, start_date, end_date))
    
    # a service runs only on saturdays and sundays
    cur.execute("INSERT INTO calendar (service_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday, start_date, end_date) \
                 VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);", \
                 (4, 0, 0, 0, 0, 0, 1, 1, start_date, end_date))

    # a service runs only on saturdays
    cur.execute("INSERT INTO calendar (service_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday, start_date, end_date) \
                 VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);", \
                 (5, 0, 0, 0, 0, 0, 1, 0, start_date, end_date))    


# The function inserts holidays (dates when Kaze buses do not work) into database
# To do:
# Fetch holidays from a service like google calendar
# Currently we need to type holidays manually
def fillCalendar_dates(cur):
    holidays = ['20180101', '20180214', '20180215', '20180216', '20180217', \
                '20180218', '20180219', '20190220', '20180425', \
                '20180430', '20180501', '20180902']
    
    for holiday in holidays:
        cur.execute("INSERT INTO calendar_dates (service_id, date, exception_type) \
                            VALUES (%s, %s, %s);", \
                            (1, datetime.strptime(holiday, '%Y%m%d'), 1))

    for service in [2,3,4,5]:
        for holiday in holidays:
            cur.execute("INSERT INTO calendar_dates (service_id, date, exception_type) \
                        VALUES (%s, %s, %s);", \
                        (service, datetime.strptime(holiday, '%Y%m%d'), 2))

# The function inserts trip information into database    
def fillTrips(cur):    
    offset = 0    
    sheets = ["Route66","Route67","Route68-Forward", "Route68-Backward", 
              "Route5x-Backward", "Route5x-Forward", \
              "Route39-Forward", "Route39-Backward"]                        
    start = 3
    for s in sheets:
        print(s)
        if s == "Route68-Forward" or s == "Route39-Forward" or s == "Route5x-Forward":
            stop_desc = FORWARD
            direction_id = 0
        elif s == "Route68-Backward" or s == "Route39-Backward" or s == "Route5x-Backward":
            stop_desc = BACKWARD
            direction_id = 1
        elif s == "Route66" or "Route67":
            # there maybe some stops like SORA Gardens appearing on 2 sides of a street
            # this makes stop_desc = "" become unsuitable  
            stop_desc = ""
            direction_id = 0
        df = pd.read_excel('data/General_timetable.xlsx', encoding='utf-8', sheet_name=s)    
        numberOfTrip = df.shape[0]        
        for i in range(numberOfTrip):
            trip_id = i+offset                    
            route_id = df.loc[i][1]
            service_id_raw = df.loc[i][2]
            if (service_id_raw == "CN"):
                service_id = 2
            elif (service_id_raw == "T7,CN"):
                service_id = 3
            elif (service_id_raw == "T2-6,CN"):
                service_id = 5
            elif (service_id_raw == "T2-6"):
                service_id = 4
            else:
                service_id = 1
            # We already have a complete table for route 66
            # No need to consider it in sheets Route5x 
            if ((s == "Route5x-Backward" or s == "Route5x-Forward") and route_id == 66):
                continue            
            cur.execute("INSERT INTO trips (route_id, service_id, trip_id, direction_id) \
                    VALUES (%s, %s, %s, %s);",
                    (route_id, service_id, trip_id, direction_id))                               
            for j in range(start, df.shape[1]):                
                stop_name = df.columns[j].strip()
                duplicate = ".1"
                pos = stop_name.find(duplicate)
                if (pos != -1):
                    stop_name = df.columns[j].split('.')[0]                                                
                # Fetch stop based on stop_name
                # There are 3 "types" of stops:
                # # 1) stop with stop_desc = "". For example: hikari
                # # 2) stop with stop_desc = "Lượt đi". For example: Aroma - Lê Lai
                # # 3) stop with stop_desc = "Lượt về". For example: Aroma - Lê Lai
                # Type 2 and 3 come in a pair
                #
                cur.execute("SELECT stop_id, stop_desc FROM stops WHERE stop_name = %s;", (stop_name,))                
                stop_id_list = cur.fetchall()
                if len(stop_id_list) == 0:
                    print("WARNING: NO STOP FOUND!")
                if len(stop_id_list) == 1:
                    stop_id = stop_id_list[0][0]
                elif len(stop_id_list) == 2:
                    # There are two stops opposite each other. We need to find the suitable one
                    if stop_id_list[0][1] == BACKWARD:
                        stop_id_forward  = stop_id_list[1][0]
                        stop_id_backward = stop_id_list[0][0]
                    elif stop_id_list[0][1] == FORWARD:
                        stop_id_forward = stop_id_list[0][0]
                        stop_id_backward = stop_id_list[1][0]                    
                    if route_id == 66:
                        stop_id = stop_id_forward
                    elif route_id == 67:
                        stop_id = stop_id_backward 
                    elif stop_desc == FORWARD:
                        stop_id = stop_id_forward                        
                    elif stop_desc == BACKWARD:
                        stop_id = stop_id_backward                                                                                                                            
                    else:
                        # if stop_desc is not specified, we need manually choose the correct stop                                    
                        print("Consider route " + str(route_id) + " in sheet " + s)
                        print("For stop name: " + stop_name)
                        print("stop_desc found: " + stop_desc)
                        print("Found stop_id_forward: "+ str(stop_id_forward))
                        print("      stop_id_backward: "+ str(stop_id_backward))
                        print("But cannot decide stop_id because missing stop_desc")                        
                        user_input = raw_input('Enter stop_id_forward or stop_id_backward: ')
                        print("User entered: "+ user_input)
                        stop_id = int(user_input)
                                                         
                time = df.loc[i][j]          
                if time != unichr(8595) and pd.isnull(time) == False and time != 'l':            
                    cur.execute("INSERT INTO stop_times (trip_id, arrival_time, departure_time, stop_id, stop_sequence) \
                        VALUES (%s, %s, %s, %s, %s);", \
                        (trip_id, time, time, stop_id, j))                    
                    ''' I leave this code here. In case someone wants to take a look inside every loop 
                    print("route_id: {0} trip_id: {1}\t service_id: {2} \t  time: {3}\t".format(route_id, trip_id, service_id, time)+\
                            "stop_id: {0}\t j: {1}\t stop_name: ". format(stop_id, j)+stop_name.encode('utf-8'))
                    '''                
        offset = offset + numberOfTrip                    

def copyTableToFileSystem(cur, dest):    
    '''
        List of tables: stops, agency, routes, stop_times, trips, calendar, calendar_dates
    '''
    table_names = ['stops', 'agency', 'routes', 'stop_times', 'trips'] # Not all tables in our database here!!
    # copy some tables from databases to a location in file system
    for table_name in table_names:
        cur.execute(
            sql.SQL("copy {} to %s csv header").format(sql.Identifier(table_name)), (dest+table_name+'.txt',))     
    # Since GTFS format requires date in form of yyyymmdd, we do seperate queries  
    # copy calendar table into a location in file system
    cur.execute("copy (select service_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday, \
                      to_char(start_date :: DATE, 'yyyymmdd') as start_date, \
                      to_char(end_date :: DATE, 'yyyymmdd') as end_date from calendar) \
                      to %s csv header;", (dest+'calendar.txt',))
    # copy calendar_dates table into a location in file system
    cur.execute("copy (select service_id,to_char(date :: DATE, 'yyyymmdd') as date, \
                      exception_type from calendar_dates) \
                      to %s csv header;", (dest+'calendar_dates.txt',))

# The function zips the necessary gtfs files into a compressed file: becamex-binduong-vn.zip (this name cannot be changed!)
def compressFiles(zip_loc):
    cwd = os.getcwd() # get current working directory    
    os.chdir(zip_loc) # change to the location containing the *.txt files and also the zip file 
    table_names = ['stops', 'agency', 'routes', 'stop_times', 'trips', 'calendar', 'calendar_dates'] 
    zf = zipfile.ZipFile('becamex-binhduong-vn.zip', mode='w')    
    for table_name in table_names:
        zf.write(table_name+'.txt')         
    zf.close()
    os.chdir(cwd) # change back to the location of the executing script

def main():
    # Establish connection to Postgresql database
    conn = psycopg2.connect(dbname="kazebus", user="postgres", password="12345")
    dest = DEST
    zip_loc = ZIP_LOC
    cur = conn.cursor()
    # execute some functions to fill up the tables in database    
    fillStops(cur)    
    fillAgency(cur)
    fillRoutes(cur)
    fillCalendar(cur)
    fillCalendar_dates(cur)
    fillTrips(cur)    
    # copy tables into a location in file system 
    copyTableToFileSystem(cur, dest)
    # close the connection to the database
    conn.commit()
    cur.close()
    conn.close()    
    # Compressing the *.txt file into a zip file is a requirement of GTFS specification
    compressFiles(zip_loc)

'''
#PGPASSWORD=12345 pg_dump -Fc --no-acl --no-owner -h localhost -U postgres  kazebus > kazebus.dump
#copy(select service_id,to_char(date :: DATE, 'yyyymmdd'), exception_type from calendar_dates) to '/tmp/calendar_dates.csv' csv header;
#heroku pg:backups:restore 'http://www.dropbox.com/s/rpj2epnmqll02ph/kazebus.dump?dl=1' DATABASE_URL --app kazebusmap --confirm kazebusmap
# Please remove s from https: type 'http', not 'https'
#heroku pg:psql -a kazebusmap
'''
    

main()    
 