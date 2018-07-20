#!/usr/bin/python
# -*- coding: utf8 -*-

import sys
import csv
import time
import logging
from datetime import datetime
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

#Setting
printData = False
printSample = False
printNumDateOffError= False
printServiceIDError = True
defaultDateOff = ["2018-01-01","2018-05-01","2018-04-30","2018-04-25","2019-02-20","2018-02-19","2018-02-18","2018-02-17","2018-02-16","2018-02-15","2018-02-14","2018-09-02"]
#Log Config
logging.basicConfig(filename='checkBusSchelue.log',level=logging.DEBUG)

class CompareResult:
    # Here will be the instance stored.
    route_id = 0
    RouteID = False
    NumStop = False
    StopName = False
    StopOrder = False
    NumTime = False
    TimeOrder = False
    NumDateOff = False
    ServiceId = False

    def __init__(self,id):
        self.route_id = id
        self.RouteID = False
        self.NumStop = False
        self.StopName = False
        self.StopOrder = False
        self.NumTime = False
        self.TimeOrder = False
        self.NumDateOff = False
        self.ServiceId = False
    
    def getResult():
        return RouteID and NumStop and StopName and StopOrder and NumTime and TimeOrder and NumDateOff and ServiceID

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

def log(ltype,text):
    if(ltype=="info"):
        logging.info(datetime.now().strftime("%Y-%m-%d %H:%M:%S") +": "+text)
    elif(ltype=="debug"):
        logging.debug(datetime.now().strftime("%Y-%m-%d %H:%M:%S")+": "+text)
    elif(ltype=="warning"):
        logging.warning(datetime.now().strftime("%Y-%m-%d %H:%M:%S")+": "+text)
    elif(ltype=="error"):
        logging.error(datetime.now().strftime("%Y-%m-%d %H:%M:%S")+": "+text)

def openSample(route_id,direction):
    #Mo file trong folder sample de lay mau
    #Tra ve array cua file
    content = []
    if(int(route_id)/10!=5):
        log('info',"Open sample/"+route_id+"-"+direction+".csv")
        with open("sample/"+str(route_id)+"-"+str(direction)+".csv") as f:
            content=f.readlines()
            content = [x.strip() for x in content]
        return content
    else:
        log('info',"Open sample/"+"51_52_53_55-"+str(direction)+".csv")
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

def isNewRoute(route_id,row):
    newRoute = True
    for i in routes:
        if(route_id==i):
            newRoute=False
            break
    if newRoute:
        routes.append(route_id)
        log("info","ADD ROUTE "+route_id+" at row "+row)
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

def identifyServiceID(data):
    if(len(data)<1):
        return 1
    else:
        cn = 'CN' in data
        t7 ='T7' in data
        t26 = 'T2-6' in data
        #print data +" : "+str(cn) +" "+str(t7)+" "+str(t26)
        if(cn and not t7 and not t26):
            return 2
        elif(cn and t7 and not t26):
            return 3
        elif(not cn and not t7 and t26):
            return 4
        elif(cn and not t7 and t26):
            return 5
        else:
            print bcolors.FAIL + bcolors.BOLD + "ERROR: "+bcolors.ENDC +"Not found service ID"
            log("error","Not found service ID")
            exit()

def AnalyzeContent(data):
    for row in range(0,len(data)):
        route = None
        for droute in cdata:
            #Search for route   
            if(data[row][croute_id]==droute.route_id):
                route = droute
                break
        
        #Search for new stop name
        isNewStopName = True
        if len(route.stops)>0 and row>0:
            if data[row][cstop_name] == data[row-1][cstop_name]:
                isNewStopName = False
        #If yes, add new Stop object to Route
        if isNewStopName:
            route.stops.append(Stop(data[row][cstop_name]))
            #print 'New stop '+ data[row][cstop_name]
            log('info','Route '+ data[row][croute_id]+' ADD STOP '+data[row][cstop_name] +' at row '+ data[row][crow]) 
        
        #Find is new time 
        #Always the last added stop name
        isNewTime = True
        if len(route.stops[-1].arrival_time)>0:
            if data[row][carrival_time] == route.stops[-1].arrival_time[-1].time:
                isNewTime = False
        
        if isNewTime:
            route.stops[-1].arrival_time.append(StopTime(data[row][carrival_time],data[row][cservice_id]))
        
        #Find new date off
        #Always the last added time  
        isNewDateOff = True
        if len(route.stops[-1].arrival_time)>0:
            if len(route.stops[-1].arrival_time[-1].dateOff)>0:
                for date in route.stops[-1].arrival_time[-1].dateOff:
                    if date == data[row][cdate]:
                        isNewDateOff = False
        
        if isNewDateOff and len(data[row][cdate].replace(" ",""))>0:
            route.stops[-1].arrival_time[-1].dateOff.append(data[row][cdate])
            
                      
    # for route in cdata:
    #     #Search route
    #     if(data[croute_id]==route.route_id):
    #         #Search new stop name
    #         isNewStopName = True
    #         for stop in route.stops:
    #             if (data[cstop_name]==stop.name):
    #                 isNewStopName = False
    #                 break
    #         #If yes, add new Stop object to Route
    #         if isNewStopName:
    #             route.stops.append(Stop(data[cstop_name]))
    #             log('info','Route '+data[croute_id]+' ADD STOP '+data[cstop_name] +' at row '+ data[crow])
                
    #         #Search Stop name
    #         for stop in route.stops:
    #             if (data[cstop_name]==stop.name):
    #                 #Search for new time
    #                 isNewTime = True
    #                 for stopTime in stop.arrival_time:
    #                     if (data[carrival_time]==stopTime.time):
    #                         isNewTime = False
    #                         break
    #                 if isNewTime:
    #                     stop.arrival_time.append(StopTime(data[carrival_time],data[cservice_id]))
    #                     log('info','Route '+data[croute_id]+' at stop '+data[cstop_name] +' ADD NEW TIME '+data[carrival_time]+' service type '+data[cservice_id]+' at row '+ data[crow])
                    
    #                 #Search time
    #                 for stopTime in stop.arrival_time:
    #                     if (data[carrival_time]==stopTime.time):
    #                         #Search for new date off
    #                         isNewDateOff = True
    #                         for date in stopTime.dateOff:
    #                             if(data[cdate]==date):
    #                                 isNewDateOff = False
    #                         if isNewDateOff:
    #                             #log('info','Route '+data[croute_id]+' at stop '+data[cstop_name] +' at time '+data[carrival_time]+' service type '+data[cservice_id]+' ADD NEW DAY OFF '+ data[cdate] +' at row '+ data[crow])
    #                             stopTime.dateOff.append(data[cdate])

def AnalyzeSample(data,route_id,direction):
    log('info','Analyze sample for route '+route_id+'-'+direction)
    sample = Route(route_id,direction)
    if (int(route_id)/10!=5):
        #Not route 51 52 53 55

        #Search col have service_type
        sservice_type = 0
        #Get service data
        service_type_data= []
        haveQuote = False
        waitContent=''
        for line in data.pop(0).split(delimiter):
            if '"' in line and not haveQuote:
                waitContent += line
                haveQuote = True
            elif not '"' in line and haveQuote:
                waitContent += line
            elif '"' in line and haveQuote:
                waitContent+=line
                service_type_data.append(str(waitContent))
                haveQuote = False
                waitContent=''
            else :
                service_type_data.append(str(line))
            
        for stopData in data:
            stop = stopData.split(delimiter)
            #Add new stop
            stopName = stop.pop(0)
            sample.stops.append(Stop(stopName))
            index = 1
            for timeData in stop:
                #Search time data
                if (len(timeData.split())>0 and len(timeData.split(':'))>1):
                    #Always add to last added stop
                    sample.stops[-1].arrival_time.append(StopTime(timeData,str(identifyServiceID(service_type_data[index]))))
                    #Add day off
                    sample.stops[-1].arrival_time[-1].dateOff = defaultDateOff
                index+=1
    return sample

def CompareRouteID(data,sample):
    routeID = False
    routemsg = bcolors.BOLD+ 'routeID:'+bcolors.ENDC + str(data.route_id) + ' | Sample: '+ str(sample.route_id)
    if data.route_id == sample.route_id:
        log("info",'Correct '+routemsg)
        routeID = True
    else:
        log('error','Wrong '+routemsg) 
        print 'Wrong '+routemsg
    return routeID

def CompareNumStop(data,sample):
    NumStop = False
    numstopmsg = bcolors.BOLD+ 'NumStop:'+bcolors.ENDC + str(len(data.stops)) + ' | Sample: '+ str(len(sample.stops))
    if len(data.stops)==len(sample.stops):
        #print 'Correct '+numstopmsg
        NumStop = True
    else:
        log('error','Wrong '+numstopmsg) 
        print 'Wrong '+numstopmsg

    return NumStop

def CompareStopName(data,sample):
    StopName = True
    if (len(data.stops)<=len(sample.stops)):
        #print data.stops[-1].name +'|'+ sample.stops[-1].name
        for stop in sample.stops:
            perStopName = False
            for dataStop in data.stops:
                if stop.name.replace(" ","") == dataStop.name.replace(" ",""):
                    perStopName = True
            if not perStopName:
                StopName = False
                log('error','Do not have stop '+stop.name+'in Data')
                print 'Do not have stop '+bcolors.BOLD+stop.name+bcolors.ENDC+'in '+bcolors.BOLD+ 'Data'+ bcolors.ENDC
    elif len(sample.stops)>0:
        for stop in data.stops:
            perStopName = False
            for dataStop in sample.stops:
                if stop.name.replace(" ","") == dataStop.name.replace(" ",""):
                    perStopName = True
            if not perStopName:
                StopName = False
                log('error','Do not have stop '+stop.name+'in Data')
                print 'Do not have stop '+bcolors.BOLD+stop.name+bcolors.ENDC+'in '+bcolors.BOLD+ 'Sample'+ bcolors.ENDC   
    

    if not len(sample.stops)>0:
        StopName = False
        print 'Incorrupt sample to compare StopName'

    return StopName

def CompareStopOrder(data,sample):
    StopOrder = True
    numSampleStop = len(sample.stops)
    numDataStop = len(data.stops)
    indexStop = 0
    correctCount = 0
    
    if numSampleStop>=numDataStop:
        for i in range(0,numSampleStop):
            if numDataStop>0:
                if data.stops[i].name.replace(" ","")== sample.stops[i].name.replace(" ",""):
                    correctCount += 1
                else:
                    StopOrder = False
                    log('error','Wrong StopOrder:' + str(data.stops[i].name) + ' | Sample: '+ str(sample.stops[i].name))
                    print 'Wrong '+bcolors.BOLD+ 'StopOrder:'+bcolors.ENDC + str(data.stops[i].name) + ' | Sample: '+ str(sample.stops[i].name)
            else:
                StopOrder = False
                log('error','Missing Stop '+ str(i+1) +': ' + str(sample.stops[i].name)+ ' in DATA')
                print 'Missing '+bcolors.BOLD+ 'Stop '+ str(i+1) +': '+bcolors.ENDC + str(sample.stops[i].name) + ' in '+bcolors.WARNING+bcolors.BOLD +' DATA '+ bcolors.ENDC
            numDataStop -= 1
    elif numSampleStop>0:
        for i in range(0,numDataStop):
            if numDataStop>0:
                if data.stops[i].name.replace(" ","")== sample.stops[i].name.replace(" ",""):
                    correctCount += 1
                else:
                    StopOrder = False
                    log('error','Wrong StopOrder:' + str(data.stops[i].name) + ' | Sample: '+ str(sample.stops[i].name))
                    print 'Wrong '+bcolors.BOLD+ 'StopOrder:'+bcolors.ENDC + str(data.stops[i].name) + ' | Sample: '+ str(sample.stops[i].name)
            else:
                StopOrder = False
                log('error','Not have Stop '+ str(i+1) +': ' + str(data.stops[i].name)+ ' in SAMPLE')
                print 'Not have '+bcolors.BOLD+ bcolors.FAIL+ 'Stop '+ str(i+1) +': '+bcolors.ENDC + str(data.stops[i].name) + ' in '+bcolors.WARNING+bcolors.BOLD +' SAMPLE '+ bcolors.ENDC
            numSampleStop -= 1
    else:
        StopOrder = False
    return StopOrder
    
def CompareNumTime(data,sample):
    NumTime = True
    if (len(data.stops)!=len(sample.stops)):
        NumTime = False
        print 'Can not compare NumTime becase of NumStop Fail'
    else:
        for i in range(0,len(sample.stops)):
            #Get into each stop
            slen = len(sample.stops[i].arrival_time)
            dlen = len(data.stops[i].arrival_time)
            if slen!=dlen:
                NumTime = False
                numstopmsg = bcolors.BOLD+ 'NumTime:'+bcolors.ENDC+' at stop '+ str(i) + ' '+sample.stops[i].name + ':'+str(dlen)+' | Sample: '+ str(slen)
                print 'Wrong '+numstopmsg
    return NumTime   

def CompareTimeOrder(data,sample):
    TimeOrder = True
    if (len(data.stops)!=len(sample.stops)):
        NumTime = False
        print 'Can not compare TimeOrder becase of NumStop Fail'
    else:
        for i in range(0,len(sample.stops)):
            #Get Stop
            #Get number of time on that stop
            slen = len(sample.stops[i].arrival_time)
            dlen = len(data.stops[i].arrival_time)

            if slen>=dlen :
                currentdlen = dlen
                for time in range(0,len(sample.stops[i].arrival_time)):
                    if currentdlen >0:
                        #Comapre 08:00:00 vs 08:00
                        #Convert time
                        sampleTime = str(sample.stops[i].arrival_time[time].time).replace(" ","")[:5]
                        dataTime = str(data.stops[i].arrival_time[time].time).replace(" ","")[:5]

                        #Compare time
                        #Compare Hour
                        sameHour = int(sampleTime.split(":")[0]) == int(dataTime.split(":")[0])
                        sameMin = int(sampleTime.split(":")[1]) == int(dataTime.split(":")[1])
                        if  sameHour != sameMin :
                            log('error','Wrong TimeOrder: ' + str(dataTime) + ' | Sample: '+ str(sampleTime))
                            print 'Wrong '+bcolors.BOLD+ 'TimeOrder: '+bcolors.ENDC + str(dataTime) + ' | Sample: '+ str(sampleTime)
                            TimeOrder = False
                    else:
                        log('error','Missing Time:' + str(sample.stops[i].arrival_time[time].time) +' in DATA')
                        print 'Missing '+bcolors.BOLD+ 'Time:'+bcolors.ENDC + str(sample.stops[i].arrival_time[time].time) + ' in DATA'
                        TimeOrder = False
                    currentdlen-=1
            #Chua lam phan kiem tra phan du cua dlen

    return TimeOrder

def CompareNumDateOff(data,sample,NumTime):
    NumDateOff = True
    if not NumTime:
        NumDateOff = False
        print 'Can not compare NumDateOff becase of NumTime Fail'
    else:
        for stop in range(0,len(sample.stops)):
            #Get to every stop
            for time in range(0,len(sample.stops[stop].arrival_time)):
                #Start compare
                sampleDate = len(sample.stops[stop].arrival_time[time].dateOff)
                dataDate = len(data.stops[stop].arrival_time[time].dateOff)
                if sampleDate != dataDate :
                    NumDateOff = False
                    log('error','Wrong NumDateOff: '+' at stop '+ str(stop) + ' ' +sample.stops[stop].name + str(dataDate) + ' | Sample: '+ str(sampleDate))
                    numdateoffmsg = bcolors.BOLD+ 'NumDateOff:'+bcolors.ENDC+' at stop '+ str(stop) + ' '+bcolors.BOLD+sample.stops[stop].name + bcolors.ENDC+' time '+ bcolors.BOLD+str(sample.stops[stop].arrival_time[time].time)[:5]+bcolors.ENDC+' :'+str(dataDate)+' | Sample: '+ str(sampleDate)
                    if printNumDateOffError:
                        print 'Wrong '+numdateoffmsg
    return NumDateOff

def CompareServiceID(data,sample,NumTime):
    ServiceID = True
    if not NumTime:
        ServiceID = False
        print 'Can not compare ServiceID becase of NumStop Fail'
    else:
        for stop in range(0,len(sample.stops)):
            #Get in Stop
            for time in range(0,len(sample.stops[stop].arrival_time)):
                #Get in Time
                sampleService = sample.stops[stop].arrival_time[time].service_id
                dataService = data.stops[stop].arrival_time[time].service_id
                if sampleService != dataService:
                    print 'ss'
                    ServiceID = False
                    log('error','Wrong ServiceID : '+' at stop '+ str(stop) + ' ' +sample.stops[stop].name + str(dataService) + ' | Sample: '+ str(sampleService))
                    serviceidmsg = bcolors.BOLD+ 'ServiceID :'+bcolors.ENDC+' at stop '+ str(stop) + ' '+bcolors.BOLD+sample.stops[stop].name + bcolors.ENDC+' time '+ bcolors.BOLD+str(sample.stops[stop].arrival_time[time].time)[:5]+bcolors.ENDC+' :'+str(dataService)+' | Sample: '+ str(sampleService)
                    if printServiceIDError:
                        print 'Wrong '+serviceidmsg
    return ServiceID

def Compare(data,sample,result):
    print "-"*toolbar_width
    #Compare Route ID
    routeID = CompareRouteID(data,sample)
    if routeID:
        log('info',"Route "+data.route_id+": Route ID OK")
        print "Route ID OK!"
    else:
        log('error',"Route "+data.route_id+": Route ID NOT OK")
        print bcolors.FAIL +bcolors.BOLD +"Route ID NOT OK!"+bcolors.ENDC
    #Compare Stop
    #Compare number of stops
    NumStop = CompareNumStop(data,sample)
    if NumStop:
        log('info',"Route "+data.route_id+": NumStop OK")
        print "NumStop OK!"
    else:
        log('error',"Route "+data.route_id+": NumStop NOT OK")
        print bcolors.FAIL +bcolors.BOLD +"NumStop NOT OK!"+bcolors.ENDC

    #Compare Stop name
    StopName = CompareStopName(data,sample)    
    if StopName:
        log('info',"Route "+data.route_id+": StopName OK")
        print "StopName OK!"
    else:
        log('error',"Route "+data.route_id+": StopName NOT OK")
        print bcolors.FAIL +bcolors.BOLD +"StopName NOT OK!"+bcolors.ENDC
    # #Compare stop name order

    StopOrder = CompareStopOrder(data,sample) 
    if StopOrder:
        log('info',"Route "+data.route_id+": StopOrder  OK")
        print "StopOrder OK!"
    else:
        log('error',"Route "+data.route_id+": StopOrder NOT OK")
        print bcolors.FAIL +bcolors.BOLD +"StopOrder NOT OK!"+bcolors.ENDC
    
    #Compare Time
    NumTime = CompareNumTime(data,sample)
    if NumTime:
        log('info',"Route "+data.route_id+": NumTime OK")
        print "NumTime OK!"
    else:
        log('error',"Route "+data.route_id+": NumTime NOT OK")
        print bcolors.FAIL +bcolors.BOLD +"NumTime NOT OK!"+bcolors.ENDC

    #Compare NumOrder
    TimeOrder = CompareTimeOrder(data,sample)
    if TimeOrder:
        log('info',"Route "+data.route_id+": TimeOrder OK")
        print "TimeOrder OK!"
    else:
        log('error',"Route "+data.route_id+": TimeOrder NOT OK")
        print bcolors.FAIL +bcolors.BOLD +"TimeOrder NOT OK!"+bcolors.ENDC
    
    #Compare NumDateOff
    NumDateOff = CompareNumDateOff(data,sample,NumTime)
    if NumDateOff:
        log('info',"Route "+data.route_id+": NumDateOff OK")
        print "NumDateOff OK!"
    else:
        log('error',"Route "+data.route_id+": NumDateOff NOT OK")
        print bcolors.FAIL +bcolors.BOLD +"NumDateOff NOT OK!"+bcolors.ENDC

    #Compare ServiceID
    ServiceID = CompareServiceID(data,sample,NumTime)
    if ServiceID:
        log('info',"Route "+data.route_id+": ServiceID OK")
        print "ServiceID OK!"
    else:
        log('error',"Route "+data.route_id+": ServiceID NOT OK")
        print bcolors.FAIL +bcolors.BOLD +"ServiceID NOT OK!"+bcolors.ENDC

    result.RouteID = routeID
    result.NumStop = NumStop
    result.StopName = StopName
    result.StopOrder = StopOrder
    result.NumTime = NumTime
    result.TimeOrder = TimeOrder
    result.NumDateOff = NumDateOff
    result.ServiceID = ServiceID

class Route:
    route_id=0
    stops = []
    direction = 0
    def __init__(self,id,direction):
        self.route_id =id
        self.stops = []
        self.dateOff=[]
        self.direction = direction

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
    print "Route:" + bcolors.WARNING+ str(data.route_id) + bcolors.ENDC
    print "Stops:",
    for stop in data.stops:
        #Print stop name
        print "\t"+bcolors.BOLD + str(stop.name) + bcolors.ENDC
        #Print time
        for stopTime in stop.arrival_time:
            print "\t\t"+bcolors.OKGREEN+ str(stopTime.time) +bcolors.ENDC,
            #Print Service type
            print "\t"+ str(stopTime.service_id),
            #Print date off
            print "\t"+ str(len(stopTime.dateOff)) + " days\t"
            # for date in stopTime.dateOff:
            #     print "\t\t\t\t\t"+date


#MAIN
log("warning","Start checking...")
if(len(sys.argv)!=3):
    print ("Missing: python checkBusSchedule.py 'input file' 'direction (0/1 : forward/backward)'")
    exit()
else:
    with open(sys.argv[1]) as f:
        content = f.readlines()
    # you may also want to remove whitespace characters like `\n` at the end of each line
    content = [x.strip() for x in content] 

    #Get direction
    direction = sys.argv[2]
    
    #Analyze content
    totalLength = len(content)-2
    #Bat dau tu 2 vi row 2 laf row bat dau
    print bcolors.BOLD + "Analyzing input: "+bcolors.ENDC
    contentData = []
    sys.stdout.write("[")
    for i in range(2,len(content)-1):
        #Them stt cua row vao cuoi content
        content[i] = content[i]+","+str(i+1)
        
        #Chia col cuar tung row thanh array
        data =content[i].split(delimiter) 
        contentData.append(data)
        dataDayOff = []
        for daysInWeek in cday:
            dataDayOff.append(data[daysInWeek])
        #Check new Route and check service ID
        if(isNewRoute(data[croute_id],data[crow])):
            newRoute = Route(data[croute_id],direction)
            cdata.append(newRoute)
        if (not checkServiceID(dataDayOff,data[cservice_id])):
            analyze_content_log+='\n' +bcolors.FAIL + 'Wrong service_ID:' + bcolors.ENDC + 'at row '+str(i+1)
        
        if((i%(len(content)-3)/toolbar_width)==0):
            sys.stdout.write("-")
    
    AnalyzeContent(contentData)
    sys.stdout.write("]\n")

    #Print content cdata
    if printData:
        print "Data"
        for data in cdata:
            printData(data)
    # print analyze_content_log       

    #Start Compare
    CompareResultData = []
    for route in cdata:
        #Get route 
        log("warning","Checking route "+route.route_id)
        print "Checking route "+bcolors.BOLD + bcolors.WARNING+ route.route_id + bcolors.ENDC
        #Get route sample
        sampleContent = openSample(route.route_id,direction)
        #Analyze Sample
        sdata = AnalyzeSample(sampleContent,route.route_id,direction)

        if printSample:
            print '\nSample data'
            printData(sdata)
        #Compare
        #Create Route Compare Result Instance
        result = CompareResult(route.route_id)
        Compare(route,sdata,result)
        CompareResultData.append(result)

        print ""
