(function($){
  $(function(){

    $('.button-collapse').sideNav();
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 1, // Creates a dropdown of 15 years to control year
		min: new Date()
	});

  }); // end of document ready
})(jQuery); // end of jQuery name space