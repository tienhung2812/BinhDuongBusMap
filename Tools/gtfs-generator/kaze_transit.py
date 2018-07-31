#!/usr/bin/python
# -*- coding: utf-8 -*-


from __future__ import print_function
import transitfeed
import pandas as pd

timetable = pd.read_excel('General_timetable.xlsx', encoding='utf-8')    

NORMAL_DATE = "mon-tues-wed-thurs-fri-sat-sun"

def getOffDates(start, col):
    off_dates = timetable.iloc[start-1][col+8]
#    is_holiday = False
    if (off_dates == unichr(8595)):
       return "mon-tues-wed-thurs-fri-sat-sun"
    if (pd.isnull(off_dates)==False):
        try:
            off_dates = str(off_dates)
            if (off_dates == "T7,CN"):
                off_dates = "mon-tues-wed-thurs-fri"
                is_holiday = True
            elif (off_dates == "CN"):
                off_dates = "mon-tues-wed-thurs-fri-sat"
                is_holiday = True
            elif (off_dates == "T2-6"):
                off_dates = "sat-sun"
                is_holiday = True
            elif (off_dates == "T2-6,CN"):
                off_dates = "sat"
                is_holiday = True
        except:
            pass
    else:
        off_dates = NORMAL_DATE
    return off_dates



def addStopTimeByTrip(trip, timeList, stopList):
    for i in range(len(timeList)):        
        timeItem=timeList[i]
        for j in range(len(stopList)):
            if (unicode(stopList[j].stop_name) == unicode(timeItem['stop_name'])):
                trip.AddStopTime(stopList[j], stop_time=timeItem['stop_time'])



def getScheduleByCol(option, col):
    list=[]
    is_holiday = False
    if (option == "5x-forward"):
        route_id = timetable.iloc[9][col]
        start = 12
        off_dates = getOffDates(start-1, col-8)            
        for i in range(12,44):
            stop_name = timetable.iloc[i][1]
            time = timetable.iloc[i][col]
            if (pd.isnull(time) == False):
                try:
                    val = {'stop_name':stop_name, 'stop_time': str(time)}
                    list.append(val)
                except:
                    pass
    elif (option == "5x-backward"):
        route_id = timetable.iloc[47][col]
        start = 50
        off_dates = getOffDates(start-1, col-8)
        for i in range(50, 50+31):
            stop_name = timetable.iloc[i][1]
            time = timetable.iloc[i][col]
            if (pd.isnull(time) == False):
                try:
                    val = {'stop_name':stop_name, 'stop_time': str(time)}
                    list.append(val)
                except:
        route_id = 66
                    pass
    elif (option == "66"):
        start = 91
        off_dates = getOffDates(start, 1)
        for i in range(91,91+16):
            stop_name = timetable.iloc[i][1]
            time = timetable.iloc[i][col]
            if (pd.isnull(time) == False):
                try:                                                           
                    val = {'stop_name':stop_name, 'stop_time': str(time)}
                    list.append(val)
                except:
                    pass
    elif (option == "68-forward"):
        route_id = 68
        start = 91
        off_dates = getOffDates(start, col-8)        
        for i in range(91,91+8):
            stop_name = timetable.iloc[i][30]
            time = timetable.iloc[i][col]
            if (pd.isnull(time) == False):
                try:                                                           
                    val = {'stop_name':stop_name, 'stop_time': str(time)}
                    list.append(val)
                except:
                    pass

    elif (option == "68-backward"):
        route_id = 68
        start = 103
        off_dates = getOffDates(start, col-8)
        for i in range(103,103+8):
            stop_name = timetable.iloc[i][30]
            time = timetable.iloc[i][col]
            if (pd.isnull(time) == False):
                try:                                                           
                    val = {'stop_name':stop_name, 'stop_time': str(time)}
                    list.append(val)
                except:
                    pass

    elif (option == "67"):
        route_id = 67
        start = 96
        off_dates = getOffDates(start, col-8)        
        for i in range(96, 96+15):
            stop_name = timetable.iloc[i][71]
            time = timetable.iloc[i][col]
            if (pd.isnull(time) == False):
                try:                                                           
                    val = {'stop_name':stop_name, 'stop_time': str(time)}
                    list.append(val)
                except:
                    pass
    elif (option == "39-forward"):
        route_id = 39
        start = 8        
        off_dates = getOffDates(start, col)
        for i in range(8, 8+38):
            stop_name = timetable.iloc[i][71]
            time = timetable.iloc[i][col+8]
            if (pd.isnull(time) == False):
                try:                                                           
                    val = {'stop_name':stop_name, 'stop_time': str(time)}
                    list.append(val)
                except:
                    pass
    elif (option == "39-backward"):
        route_id = 39
        start = 49
        stop_name_col = 71
        number_of_stops = 38
        off_dates = getOffDates(start, col)
        for i in range(start, start+number_of_stops):
            stop_name = timetable.iloc[i][stop_name_col]
            time = timetable.iloc[i][col+8]
            if (pd.isnull(time) == False):
                try:
                    val = {'stop_name': stop_name, 'stop_time': str(time)}
                    list.append(val)
                except:
                    pass            
    if (off_dates == NORMAL_DATE):
        is_holiday = True
    else:
        is_holiday = False
    return (route_id, list, off_dates, is_holiday)


def main():    
    schedule = transitfeed.Schedule()
    agency = schedule.AddAgency("Becamex Tokyu Bus Co.,ltd", "http://www.becamex-tokyu-bus.com/", "VN")
    agency.agency_lang = "Vietnamese"
    holiday_service_period = schedule.GetDefaultServicePeriod()
    holiday_service_period.service_id = 0
    holiday_service_period.SetStartDate("20180609")
    holiday_service_period.SetEndDate("20190609")
    holiday_service_period.SetDateHasService(date="20180101", has_service=False)
    holiday_service_period.SetDateHasService(date="20180214", has_service=False)
    holiday_service_period.SetDateHasService(date="20180215", has_service=False)
    holiday_service_period.SetDateHasService(date="20180216", has_service=False)
    holiday_service_period.SetDateHasService(date="20180217", has_service=False)
    holiday_service_period.SetDateHasService(date="20180218", has_service=False)
    holiday_service_period.SetDateHasService(date="20180219", has_service=False)
    holiday_service_period.SetDateHasService(date="20180220", has_service=False)
    holiday_service_period.SetDateHasService(date="20180425", has_service=False)
    holiday_service_period.SetDateHasService(date="20180430", has_service=False)
    holiday_service_period.SetDateHasService(date="20180501", has_service=False)
    holiday_service_period.SetDateHasService(date="20180903", has_service=False)

    service_period = schedule.NewDefaultServicePeriod()
    service_period.service_id = 1
    service_period.SetStartDate("20180609")
    service_period.SetEndDate("20190609")
    service_period.SetWeekdayService(True)
    #service_period.SetDateHasService("20180101", False)
    '''
        read all available stops from stops.csv and put them into an array
        then read the General_timetable.xlsx, get the name of stop
        for that name, lookup in the array to find the right stop in array
        that stop will be the argument of trip.AddStopTime(stop, stop_time)
            
    '''
    stopList=[]
    stops_file = pd.read_csv("stops.csv", encoding='utf-8')
    for i in range(len(stops_file)):
        name = stops_file.iloc[i].stop_name
        lat  = stops_file.iloc[i].stop_lat
        lng  = stops_file.iloc[i].stop_lon
        stopList.insert(-1,schedule.AddStop(name=name, lat=lat, lng=lng))


    route51 = schedule.AddRoute(route_id="51", short_name="Blue51",
                                long_name="Toà nhà Becamex - Chùa Bà Thiên Hậu - hikari - Đại học Quốc tế miền đông", route_type="Bus")
    route52 = schedule.AddRoute(route_id="52", short_name="Blue52",
                                long_name="Tòa nhà Becamex - Chùa Bà Thiên Hậu - hikari", route_type="Bus")
    route53 = schedule.AddRoute(route_id="53", short_name="Blue53",
                                long_name="Tòa nhà Becamex - Chùa Bà Thiên Hậu - Trường Ngô Thời Nhiệm", route_type="Bus")
    route55 = schedule.AddRoute(route_id="55", short_name="Blue55",
                                long_name="Tòa nhà Becamex - Ngã Ba Đại Lộ BD-HVL - hikari - Đại học Quốc tế Miền Đông", route_type="Bus")
    route39 = schedule.AddRoute(route_id="39", short_name="Red",
                                long_name="Tòa nhà Becamex - (HVL) - hikari - KCN VSIP2", route_type="Bus")
    route66 = schedule.AddRoute(route_id="66", short_name="Yellow",
                                long_name="ĐHQT MĐ - SORA gardens - hikari - ĐHQT MĐ", route_type="Bus")
    route67 = schedule.AddRoute(route_id="67", short_name="Green",
                                long_name="hikari - Chợ Phú Chánh - hikari", route_type="Bus")
    route68 = schedule.AddRoute(route_id="68", short_name="Pink",
                                long_name="hikari - Nhà ở an sinh xã hội Hòa Lợi - KCN VSIP2", route_type="Bus")

    '''
        Information of  Bus 51, 52, 53, 55
        From Becamex Tower to EIU - forward trip        
    '''
    for col in range (9,61): 
        route_id, timeList, off_dates, is_holiday = getScheduleByCol("5x-forward", col)
        if (route_id == 51):
            trip51_forward = route51.AddTrip(schedule, headsign="Đến Đại học Quốc tế miền đông")
            trip51_forward.service_id = off_dates
            trip51_forward.direction_id = 0
            if (is_holiday == True):
                trip51_forward.service_period = 0
            else:
                trip51_forward.service_period = 1

            addStopTimeByTrip(trip51_forward, timeList, stopList)
        elif (route_id == 52):
            trip52_forward = route52.AddTrip(schedule, headsign="Đến hikari")
            trip52_forward.service_id = off_dates
            trip52_forward.direction_id = 0
            if (is_holiday == True):
                trip52_forward.service_period = 0
            else:
                trip52_forward.service_period = 1
            addStopTimeByTrip(trip52_forward, timeList, stopList)                                            
        elif (route_id == 53):
            trip53_forward = route53.AddTrip(schedule, headsign="Đến Trường Ngô Thời Nhiệm")
            trip53_forward.service_id = off_dates
            trip53_forward.direction_id = 0
            if (is_holiday == True):
                trip53_forward.service_period = 0
            else:
                trip53_forward.service_period = 1
            addStopTimeByTrip(trip53_forward, timeList, stopList)
        elif (route_id == 55):                                                                  
            trip55_forward = route55.AddTrip(schedule, headsign="Đến Đại học Quốc tế miền đông")    
            trip55_forward.service_id = off_dates
            trip55_forward.direction_id = 0
            if (is_holiday == True):
                trip55_forward.service_period = 0
            else:
                trip55_forward.service_period = 1
            addStopTimeByTrip(trip55_forward, timeList, stopList)                                         
    '''
        Information of Bus 51, 52, 53, 55
        From EIU to Becamex Tower - backward trip

    '''
    for col in range (9,50):                                                                                            
        route_id, timeList, off_dates, is_holiday = getScheduleByCol("5x-backward", col)
        if (route_id == 51):
            trip51_backward = route51.AddTrip(schedule, headsign="Đến Toà nhà Becamex")
            trip51_backward.direction_id = 1
            trip51_backward.service_id = off_dates
            if (is_holiday == True):
                trip51_backward.service_period = 0
            else:
                trip51_backward.service_period = 1
            addStopTimeByTrip(trip51_backward, timeList, stopList)
        elif (route_id == 52):
            trip52_backward = route52.AddTrip(schedule, headsign="Đến Tòa nhà Becamex")
            trip52_backward.service_id = off_dates
            trip52_backward.direction_id = 1
            if (is_holiday == True):
                trip52_backward.service_period = 0
            else:
                trip52_backward.service_period = 1
            addStopTimeByTrip(trip52_backward, timeList, stopList)                                            
        elif (route_id == 53):
            trip53_backward = route53.AddTrip(schedule, headsign="Đến Tòa nhà Becamex")
            trip53_backward.service_id = off_dates
            trip53_backward.direction_id = 1
            if (is_holiday == True):
                trip53_backward.service_period = 0
            else:
                trip53_backward.service_period = 1
            addStopTimeByTrip(trip53_backward, timeList, stopList)
        elif (route_id == 55):                                                                  
            trip55_backward = route55.AddTrip(schedule, headsign="Đến Tòa nhà Becamex")   
            trip55_backward.service_id = off_dates
            trip55_backward.direction_id = 1
            if (is_holiday == True):
                trip55_backward.service_period = 0
            else:
                trip55_backward.service_period = 1
            addStopTimeByTrip(trip55_backward, timeList, stopList)                                         
    '''
        Informaion of Bus 66
        From EIU to EIU -one direction trip
    '''
    for col in range (9,9+11):                                                                                            
        route_id, timeList, off_dates, is_holiday = getScheduleByCol("66", col)
        trip66 = route66.AddTrip(schedule, headsign="Đến Toà nhà Becamex")
        trip66.service_id = off_dates
        if (is_holiday == True):
            trip66.service_period = 0
        else:
            trip66.service_period = 1
        addStopTimeByTrip(trip66, timeList, stopList)
    '''
        Information of Bus 68
        From hikari to VIP2 - forward trip        
    
    '''
    for col in range (37,37+10):                                                                                            
        route_id, timeList, off_dates, is_holiday = getScheduleByCol("68-forward", col)
        trip68_forward = route68.AddTrip(schedule, headsign="Đến KCN VSIP2")
        trip68_forward.service_id = off_dates
        trip68_forward.direction_id = 0
        if (is_holiday == True):
            trip68_forward.service_period = 0
        else:
            trip68_forward.service_period = 1
        addStopTimeByTrip(trip68_forward, timeList, stopList)
    '''
        Information of Bus 68
        From VIP2 to hikari - backward trip        
    
    '''
    for col in range (37,37+10):                                                                                            
        route_id, timeList, off_dates, is_holiday = getScheduleByCol("68-backward", col)
        trip68_backward = route68.AddTrip(schedule, headsign="Đến hikari")
        trip68_backward.service_id = off_dates
        trip68_backward.direction_id = 1
        if (is_holiday == True):
            trip68_backward.service_period = 0
        else:
            trip68_backward.service_period = 1
        addStopTimeByTrip(trip68_backward, timeList, stopList)


    '''

        Information of Bus 67
        From hikari to hikari - one direction trip
    
    '''
    for col in range (71+8, 71+17):                                                                                            
        route_id, timeList, off_dates, is_holiday = getScheduleByCol("67", col)
        trip67 = route67.AddTrip(schedule, headsign="Đến hikari")
        trip67.service_id = off_dates
        if (is_holiday == True):
            trip67.service_period = 0
        else:
            trip67.service_period = 1
        addStopTimeByTrip(trip67, timeList, stopList)

    '''
        Information of Bus 39
        From Becamex Tower to VSIP2 - forward trip
    
    '''
    for col in range (71, 71+15):
        route_id, timeList, off_dates, is_holiday = getScheduleByCol("39-forward", col)
        trip39_forward = route39.AddTrip(schedule, headsign="Đến KCN VSIP2")
        trip39_forward.service_id = off_dates
        trip39_forward.direction_id = 0
        if (is_holiday == True):
            trip39_forward.service_period = 0
        else:
            trip39_forward.service_period = 1
        addStopTimeByTrip(trip39_forward, timeList, stopList)

    
    '''
        Information of Bus 39
        From Becamex Tower to VSIP2 - backward trip
    '''
    
    for col in range (71, 71+17):
        route_id, timeList, off_dates, is_holiday = getScheduleByCol("39-backward", col)
        trip39_backward = route39.AddTrip(schedule, headsign="Đến Toà nhà Becamex")
        trip39_backward.service_id = off_dates
        trip39_backward.direction_id = 1
        if (is_holiday == True):
            trip39_backward.service_period = 0
        else:
            trip39_backward.service_period = 1
        addStopTimeByTrip(trip39_backward, timeList, stopList)
        




    schedule.WriteGoogleTransitFeed('data')
    schedule.Validate()

main()    
