function setWindowHeight(){
    var windowHeight = window.innerHeight;
    var saintWrapper = document.getElementById('saintWrapper');
    saintWrapper.style.height = windowHeight + "px";
}
window.addEventListener("resize",setWindowHeight,false);

$(document).ready(function() {
  setWindowHeight();
	$.ajax({
		type: "GET",
		url: 'https://winereview.wpengine.com/wp-json/wp/v2/posts?per_page=1&filter[monthnum]=4&filter[day]=20',
		dataType: 'json',
			error: function() {
			alert( 'No Saint Today!' );
		},
		success: function(data) {

			data.forEach(function(post) {

        var saintBox = '';

				saintBox += '<div class="saintInner">';
        saintBox += '<h1>' + post.title.rendered + '</h1>';
        saintBox += '<p>' + post.acf.month + ' ' + post.acf.day + ' <span>Saint of the Day</span></p>';
				saintBox += '<div class="description">' + post.content.rendered + '</div>';
        saintBox += '</div>';

        document.getElementById('saintToday').innerHTML += saintBox;

			});
		}
	});
});
