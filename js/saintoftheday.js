$(document).ajaxStart(function(){
    $("#wait").css("display", "block");
});

$(document).ajaxComplete(function(){
    $("#wait").css("display", "none");
});

function setWindowHeight(){
    var windowHeight = window.innerHeight;
    var saintWrapper = document.getElementById('saintWrapper');
    saintWrapper.style.height = windowHeight + "px";
}
window.addEventListener("resize",setWindowHeight,false);

var today = new Date();
var day = today.getDate();
var month = today.getMonth();
month = month + 1;

$(document).ready(function() {
  setWindowHeight();
	$.ajax({
		type: "GET",
		url: 'https://saint.wpengine.com/wp-json/wp/v2/saint?filter[monthnum]=' + month + '&filter[day]=' + day,
    cache: false,
    crossDomain: true,
		dataType: 'json',
			error: function() {
			alert( 'No Saint Today!' );
		},
		success: function(data) {
			data.forEach(function(post) {

        var saintBox = '';

        var dateunformatted = post.date;
        var monthnum = dateunformatted.substring(5,7);
        var daynum = dateunformatted.substring(8,10);

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

				saintBox += '<div class="saintInner">';
        saintBox += '<h1>' + post.title.rendered + '</h1>';
        saintBox += '<p>' + montharray[monthnum] + ' ' + daynum + ' <span>Saint of the Day</span></p>';
        saintBox += '</div>';

        document.getElementById('saintToday').innerHTML += saintBox;

			});
		}
	});
});
