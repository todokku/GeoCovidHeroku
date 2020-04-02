function init(){
   
   loadMap();
  
   getLocalCoord();
   document.getElementById('chart-content').style.height = (window.innerHeight - 86.88) + 'px';
   getDataCovidRequest();
   createCountryList();
   
  
   
}