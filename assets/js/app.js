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

$("#button").on("click", function(){
    $('.routes').addClass('routes-hide');
    $("#result").load("assets/content/"+this.href.substring(this.href.indexOf("#")+1) +".html");
    $("#result").removeClass('result-hide');
    $("#result").addClass('result-show');
  });


