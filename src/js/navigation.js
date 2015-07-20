// ==== NAVIGATION ==== //

// Menu toggle script adapted from _s: https://github.com/Automattic/_s
(function($){

	$('#responsive-menu-toggle').click(function(event) {
		$('#page').toggleClass('menu-open');
		$('.mobile-menu').toggleClass('mobile-menu-open');
	});


	if ( $('.mobile-menu').hasClass('mobile-menu-open')) {

		alert('menu open');
		$('body').click(function(event) {
			$('#page').removeClass('menu-open');
			$('.mobile-menu').removeClass('mobile-menu-open');
		});
	}


}(jQuery));
