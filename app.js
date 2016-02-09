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
  						url: 'http://api.openweathermap.org/data/2.5/weather?q=' + currentCity + '&appid=759c6daadfde1d47adfa9da725450e1f',
  						method: "GET",
  						success: function(data) {
  							$('#spinner').hide();
  							$('#all').show();
							var cel = toCelDeg(data.main.temp);
  							$('#weather').text('The weather is: ' + data.weather[0].main);
  							$('#temp').text('Temperature(C): ' + cel);
  							$('#fer').on('click', function(){
								var fer = toFerDeg(cel);
								$('#temp').text('Temperature(F): ' + fer);
							});
							$('#cel').on('click', function(){
								$('#temp').text('Temperature(C): ' + cel);
							});
							$('#kel').on('click', function(){
								$('#temp').text('Temperature(K): ' + data.main.temp);
							});
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
				var cel = toCelDeg(data.main.temp);
				$('#temp').text('Temperature(C): ' + cel);
				$('#weather').text('The weather is: ' + data.weather[0].main);
    			$('#longitude').text('Longitude: ' + data.coord.lon);
    			$('#latitude').text('Latitude: ' + data.coord.lat);
    			$('#fer').on('click', function(){
					var fer = toFerDeg(cel);
					$('#temp').text('Temperature(F): ' + fer);
				});
				$('#cel').on('click', function(){
					$('#temp').text('Temperature(C): ' + cel);
				});
				$('#kel').on('click', function(){
					$('#temp').text('Temperature(K): ' + data.main.temp);
				});
			}
		});
	});
	function toFerDeg (num) {
		var fer = (((9/5) * num) + 32);
		fer = Math.round(fer * 100) / 100;
		return fer;
	}

	function toCelDeg (num) {
		var cel = (num - 273.15);
		cel = Math.round(cel * 100) / 100;
		return cel;
	}
});





