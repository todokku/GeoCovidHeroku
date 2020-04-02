let mymap;
let localCoords;
let geojson;
let layer;
let countryNameMap;



function triggerLayerClick(coords){
   
   if(coords !== 'undefined' ){
      console.log(geojson);
      const layerToClick = leafletPip.pointInLayer(coords, geojson, true)[0];
      layerToClick.fire('click');
   }
}

function loadMap(){
   mymap = L.map("mapdiv", {
      center: [8, 0],
      zoom:2.2,
      keyboard: true,
      maxBounds: L.latLngBounds(L.latLng(-65, -180 ), L.latLng(90, 195)),
   });
   L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
      minZoom: isMobile ? 1.5: 3,
      maxZoom: 15,
      id: 'mapbox.light'
   }).addTo(mymap);

   mymap.zoomControl.setPosition('bottomright');

   
   function onMapClick(e) {
      
      //getDataCoord(countryName);
      //log("You clicked the map at ("+e.latlng.lat+", "+e.latlng.lng+")");
   }
   
   mymap.on('load', onMapClick);
   xhrRequest('assets/js/countries.geojson', function(xhr) { 
      let collection = JSON.parse(xhr.responseText);
      geojson = L.geoJson(collection, {
         onEachFeature: onEachFeature
      }).addTo(mymap);
      
      
      //let pad = isMobile ? 0 : 450;  
      
      function onEachFeature(feature, layer) {
         layer.options.fillOpacity = 0;
         //layer.options.stroke = false;
         layer.options.width = 0;
         layer.options.color = '#4ea5a2';
         
         layer.on({
            click: function clickFeature(e) {
               getDataCoord(e.target.feature.properties.name);
               if(!isMobile)mymap.fitBounds(layer.getBounds() );
            }
         });
         //console.log("quando clica no mapa: "+ localCoords);
      }
   });
}

function getLocalCoord(){
   
  
   
   function success(position) {
      localCoords = new L.LatLng(position.coords.latitude, position.coords.longitude);
      console.log("quando pega localização "+ localCoords);
      triggerLayerClick(localCoords);
      
      //document.getElementById('chart-content').style.height = (window.innerHeight - 86.88) + 'px';
   };

   function error(err) {
      console.log("erro: " + err);
   };

   navigator.geolocation.getCurrentPosition(success, error);
   
   
   
   
   /*
   navigator.geolocation.getCurrentPosition(position =>{
      localCoords = new L.LatLng(position.coords.latitude, position.coords.longitude);
      
   });
   
   */
}