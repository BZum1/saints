$(document).ready(function() {
	$.ajax({
		type: "GET",
		url: 'https://winereview.wpengine.com/wp-json/wp/v2/posts?per_page=1&filter[monthnum]=4&filter[day]=19',
		dataType: 'json',
			error: function() {
			alert( 'No Saint Today!' );
		},
		success: function(data) {

			data.forEach(function(post) {

        var newBottle = '';
				var corkFull = '';
				var i, corks, corkNo, corkYes, style;

				style = post.acf.style;

				var month = post.acf.month;
				var day = post.acf.day;

				switch (style) {

					case 'red':
						styleBlock = '<div class="bottle color-red">';
						break;

					case 'white':
						styleBlock = '<div class="bottle color-white">';
						break;

					case 'rose':
						styleBlock = '<div class="bottle color-rose">';
						break;

					default:
						styleBlock = '';
						break;
				}

				newBottle += '<div class="col-sm-4 bottle-wrap my-3">';

				newBottle += styleBlock;
        newBottle += '<h3>' + post.title.rendered + '</h3>';
        newBottle += '<p>' + post.acf.month + ' ' + post.acf.day + '</p>';
				newBottle += '<div class="bottle-description">' + post.content.rendered + '</div>';

        newBottle += '</div></div>';

        document.getElementById('saintToday').innerHTML += newBottle;

			});
		}
	});
});
