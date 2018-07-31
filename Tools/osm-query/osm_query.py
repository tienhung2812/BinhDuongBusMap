from OSMPythonTools.nominatim import Nominatim
from OSMPythonTools.overpass import overpassQueryBuilder
from OSMPythonTools.overpass import Overpass
import codecs
import json
import csv

nominatim = Nominatim()
nyc = nominatim.query('Tỉnh Bình Dương')
print(nyc.areaId())
##print('\n')
# Get a string containing a query
query = overpassQueryBuilder(area=nyc.areaId(), elementType='node', selector='"highway"="bus_stop"', out='body')
overpass = Overpass()
busStops = overpass.query(query, timeout=25)

##file_JSON = codecs.open('bus_39_JSON.txt','w', 'utf-8')
###print(busStops.toJSON())
##file_JSON.write(json.dumps(busStops.toJSON()))

#file = codecs.open('bus_stops.txt','w', 'utf-8')
#mylist = {
#        "bus" : "Kaze"
#    }
#mylist = []
#file = codecs.open('bus_all.json','w', 'utf-8')
##for i in busStops.elements():
##    routes = i.tag('bus_routes')
##    if (type(routes) == str):
##        if ('39' in routes):
##            dict = {
##                    'id' : i.id(),
##                    'lat': i.lat(),
##                    'lon': i.lon(),
##                    'tag': i.tags()
##                }
##            mylist.append(dict)

##for i in busStops.elements():
##    routes = i.tag('bus_routes')
##    if (type(routes) == str):
##        if ('39' in routes):
##            print(i.tags())
##            for k, v in i.tags().items():
##                print(k, v)
with open('stops.txt', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')
                        #quotechar='|', quoting=csv.QUOTE_MINIMAL)
    writer.writerow(['stop_name','stop_lat','stop_lon'])                        
    for i in busStops.elements():
        routes = i.tag('bus_routes')
        if (type(routes) == str):
            writer.writerow([i.tag('name'),i.lat(), i.lon()])
#            data = {
#                    "lat": i.lat(),
#                    "lng": i.lon(),
#                    "name": i.tag('name')                    
#                }                
##            print(data)
#            mylist.append(data)
#    exit
#            mylist.append(dict)
##print(mylist)
#file.write(json.dumps(mylist))
##file.close()
#file.close()
