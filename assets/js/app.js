function bus_route_collapse() {
  if($('#bus-route-id').hasClass('bus-route-closed')) {
      $('#bus-route-id').removeClass('bus-route-closed');
      $('#vertical-collapse-btn-id').removeClass('vertical-collapse-btn-closed');
      $('#direction-id').removeClass('direction-bus-route-closed');
      $('#horizontal-collapse-btn-id').removeClass('horizontal-collapse-btn-vertical-closed');

  }else{
      $('#bus-route-id').addClass('bus-route-closed');
      $('#vertical-collapse-btn-id').addClass('vertical-collapse-btn-closed');
      $('#direction-id').addClass('direction-bus-route-closed');
      $('#horizontal-collapse-btn-id').addClass('horizontal-collapse-btn-vertical-closed');
  }

  
}

function direction_collapse() {
  if($('#direction-id').hasClass('direction-closed')) {
      $('#direction-id').removeClass('direction-closed');
      $('#horizontal-collapse-btn-id').removeClass('horizontal-collapse-btn-closed');

  }else{

      $('#direction-id').addClass('direction-closed');
      $('#horizontal-collapse-btn-id').addClass('horizontal-collapse-btn-closed');
  }
}

$(".route-button").on("click", function(){
    $("#loadingBar_BG").show();
    $('.routes').addClass('routes-hide');
  
    $("#result").load("assets/content/bus-route.html");
    setBusRouteProgressBar(50);
    $("#result").removeClass('result-hide');
    $("#result").addClass('result-show');
    setBusRouteProgressBar(100);
    // resetBusRouteProgressBar();
  });

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

$().ready(function(){
    $("#loadingBar_BG").hide();
    resetBusRouteProgressBar();
}
)