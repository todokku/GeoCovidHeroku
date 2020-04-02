function openCountryList(){
   document.getElementById("country-list").classList.add("show");
}

function closeCountryList(){
   document.getElementById("country-list").classList.remove("show");
}

function triggerCountryClick(countryName){
   let iso2 = countryNameToISO2[countryName];
   let coords = countryCoords[iso2];
   triggerLayerClick(coords);
   
   document.getElementById("searchbar").value = "";
}

function filterFunction(){
   openCountryList();
   let input = document.getElementById("searchbar");
   if(input.value.length == 0){
      closeCountryList();
      return;
   }
   let filter = input.value.toUpperCase();
   let div = document.getElementById("country-list");
   let list = div.getElementsByTagName("a");
   for (let i=0; i<list.length; i++) {
      txtValue = list[i].textContent || list[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
         list[i].style.display = "";
      } else {
         list[i].style.display = "none";
      }
   }
}

function createCountryList(){
   let items = "";
   for(let i=0;i<allCountries.length;i++){
      items += "<a onclick=\"triggerCountryClick(`"+allCountries[i]+"`);closeCountryList();\">";
      items += allCountries[i];
      items += "</a>\n";
   }
   document.getElementById("country-list").innerHTML = items;
}