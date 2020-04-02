let dataCOVID = null


async function getDataCovidRequest(){     
   if(dataCOVID == null){
      const api_url_covid = 'https://sleepy-brook-60139.herokuapp.com/data';
      const response = await fetch(api_url_covid);
      dataCOVID = await response.json();
      
   }
}


function getDataCovid(countryISO2){
   
   /*
   function createDataCOVID(rawData){
      dataCOVID = {}
      for (let i=0; i<rawData.length; i++){
         dataCOVID[rawData[i].countryInfo.iso2] = rawData[i];
      }
   }*/

   
      
      if(!dataCOVID[countryISO2]){
         dataCOVID[countryISO2] = {}
         dataCOVID[countryISO2].cases = "n/a"
         dataCOVID[countryISO2].deaths = "n/a"
         dataCOVID[countryISO2].recovered = "n/a"
      }
         
      if(!isChartOpen) toggleChart();
      
      document.getElementById('cases-value').textContent = formatNumber(dataCOVID[countryISO2].cases); 
      document.getElementById('deaths-value').textContent = formatNumber(dataCOVID[countryISO2].deaths);
      document.getElementById('recovered-value').textContent = formatNumber(dataCOVID[countryISO2].recovered);
      
      createURL(document.getElementById('country').textContent,dataCOVID[countryISO2].cases, dataCOVID[countryISO2].deaths, dataCOVID[countryISO2].recovered); 
      

   }


function getDataCoord(countryName){
   document.getElementById('chart-picture').src = 'assets/countries-flags/'+countryNameToISO2[countryName].toLowerCase()+'.png';
   document.getElementById('country').textContent = countryName;
   getDataCovid(countryNameToISO2[countryName]);

}
