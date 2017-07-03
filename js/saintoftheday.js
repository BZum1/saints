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
      console.log('alert');
		},
		success: function(data) {
			data.forEach(function(post) {

        var saintBox = '';
        var saintBio = '';

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
        saintBox += '<h1>' + post.acf.title + ' ' + post.title.rendered + '</h1>';
        saintBox += '<p>' + montharray[monthnum] + ' ' + daynum + ' <span>Saint of the Day</span></p>';
        if(post.acf.text) {
          saintBox += '<button type="button" class="view-bio btn btn-center btn-success"><i class="fa fa-info-circle"></i> Bio &amp; Reflection</button>';
        }
        saintBox += '</div>';

        document.getElementById('saintToday').innerHTML += saintBox;

        if(post.acf.text) {
          saintBio += '<div class="container"><h3>' + post.acf.title + ' ' + post.title.rendered + '</h3>';
          saintBio += '<p>' + post.acf.text + '</p><h6>Reflection</h6><p>' + post.acf.reflection + '</p>';
          saintBio += '<button type="button" class="close-bio btn btn-center btn-success"><i class="fa fa-times-circle-o"></i> Close</button></div>';

          document.getElementById('saintBio').innerHTML += saintBio;
        }

        if(post.acf.image) {
          var image = post.acf.image;
          $('#saintWrapper').css('background-image', 'url(' + image + ')');
          $('#saintWrapper .filter').css('background-color', 'rgba(0,0,0,0.7)');
          $('#saintWrapper').addClass('featuredImage');
        } else {
          $('#saintWrapper').css('background-image', 'url("https://saint.wpengine.com/wp-content/uploads/saintbg1.jpg")');
        }

        $('.view-bio').on('click', function(){
          $("#saintBio").css('display','block');
        });

        $('.close-bio').on('click', function(){
          $("#saintBio").css('display','none');
        });

			});
		}
	});
});
