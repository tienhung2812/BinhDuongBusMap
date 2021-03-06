$(function(){
	$('div[onload]').trigger('onload');
});
var lang=$('input[name=language]:checked').attr("id");

$.getJSON("assets/content/"+lang+"/"+lang+".json",function(jsdata){
    $("[key]").each (function (index) {
		var strTr = jsdata [$(this).attr ('key')]; 
        $(this).html (strTr); 
        
    }); 
});

function createBusStation(arg){
    var availableStation=[];
    var station="";
        $.getJSON("assets/content/schedule.json", function(data) {
            for(i=0;i<data.length;i++){
                if(data[i].route==arg){
                    for(j=0;j<stationName.length;j++){
                        var valueName = 'station'+(j+1);
                        if(data[i][valueName].length>0){
                            k=0;
                            var conflict = false;
                            while(k!=availableStation.length){
                                if(availableStation[k]==j){
                                    conflict=true;
                                    break;
                                }
                                k++;
                            }
                            if((!conflict)||(availableStation.length==0)){
                                availableStation.push(j);
                                
                            } 
                        }
                    }
                    
                }
            }
            availableStation.sort(sortNumber);
            console.log("Station num: "+availableStation.length);
            for(i=0;i<availableStation.length;i++){
                station+=availableStation[i];
                if(i!=availableStation.length-1)
                    station+=",";
            }
            console.log("Station: "+ station);
        })
}


var route = window.location.href.split('#');
route =route[route.length-1];
$.getJSON("assets/content/"+lang+"/buses-name.json",function(routeName){
    for(i=0;i<routeName.length;i++){
        if(route==routeName[i].route){
            $("#route-name").html(route+'-'+routeName[i].name);
            $("#route-name").attr("style","color:"+routeName[i].color+";");
            $('#nav-back-btn').append('<img src="assets/img/back-icon-20-'+routeName[i].code+'.png">');
            
        }
    }
});


var stationName;
function getStationName(){
    $.getJSON("assets/content/"+lang+"/station.json", function(json) {
        stationName = json;
    });
    console.log("Get station:"+lang);
}
getStationName();

function getBusSchedule(){
    var arg=route;
    
    // var route = this.href.substring(this.href.indexOf("#")+1);
    console.log("Search station:"+arg);
    var availableStation=[];
    var updateFile = true;
    $.getJSON("assets/content/availableStation.json",function(stationData){
        console.log("Station data length: "+stationData.length + "\nNeed to update?");
        for(i=0;i<stationData.length;i++){
            if(stationData[i].route==arg){
                console.log("Station data:"+stationData[i].route);
                updateFile=false;
                
            }
        }
        console.log(updateFile);
        if(updateFile){
            createBusStation(arg);
            alert("Need to update availableRoute.json");
        }else{
            addStationHtml(arg,stationData);
        }
        
    })
     	
};
 
function addStationHtml(route,stationData){
    for(j=0;j<stationData.length;j++){
        if(stationData[j].route==route){
            var input = '<div class="panel-group" id="accordion">';
            for(i=0;i<stationData[j].station.length;i++){
                var station = stationData[j].station[i];
                if(route==39||route==67||route==68){
                    station=station-1;
                }
                if(route==67&&i==stationData[j].station.length-1){
                    input+='					<div class="panel panel-default" data-toggle="collapse" data-parent="#accordion" href="#'+stationData[j].route+'-'+stationData[j].station[i]+'-e-'+'forward'+'" onclick="addTimelineHtml('+stationData[j].route+','+stationData[j].station[i]+',true)">'+
                '						<div class="panel-heading">'+
                '							<h4 class="panel-title row">'+
                '								<span class="circle-icon"></span>'+
                '								<a>'+stationName[station].Name+'</a>'+
                '								'+
                '							</h4>'+
                '						</div>'+
                '						<div id="'+stationData[j].route+'-'+stationData[j].station[i]+'-e-'+'forward" class="panel-collapse collapse in" >'+
                '						</div>'+
                '					</div>'+    
                '				</div>';
                }
                else{
                    input+='					<div class="panel panel-default" data-toggle="collapse" data-parent="#accordion" href="#'+stationData[j].route+'-'+stationData[j].station[i]+'-'+'forward'+'" onclick="addTimelineHtml('+stationData[j].route+','+stationData[j].station[i]+',false)">'+
                '						<div class="panel-heading">'+
                '							<h4 class="panel-title row">'+
                '								<span class="circle-icon"></span>'+
                '								<a>'+stationName[station].Name+'</a>'+
                '								'+
                '							</h4>'+
                '						</div>'+
                '						<div id="'+stationData[j].route+'-'+stationData[j].station[i]+'-'+'forward" class="panel-collapse collapse in" >'+
                '						</div>'+
                '					</div>'+    
                '				</div>';
                }
                
            }
            input+='				</div>';
        }
    }
    $("#forward").append(input);
}

function addTimelineHtml(route,station,end){
    $("#loadingBar_BG").show();
    setBusRouteProgressBar(20);
    var date = new Date();
    var time = date.getHours()+":"+date.getMinutes();
    if(end){
        var id = route+'-'+station+'-e-'+'forward';
    }
    else{
        var id = route+'-'+station+'-'+'forward';
    }
    
    if(getCount(document.getElementById(id), false)==0){
    console.log("Get timeline from route: "+route+" station: "+station+ " end:"+ end);
    $.getJSON("assets/content/schedule.json",function(data){
        var input='<div class="panel-body">'+
        '								<div class="timeline">';
        setBusRouteProgressBar(50);
        for(i=0;i<data.length;i++){  
            if(data[i].route==route){
                var stationValue = "station"+(station+1);
                if(route==39||route==67||route==68){
                    stationValue = "station"+(station);
                }
                
                if(end){
                    stationValue += "-e";
                }
                if(data[i][stationValue].length>0){
                input+='<div class="containeer right">'+
                '										<div class="content">'+
                '											<p>';
                if(CompareTime(time,data[i][stationValue])){
                    
                    input+='												<strong>'+data[i][stationValue]+'</strong>';
                }
                    
                else{
                    input+=data[i][stationValue];
                }
                
                input+='											</p>'+
                '										</div>'+
                '									</div>';
                }
            }
        }
        input +='								</div>'+
        '							</div>';
        if(end){
            $('#'+route+'-'+station+'-e-'+'forward').append(input);
        }else{
            $('#'+route+'-'+station+'-'+'forward').append(input);
        }
        
    })
    
    }
    setBusRouteProgressBar(100);
    // Zoom to clicked station 
	var clickedStation = document.getElementById(route+"-"+station+"-forward").previousElementSibling.firstElementChild.innerText;	
	// console.log(document.getElementById(route+"-"+station+"-forward").previousElementSibling.firstElementChild.innerText);
	console.log(clickedStation);
	for (i=0; i<bus_markers.length; i++) {
		if (bus_markers[i].info.getContent().includes(clickedStation)) {
			map.panTo(bus_markers[i].getPosition());
			map.setZoom(16);
		}
	}
}

function getCount(parent, getChildrensChildren){
    var relevantChildren = 0;
    var children = parent.childNodes.length;
    for(var i=0; i < children; i++){
        if(parent.childNodes[i].nodeType != 3){
            if(getChildrensChildren)
                relevantChildren += getCount(parent.childNodes[i],true);
            relevantChildren++;
        }
    }
    return relevantChildren;
}
function CompareTime(t1,t2){
    if(t1>t2){
        return false;
    }
    else{
        return true;
    }
}

function sortNumber(a,b) {
    return a - b;
}

var progress =1;
//Bus-route Process bar
function setBusRouteProgressBar(percent) {
    var elem = document.getElementById("loadingBar"); 
    var width = progress;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width+=3; 
            elem.style.width = width + '%'; 
            elem.setAttribute('aria-valuenow',width);
        }
    }    
    if(percent==100){
        setTimeout(function() {
            $('#loadingBar_BG').fadeOut();          
        }, 500);
        resetBusRouteProgressBar();
    }
} 

function resetBusRouteProgressBar(){
    progress=1;
    var elem = document.getElementById("loadingBar"); 
    var width = 1;
    elem.setAttribute('aria-valuenow',width);
    elem.setAttribute('aria-valuenow',width);
    elem.style.width = width + '%'; 
 
    
}

