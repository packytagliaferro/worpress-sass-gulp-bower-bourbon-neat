// ==== CORE ==== //

// A simple wrapper for all your custom jQuery; everything in this file will be run on every page
;(function($){

//Global vars
var myDirectoryPath = YOURSITENAME.templateURI;
var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|Windows Phone|Tizen|Bada)/);
var eventType = (isTouchDevice) ? 'touchend' : 'click';

/********************************
Make the custom post filetrable 
********************************/
	$(function(){
	    // Insert jQuery code here!
	     // init Isotope
	  var $container = $('#customPost-list').isotope({
	    itemSelector: '.customPost-item',
	    layoutMode: 'fitRows',
	    getSortData: {
	      name: '.name',
	      symbol: '.symbol',
	      number: '.number parseInt',
	      category: '[data-category]',
	      weight: function( itemElem ) {
	        var weight = $( itemElem ).find('.weight').text();
	        return parseFloat( weight.replace( /[\(\)]/g, '') );
	      }
	    }
	  });

	  // filter functions
	  var filterFns = {
	    // show if number is greater than 50
	    numberGreaterThan50: function() {
	      var number = $(this).find('.number').text();
	      return parseInt( number, 10 ) > 50;
	    },
	    // show if name ends with -ium
	    ium: function() {
	      var name = $(this).find('.name').text();
	      return name.match( /ium$/ );
	    }
	  };

	  // bind filter button click
	  $('#category-filter').on( 'click', 'button', function() {
	    var filterValue = $( this ).attr('data-filter');
	    // use filterFn if matches value
	    filterValue = filterFns[ filterValue ] || filterValue;
	    $container.isotope({ filter: filterValue });
	  });

	  
	  // change is-checked class on buttons
	  $('#category-filter').each( function( i, buttonGroup ) {
	    var $buttonGroup = $( buttonGroup );
	    $buttonGroup.on( 'click', 'button', function() {
	      $buttonGroup.find('.is-checked').removeClass('is-checked');
	      $( this ).addClass('is-checked');
	    });
	  });
	  

	}); //End filter function


/********************************
	Put images in modal
********************************/
	
	//General Varibales 
	var linkedImg = $('body').find( $('img').parent('a') );
	linkedImg.attr('ocular-image', '1');


	$('a[ocular-image]').off().on('click', function(e) {
		
		event.preventDefault();

		//get the array info
		var dataTag = $(this).attr('ocular-image');
        var ocularTags = $('.site-content').find("[ocular-image=" + dataTag + "]");

		//Get the image info
		var currentImageIndex = ocularTags.index($(this));
        var currentImage = ocularTags.index($(this)) +1;
        var totalImages = ocularTags.length;
		var url = $(this).attr('href');
		var title = $(this).children().attr('title');

		//append to the modal
		$('#modal-image .modal-body').append('<img src="' + url + '" >');
		$('#modal-image .modal-header').append('<h4>' + title + '</h4>');
		$('.modal-content').append('<div class="modal-controls"><div class="icon-previous"><img src="' + myDirectoryPath + '/img/icon-left.svg"></div>
            	<div class="modal-imageTotal"><p><span id="ocularCurrentImage"> '+ currentImage +'</span> of '+ totalImages +'</p></div>
            	<div class="icon-next"><img src="' + myDirectoryPath + '/img/icon-right.svg"></div></div>');

		//Navigation vars
		var $next = $('.icon-next');
    	var $prev = $('.icon-previous');


		//Show Nav
		if(currentImage == 1){
          $prev.hide();
        } else {
          $prev.show();
        }

        if(currentImage == totalImages){
          $next.hide();
        } else {
          $next.show();
        }

        function updateImage(i){

              var nextImage = ocularTags.get(i);
              var nextImageSrc = $(nextImage).attr('href');
              var nextImageTitle = $(nextImage).children().attr('title');
              var nextImageNumber = (i) + 1;
              var image = $('#modal-image .modal-body img');
              var animateOut = 'animated alternate iteration zoomOut';
              var animateIn = 'animated alternate iteration zoomIn';
  			  var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';


              image.removeClass(animateIn).addClass(animateOut).one(animationEnd,function() {
			      $(this).removeClass(animateOut);
			      image.attr('src', nextImageSrc).addClass(animateIn);
			  });

              //Update slide title
              $('#modal-image .modal-header h4').replaceWith( '<h4> '+ nextImageTitle + '</h4>');
              //update slide nextImageNumber
              $('#ocularCurrentImage').replaceWith('<span id="ocularCurrentImage">'+ nextImageNumber +'</span>');

              //remove arrows
              if(nextImageNumber == totalImages){
                $next.hide();
              } else {
                $next.show();
              }

              if (nextImageNumber == 1) {
                $prev.hide();
              } else {
                $prev.show();
              }

        }
        //navigate through slides
        $('.icon-previous img').off().on( eventType, function() {
            
            currentImageIndex = (currentImageIndex) - 1;
            updateImage(currentImageIndex); 

        });

        $('.icon-next img').off().on( eventType, function() {

            currentImageIndex = (currentImageIndex) + 1;
            updateImage(currentImageIndex);

        });
        


		//open the modal
		Custombox.open({
			target: '#modal-image',
			//effect: 'slide',
			close: function () {
				$('#modal-image .modal-body img, #modal-image .modal-header h4, .icon-close, .modal-controls').remove();
			}
		});
	});

	//remove appended modal images



}(jQuery));
