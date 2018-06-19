//setup crossroads
crossroads.addRoute('/imovel/{slug}', function(slug){
    var urlSlug= 'http://larja-back.herokuapp.com/imovel/' + slug;

    $.getJSON(urlSlug)
    .done(function(json) {
        if($.isArray(json) && json.length > 0) {
            $('#page-canvas').load('../../../imovel.html', function() {
                $('#page-content .title h1').text(json[0].fields.name);
                $('#page-content .title figure').text(json[0].fields.full_address);


                 if (json[0].fields.kind.toUpperCase() == 'APARTAMENTO') {
                     type_icon = 'assets/icons/real-estate/apartment-3.png';
                 }else if (json[0].fields.kind.toUpperCase() == 'SOBRADO') {
                     type_icon = 'assets/icons/real-estate/townhouse.png';
                 }else if (json[0].fields.kind.toUpperCase() == 'CASA'){
                     type_icon = 'assets/icons/real-estate/house.png';
                 }else if ((json[0].fields.kind.toUpperCase() == 'SALA COMERCIAL') || (json[0].fields.kind.toUpperCase() == 'BARRACÃO')){
                     type_icon = 'assets/icons/real-estate/office-building.png';
                 }else{
                     type_icon = 'assets/icons/real-estate/condominium.png';
                 }

                $('#image_type').attr("src",type_icon);
                $('#span_type').text(json[0].fields.kind);
                
                $('#client_name').text(json[0].fields.client_name);
                $('#client_phone').text(json[0].fields.client_phone);
                $('#description').text(json[0].fields.description);

                thumbs = json[0].fields.image_filename.split("|");
                baseUrl = json[0].fields.image_drive;
                isFirst = true;
                for (var i = 0; i < thumbs.length; i++) {
                  if (thumbs[i].toUpperCase().indexOf(".JPG") > 0){
                    image = baseUrl + thumbs[i];
                    if (isFirst){
                        $('#thumbs').appendTo('<a href="#'+i+'" id="thumbnail-"'+ i +' class="active"><img src="' + image +'" alt=""></a>');
                    }else{
                        $('#thumbs').appendTo('<a href="#'+i+'" id="thumbnail-"'+ i +'><img src="' + image +'" alt=""></a>');
                    }
                    isFirst = false;
                    $('#gallery').appendTo('<div class="slide"><img src="' + image +'" data-hash="' + i +'"/>');
                  }
                }

            });
        } else {
            $('#page-canvas').load('../../../imovel_404.html')
        }
    })
    .fail(function(jqxhr, textStatus, error) {
        console.log(error);
    });
});

crossroads.routed.add(console.log, console); //log all routes

//setup hasher
function parseHash(newHash, oldHash){
  crossroads.parse(newHash);
}

hasher.initialized.add(parseHash); //parse initial hash
hasher.changed.add(parseHash); //parse hash changes
hasher.init(); //start listening for history change
