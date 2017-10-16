$(document).ready(function() {
    $("#route_list").change(function () {
        route = {route_short_name: $("#route_list").val()};
        $.post("get_vehicle_info.php", route, function (data) {
            vehicles = data;
            var vehicles_json = data;
            // clearMarkers();
            Array.prototype.forEach.call(vehicles_json, function (markerElem) {
                var id = markerElem[0];
                var point = new google.maps.LatLng(
                    parseFloat(markerElem[1]),
                    parseFloat(markerElem[2]));
                var infowincontent = document.createElement('div');
                var strong = document.createElement('strong');
                strong.textContent = id
                infowincontent.appendChild(strong);
                infowincontent.appendChild(document.createElement('br'));

                var start_time = document.createElement('text');
                start_time.textContent = 'Start Time: ' + markerElem[3];
                infowincontent.appendChild(document.createElement('br'));
                var timestamp = document.createElement('text');
                timestamp.textContent = 'Timestamp: ' + markerElem[4];
                infowincontent.appendChild(timestamp);
                var marker = new google.maps.Marker({
                    map: map,
                    position: point
                });
                marker.addListener('click', function() {
                    infoWindow.setContent(infowincontent);
                    infoWindow.open(map, marker);
                });
            });
           // function clearMarkers() {
              //  setMapsOnAll(null);
           // };
        });
    });
});