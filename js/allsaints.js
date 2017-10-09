$(document).ajaxStart(function(){
    $("#wait").css("display", "block");
    $("#modalWait").css("display", "block");
});

$(document).ajaxComplete(function(){
    $("#wait").css("display", "none");
    $("#modalWait").css("display", "none");
});

$(document).ready(function() {
	$.ajax({
		type: "GET",
		url: 'https://saint.wpengine.com/wp-json/wp/v2/saint?per_page=100&filter[orderby]=date&filter[order]=asc',
    cache: false,
    crossDomain: true,
		dataType: 'json',
			error: function() {
			alert( 'Uh oh. Error encountered while loading saints. Say a prayer.' );
		},
		success: function(data) {

      var montharray = new Array();
        montharray['01'] = "January";
        montharray['02'] = "February";
        montharray['03'] = "March";
        montharray['04'] = "April";
        montharray['05'] = "May";
        montharray['06'] = "June";
        montharray['07'] = "July";
        montharray['08'] = "August";
        montharray['09'] = "September";
        montharray['10'] = "October";
        montharray['11'] = "November";
        montharray['12'] = "December";

			data.forEach(function(post) {

        var saintItem = '';
        var dateunformatted = post.date;
        var monthnum = dateunformatted.substring(5,7);
        var daynum = dateunformatted.substring(8,10);

				saintItem += '<div class="saint-item">';
        saintItem += '<p data-toggle="modal" data-target="#modalBio" data-saintid="' + post.id + '" data-saintname="' + post.title.rendered + '">' + post.title.rendered + ' <span>' + montharray[monthnum] + ' ' + daynum + '</span></p>';
        saintItem += '</div>';

        document.getElementById('allsaints').innerHTML += saintItem;

			});
		}
	});
});

$(document).ready(function() {
	$.ajax({
		type: "GET",
		url: 'https://saint.wpengine.com/wp-json/wp/v2/saint?per_page=100&offset=100&filter[orderby]=date&filter[order]=asc',
    cache: false,
    crossDomain: true,
		dataType: 'json',
			error: function() {
			alert( 'Uh oh. Error encountered while loading saints. Say a prayer.' );
		},
		success: function(data) {

      var montharray = new Array();
        montharray['01'] = "January";
        montharray['02'] = "February";
        montharray['03'] = "March";
        montharray['04'] = "April";
        montharray['05'] = "May";
        montharray['06'] = "June";
        montharray['07'] = "July";
        montharray['08'] = "August";
        montharray['09'] = "September";
        montharray['10'] = "October";
        montharray['11'] = "November";
        montharray['12'] = "December";

			data.forEach(function(post) {

        var saintItem = '';
        var dateunformatted = post.date;
        var monthnum = dateunformatted.substring(5,7);
        var daynum = dateunformatted.substring(8,10);

				saintItem += '<div class="saint-item">';
        saintItem += '<p data-toggle="modal" data-target="#modalBio" data-saintid="' + post.id + '" data-saintname="' + post.title.rendered + '">' + post.title.rendered + ' <span>' + montharray[monthnum] + ' ' + daynum + '</span></p>';
        saintItem += '</div>';

        document.getElementById('allsaints').innerHTML += saintItem;

			});
		}
	});
});

$(document).ready(function() {
  $('#modalBio').on('show.bs.modal', function (event) {

    $("#wait").addClass('hidethis'); // Hide

    var button = $(event.relatedTarget); // Button that triggered the modal
    var saintname = button.data('saintname'); // Extract info from data-* attributes
    var saintid = button.data('saintid');
    var modal = $(this);

    $.ajax({
  		type: "GET",
  		url: 'https://saint.wpengine.com/wp-json/wp/v2/saint/' + saintid,
      cache: false,
      crossDomain: true,
  		dataType: 'json',
  			error: function() {
  			alert( 'Unable to load posts.' );
  		},
      success: function(post) {

        modal.find('.modal-title').text(saintname);
        modal.find('.modal-body').text(post.acf.text);

			},
  	});
  })
});

$(document).ready(function() {
  $('#modalBio').on('hide.bs.modal', function (event) {

    var modal = $(this);
    modal.find('.modal-title').empty();
    modal.find('.modal-body').empty();

  })
});
