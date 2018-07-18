#!/usr/bin/python
# -*- coding: utf8 -*-

import sys
import json
import time
import logging
###DEFINE

#Ngay le:
#  2018-01-01 
#  2018-05-01 
#  2018-04-30 
#  2018-04-25 
#  2019-02-20 
#  2018-02-19 
#  2018-02-18 
#  2018-02-17 
#  2018-02-16 
#  2018-02-15 
#  2018-02-14 
#  2018-09-02 

#Log Config
logging.basicConfig(filename='checkBusSchelue.log',level=logging.DEBUG)

#Progress bar
toolbar_width = 30

delimiter = ","
routes = []
analyze_content_log = ''
#Col def
#Content
croute_id = 0
cstop_name = 1
carrival_time = 2
cday = [3,4,5,6,7,8,9]
cdate = 10
cservice_id = 11
crow = 12

#ContentData
cdata = []
#SampleData
sdata=None
class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def openSample(route_id,direction):
    #Mo file trong folder sample de lay mau
    #Tra ve array cua file
    if(route_id%10!=5):
        with open("sample/"+str(route_id)+"-"+str(direction)+".csv") as f:
            content=f.readlines()
            content = [x.strip() for x in content]
        return content
    else:
        with open("sample/"+"51_52_53_55-"+str(direction)+".csv") as f:
            content = [x.strip() for x in content]
            content=f.readlines()
        return content

def translateService_id(service_id):
    #Chuyen tu service id sang lich hoat dong cac ngay trong tuan
    # T2-->CN
    daysInWeek = 7
    service = []
    if(service_id==1):
        #T2-->CN
        for i in range(0,7):
            service.append(True)
    elif (service_id==2):
        #T2-->T7
        for i in range(0,6):
            service.append(True)
        service.append(False)
    elif(service_id==3):
        #T2-->T6
        for i in range(0,5):
            service.append(True)
        for j in range(0,2):
            service.append(False)
    elif(service_id==4):
        #T7,CN
        for i in range(0,5):
            service.append(False)
        for j in range(0,2):
            service.append(True)
    elif(service_id==5):
        #T7
        for i in range(0,5):
            service.append(False)
        service.append(True)
        service.append(False)
    if(len(service)!=7):
        print bcolors.FAIL +bcolors.BOLD+"Return service ID code fail:" + bcolors.ENDC+ " Service ID: " +service_id
    return service  

def isNewRoute(route_id):
    newRoute = True
    for i in routes:
        if(route_id==i):
            newRoute=False
            break
    if newRoute:
        routes.append(route_id)
        logging.info('Add route '+bcolors.WARNING + bcolors.BOLD + route_id + bcolors.ENDC)
        return True
    else:
        return False

def checkServiceID(input,service_id):
    sample = translateService_id(int(service_id))
    for i in range(0,7):
        if(bool(int(input[i]))!=sample[i]):
            print bcolors.FAIL +bcolors.BOLD+"Wrong service_id:" + bcolors.ENDC
            return False
    return True

def AnalyzeContent(data):
    for route in cdata:
        #Search route
        if(data[croute_id]==route.route_id):
            #Search new stop name
            isNewStopName = True
            for stop in route.stops:
                if (data[cstop_name]==stop.name):
                    isNewStopName = False
                    break
            #If yes, add new Stop object to Route
            if isNewStopName:
                route.stops.append(Stop(data[cstop_name]))
                
            #Search Stop name
            for stop in route.stops:
                if (data[cstop_name]==stop.name):
                    #Search for new time
                    isNewTime = True
                    for stopTime in stop.arrival_time:
                        if (data[carrival_time]==stopTime.time):
                            isNewTime = False
                            break
                    if isNewTime:
                        stop.arrival_time.append(StopTime(data[carrival_time],data[cservice_id]))
                    
                    #Search time
                    for stopTime in stop.arrival_time:
                        if (data[carrival_time]==stopTime.time):
                            #Search for new date off
                            isNewDateOff = True
                            for date in stopTime.dateOff:
                                if(data[cdate]==date):
                                    isNewDateOff = False
                            if isNewDateOff:
                                stopTime.dateOff.append(data[cdate])

class Route:
    route_id=0
    stops = []

    def __init__(self,id,service):
        self.route_id =id
        self.service_id = service
        self.stops = []
        self.dateOff=[]

class Stop:
    name = ''
    arrival_time = []   
    def __init__(self,stop_name):
        self.name = stop_name
        self.arrival_time = []

class StopTime:
    time = ''
    dateOff = []
    service_id = 0
    def __init__(self,atime,servicetype):
        self.time = atime
        self.dateOff = []
        self.service_id = servicetype

def printData(data):
    #Printr Route name
    print "-------------------------------------"
    print "Route:" + bcolors.WARNING+ data.route_id + bcolors.ENDC
    print "Stops:",
    for stop in data.stops:
        #Print stop name
        print "\t"+bcolors.BOLD + stop.name + bcolors.ENDC
        #Print time
        for stopTime in stop.arrival_time:
            print "\t\t"+bcolors.OKGREEN+stopTime.time+bcolors.ENDC,
            #Print Service type
            print "\t"+stopTime.service_id,
            #Print date off
            print "\t"+ str(len(stopTime.dateOff)) + " days\t"
            # for date in stopTime.dateOff:
            #     print "\t\t\t\t\t"+date



#MAIN
if(len(sys.argv)!=2):
    print ("Error input")
    exit()
else:
    with open(sys.argv[1]) as f:
        content = f.readlines()
    # you may also want to remove whitespace characters like `\n` at the end of each line
    content = [x.strip() for x in content] 

    
    #Analyze content
    totalLength = len(content)-2
    #Bat dau tu 2 vi row 2 laf row bat dau
    print bcolors.BOLD + "Analyzing input: "+bcolors.ENDC

    sys.stdout.write("[")
    for i in range(2,len(content)-1):
        #Them stt cua row vao cuoi content
        content[i] = content[i]+","+str(i+1)
        
        #Chia col cuar tung row thanh array
        data=content[i].split(delimiter)
        dataDayOff = []
        for daysInWeek in cday:
            dataDayOff.append(data[daysInWeek])
        #Check new Route and check service ID
        if(isNewRoute(data[croute_id])):
            newRoute = None
            newRoute = Route(data[croute_id],data[cservice_id])
            cdata.append(newRoute)
        if (not checkServiceID(dataDayOff,data[cservice_id])):
            analyze_content_log+='\n' +bcolors.FAIL + 'Wrong service_ID:' + bcolors.ENDC + 'at row '+str(i+1)
        AnalyzeContent(data)
        if((i%(len(content)-3)/toolbar_width)==0):
            sys.stdout.write("-")
    sys.stdout.write("]\n")
    

    #Print cdata
    print "Data"
    for data in cdata:
        printData(data)
    print analyze_content_log
        

    