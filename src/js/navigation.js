// ==== NAVIGATION ==== //

// Menu toggle script adapted from _s: https://github.com/Automattic/_s
(function($){

	/* Image menu button Un comment to make work

	$('#responsive-menu-toggle').click(function(event) {
		$('#page').toggleClass('menu-open');
		$('.mobile-menu').toggleClass('mobile-menu-open');
	});
	*/


	var menuButton = $('#menuButton');
	menuButton.click(function(event) {
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		menuButton.toggleClass('is-active');
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
