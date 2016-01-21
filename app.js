$(document).ready(function(){
	$.ajax({
		url: 'https://api.ipify.org/?format=json',
		method: "GET",
		success: function(data) {
			var ip = data.ip;
			$.ajax({
  				url: 'http://freegeoip.net/json/' + ip,
  				method: "GET",
  				success: function(info) {
    				$('#ipAddress').text('IP: ' + info.ip);
    				$('#longitude').text('Longitude: ' + info.longitude);
    				$('#latitude').text('Latitude: ' + info.latitude);
    				var currentCity = info.city;
    				$.ajax({
  						url: 'http://api.openweathermap.org/data/2.5/weather?q=' + currentCity + '&appid=2de143494c0b295cca9337e1e96b00e0',
  						method: "GET",
  						success: function(data) {
  							$('#weather').text(data.weather[0].main);
  						}
  					});

				}
  			});
  		}
	});

	$('#submit').on('click', function(){
		var city = $('#city').val();
		console.log(city);

		$.ajax({
			url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=2de143494c0b295cca9337e1e96b00e0',
			method: "GET",
			success: function(data) {
				console.log(data);
				$('#weather').text(data.weather[0].main);
    			$('#longitude').text('Longitude: ' + data.coord.lon);
    			$('#latitude').text('Latitude: ' + data.coord.lat);
			}
		});
	});
});