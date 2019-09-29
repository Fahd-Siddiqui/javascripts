function calculate() {
  // Honeypot for bots
  if (
    document.getElementById("k5fhx").value != "54ncq" ||
    document.getElementById("xzdar").value != "y635r" ||
    document.getElementById("746j1").value != "usdg9" ||
    document.getElementById("fsfj2").value != "4gw7n" ||
    document.getElementById("gg6c0").value != "2ok7t"
  ) {
    // console.log("bot detected");
    document.getElementById("EFAPI").innerHTML = "Suspecious activity detected!"
    return 1;
  }


  // Collect location data
  var lat = parseFloat(document.getElementById("lat").value);
  var long = parseFloat(document.getElementById("long").value);
  var tvd = parseFloat(document.getElementById("tvd").value);

  // TODO: Implement input range validation i.e tvd>0 lat long in range etc
  if (isNaN(lat) || !isFinite(lat)) {
    document.getElementById("EFAPI").innerHTML = "Invalid Lattitude"
    return 1;
  }
  if (isNaN(long) || !isFinite(long)) {
    document.getElementById("EFAPI").innerHTML = "Invalid Longitude"
    return 1;
  }
  if (isNaN(tvd) || !isFinite(tvd)) {
    document.getElementById("EFAPI").innerHTML = "Invalid TVD"
    return 1;
  }

  // Send the POST request to server
  jQuery.ajax({
    type: 'POST',
    url: 'https://ohr93mkelj.execute-api.us-east-1.amazonaws.com/prod/eaglefordfluidpredict',
    data: ' "data": { { "lat" : "' + lat + '", "long" : "' + long + '", "tvd" : "' + tvd + '"}}',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(result) {
      document.getElementById("EFAPI").innerHTML = result.EFAPI

      var eft = result.EFFT[0]
      // document.getElementById("EFFT").innerHTML = eft
      plot_data[0]['y'] = eft;
      var plot_update = {
        y: [eft]
      };
      //console.log();
      Plotly.animate(plotly_plot, plot_update, {
        transition: {
          duration: 500,
          easing: 'cubic-in-out'
        }
      }) //animate
      
     // Set up marker on map
     marker.setLatLng([lat,long]).openPopup();
    //.bindPopup('Bottom hole well location.')
    //.openPopup();
      
    } // success
  }); // jquery.ajax
} // calculate
