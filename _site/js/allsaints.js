$(document).ajaxStart(function(){
    $("#wait").css("display", "block");
});

$(document).ajaxComplete(function(){
    $("#wait").css("display", "none");
});

$(document).ready(function() {
	$.ajax({
		type: "GET",
		url: 'https://saint.wpengine.com/wp-json/wp/v2/saint?filter[orderby]=title&filter[order]=asc',
    cache: false,
    crossDomain: true,
		dataType: 'json',
			error: function() {
			alert( 'Unable to load posts.' );
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
        saintItem += '<p>' + post.title.rendered + ' <span>' + montharray[monthnum] + ' ' + daynum + '</span></p>';
        saintItem += '</div>';

        document.getElementById('allsaints').innerHTML += saintItem;

			});
		}
	});
});
