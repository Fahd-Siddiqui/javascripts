function calculate(){if(document.getElementById("k5fhx").value!="54ncq"||document.getElementById("xzdar").value!="y635r"||document.getElementById("746j1").value!="usdg9"||document.getElementById("fsfj2").value!="4gw7n"||document.getElementById("gg6c0").value!="2ok7t"){document.getElementById("EFAPI").innerHTML="Suspecious activity detected!";return 1}var t=parseFloat(document.getElementById("lat").value);var e=parseFloat(document.getElementById("long").value);var n=parseFloat(document.getElementById("tvd").value);if(isNaN(t)||!isFinite(t)){document.getElementById("EFAPI").innerHTML="Invalid Lattitude";return 1}if(isNaN(e)||!isFinite(e)){document.getElementById("EFAPI").innerHTML="Invalid Longitude";return 1}if(isNaN(n)||!isFinite(n)){document.getElementById("EFAPI").innerHTML="Invalid TVD";return 1}jQuery.ajax({type:"POST",url:"http://ws.fahdsiddiqui.com:54662/eaglefordfluidpredict",data:'{ "lat" : "'+t+'", "long" : "'+e+'", "tvd" : "'+n+'"}',contentType:"application/json; charset=utf-8",i:"json",success:function(t){document.getElementById("EFAPI").innerHTML=t.EFAPI}})}
