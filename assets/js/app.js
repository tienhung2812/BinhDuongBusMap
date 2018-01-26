function bus_route_collapse() {
  if ($('#bus-route-id').hasClass('bus-route-closed')) {
      $('#bus-route-id').removeClass('bus-route-closed'); 
      $('#vertical-collapse-btn-id').removeClass('vertical-collapse-btn-closed'); 
      $('#direction-id').removeClass('direction-bus-route-closed'); 
      $('#horizontal-collapse-btn-id').removeClass('horizontal-collapse-btn-vertical-closed'); 

  }else {
      $('#bus-route-id').addClass('bus-route-closed'); 
      $('#vertical-collapse-btn-id').addClass('vertical-collapse-btn-closed'); 
      $('#direction-id').addClass('direction-bus-route-closed'); 
      $('#horizontal-collapse-btn-id').addClass('horizontal-collapse-btn-vertical-closed'); 
  }

  
}

function direction_collapse() {
  if ($('#direction-id').hasClass('direction-closed')) {
      $('#direction-id').removeClass('direction-closed'); 
      $('#horizontal-collapse-btn-id').removeClass('horizontal-collapse-btn-closed'); 

  }else {

      $('#direction-id').addClass('direction-closed'); 
      $('#horizontal-collapse-btn-id').addClass('horizontal-collapse-btn-closed'); 
  }
}

$(".route-button").on("click", function() {

    
    // resetBusRouteProgressBar();
  }); 

function route_button_onclick(){
    $("#loadingBar_BG").show(); 
    $('.routes').addClass('routes-hide'); 
  
    $("#result").load("assets/content/bus-route.html"); 
    setBusRouteProgressBar(50); 
    $("#result").removeClass('result-hide'); 
    $("#result").addClass('result-show'); 
    setBusRouteProgressBar(100); 
}
var progress = 1; 




//Bus-route Process bar
function setBusRouteProgressBar(percent) {
    var elem = document.getElementById("loadingBar"); 
    var width = progress; 
    var id = setInterval(frame, 10); 
    function frame() {
        if (width >= 100) {
            clearInterval(id); 
        }else {
            width += 3; 
            elem.style.width = width + '%'; 
            elem.setAttribute('aria-valuenow', width); 
        }
    }
    if (percent == 100) {
        setTimeout(function () {
            $('#loadingBar_BG').fadeOut(); 
        }, 500); 
        resetBusRouteProgressBar(); 
    }
}

function resetBusRouteProgressBar() {
    progress = 1; 
    var elem = document.getElementById("loadingBar"); 
    var width = 1; 
    elem.setAttribute('aria-valuenow', width); 
    elem.setAttribute('aria-valuenow', width); 
    elem.style.width = width + '%'; 
 
    
}

// //Translate


function translate(langCode) {
    var langs = ['en', 'vi', 'jp']; 
    var langJS = null; 
    var translate = function (jsdata) {	
	$("[key]").each (function (index) {
		var strTr = jsdata [$(this).attr ('key')]; 
        $(this).html (strTr); 
    }); 
    $("#starting-point").attr("placeholder",jsdata["starting-point"]);
    $("#destination-point").attr("placeholder",jsdata["destination-point"]);
    }
    
    
    if ($.inArray(langCode, langs) != -1) {
        if(getCount(document.getElementById("result"), false)!=0){
            $("#result").empty();
            route_button_onclick();    
        }
        $.getJSON('assets/content/' + langCode + '/'+ langCode +'.json', translate); 
        $("html").attr("lang","en-"+langCode.toUpperCase());
        displayBusRoute(langCode);
        
        
    }
    else{
        translate("en");
    }
        
}
var browserLangCode = navigator.language.substr(0,2);

function displayBusRoute(lang){
    if(lang==undefined){
        lang="vi";
    }
    if(getCount(document.getElementById("buses-display"), false)!=0){
        $("#buses-display").empty();
    }
    $.getJSON("assets/content/"+lang+"/buses.json",function(busesData){
        setBusRouteProgressBar(50); 
        var input="";
        for(i=0;i<busesData.length;i++){
            var route=busesData[i].route;
            var name= busesData[i].name;
            var color = busesData[i].color;
            input+='<a href="#'+route+'" id="button" class="route-button" onclick="displayInfo(\''+route+'\'); route_button_onclick();">';
            input+='<img src="assets/img/'+color+'.png">'
            input+='<h1>'+route+'</h1>';
            input+='<p>'+name+'</p> ';
            input+='</a>';
        }
        $("#buses-display").append(input);
    })
    setBusRouteProgressBar(100); 
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
$().ready(function () {
    $("#loadingBar_BG").hide(); 
    resetBusRouteProgressBar();
    translate(browserLangCode);
    $('#'+browserLangCode).click();
    
})


$("input[name='language']").change(function(){
    translate(this.id);
});

