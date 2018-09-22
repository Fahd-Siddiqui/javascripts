function setup_plot() {
  plotly_plot = document.getElementById('plotly_plot');

  var plot_data = [{
    x: ["Oil", "Light Oil", "Wet Gas", "Dry Gas"],
    y: [0, 0, 0, 0],
    marker: {
      color: '#dbdbdb'
    },
    type: 'bar',
    width: .2
  }];

  var plot_layout = {
    xaxis: {
      zeroline: true,
      linecolor: '#dbdbdb',
      linewidth: 2,
      showline: true,
      tickfont: {
        color: '#dbdbdb'
      }
    },
    yaxis: {
      range: [0, 100],
      showgrid: false,
      zeroline: false,
      showline: false,
      showticklabels: false,
    },
    width: 300,
    height: 300,
    paper_bgcolor: '#1b1b1b',
    plot_bgcolor: '#1b1b1b',
    margin: {
      r: 5,
      t: 50,
      b: 25,
      l: 5
    },
  }

  Plotly.newPlot(plotly_plot, plot_data, plot_layout);
} // setup_plot




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
    url: 'http://ws.fahdsiddiqui.com:54662/eaglefordfluidpredict',
    data: '{ "lat" : "' + lat + '", "long" : "' + long + '", "tvd" : "' + tvd + '"}',
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
      })
    } // success
  }); // jquery.ajax
} // calculate
