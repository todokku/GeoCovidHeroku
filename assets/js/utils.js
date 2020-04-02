let text;
let isMobile = screen.width < 620 ? true : false;
let w; 
let logo_pos;

function log(str){ console.log(str); }
function setCursor(style){ document.body.style.cursor = style; }
function capitalizeFirstLetter(str){
   return str.charAt(0).toUpperCase() + str.slice(1);
}
function formatNumber(num) {
   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

let isChartOpen = false;
let date = new Date();

function load(){
   let searchbar = document.getElementById("searchbar");
   searchbar.addEventListener("keyup", function(event) {
      const KEYCODE_ENTER = 13;
      if(event.keyCode === KEYCODE_ENTER && searchbar.value !== "")
         search(searchbar.value);
   });
}

function btnVelhoWhats (){this.setAttribute("src","assets/img/whatsapp.png");}
function btnNovoWhats (){this.setAttribute("src","assets/img/whatsapp-hover.png");}

function btnVelhoTwitter (){this.setAttribute("src","assets/img/twitter.png");}
function btnNovoTwitter (){this.setAttribute("src","assets/img/twitter-hover.png");}

function btnVelhoFacebook (){this.setAttribute("src","assets/img/facebook.png");}
function btnNovoFacebook (){this.setAttribute("src","assets/img/facebook-hover.png");}

function btnVelhoClip (){this.setAttribute("src","assets/img/clipboard.png");}
function btnNovoClip (){this.setAttribute("src","assets/img/clipboard-hover.png");}


function clipCopy(){
   
  let copyText = document.getElementById("myInput");
  
   document.getElementById('myInput').style.visibility = "visible";
   document.getElementById('myInput').value = decodeURIComponent(text);
   copyText.select();
   copyText.setSelectionRange(0, 99999);
   document.execCommand("copy");
   document.getElementById('myInput').style.visibility = "hidden";
   
  
  let tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copied!";
}

function outFunc() {
  let tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy";
}



function createURL(country, cases, deaths, recovered){
    
   text =  'Casos%20COVID19('+date.toLocaleDateString()+ ')%0APaís:%20'+country+
      '%0AInfectados:%20'+ formatNumber(cases.toString()) + 
      '%0AMortes:%20'+ formatNumber(deaths.toString()) +
      '%0ARecuperados:%20'+ formatNumber(recovered.toString());
   
   document.getElementById('whats-share').href = 'https://wa.me/?text='+ '*Casos%20COVID19('+date.toLocaleDateString()+ ')*%0APaís:%20'+`*${country}*`+'%0AInfectados:%20'+ formatNumber(cases.toString()) + '%0AMortes:%20'+ formatNumber(deaths.toString())+'%0ARecuperados:%20'+ formatNumber(recovered.toString())+'%0A%0AAcesse%20já%20para%20ter%20acesso%20aos%20dados%20do%20Covid-19:%0Ahttp://ti.marloo.pt';
   
   document.getElementById('twitter-share').href = 'https://twitter.com/intent/tweet?text=' +
      text+'%0A%0AAcesse%20já%20para%20ter%20acesso%20aos%20dados%20do%20Covid-19:%0Ahttp://ti.marloo.pt';
   
   document.getElementById('facebook-share').href = 'https://www.facebook.com/sharer.php?u=https://ti.marloo.pt&quote=' + text;
   
}

function search(param){
   log("Buscou '"+param+"'");
}

function toggleChart(){
   
   document.getElementById("chart").style.width = "0px";
   
   if(isMobile && screen.width !=0){
      
      const w = isChartOpen ? 0 : 100;
      
      document.getElementById("chart").style.width = w+"%";
      isChartOpen = !isChartOpen;
   }
      
      
   else{
      
      if(isChartOpen){
         w = 0;
         mymap.setMaxBounds(L.latLngBounds(L.latLng(-65, -180 ), L.latLng(90, 195)));
         
      }else{
         w = 450;
         mymap.setMaxBounds(L.latLngBounds(L.latLng(-65,-260),L.latLng(90,195)));
      }
      
      logo_pos = 35 + w;
      document.getElementById("chart").style.width = w+"px";
      document.getElementById("hovering-logo").style.left = logo_pos+"px";
      isChartOpen = !isChartOpen;
   }
}

function openChart(){
   !isChartOpen ? toggleChart() : null;
}

function closeChart(){
   isChartOpen ? null : toggleChart();

   

}

function xhrRequest(url, callback) {
   let xhr;
   if(typeof XMLHttpRequest !== 'undefined')
      xhr = new XMLHttpRequest();
   else {
      const v = ["MSXML2.XmlHttp.5.0", 
                 "MSXML2.XmlHttp.4.0",
                 "MSXML2.XmlHttp.3.0", 
                 "MSXML2.XmlHttp.2.0",
                 "Microsoft.XmlHttp"]
      for(let i=0;i<v.length;i++) {
         try {
            xhr = new ActiveXObject(v[i]);
            break;
         }
         catch(e){}
      }
   }
   xhr.onreadystatechange = ensureReadiness;
   function ensureReadiness() {
      if(xhr.readyState < 4) return;
      if(xhr.status !== 200) return;
      if(xhr.readyState === 4)
         callback(xhr);
   }
   xhr.open('GET', url, true);
   xhr.send('');
}