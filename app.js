// in sublime
var port = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const app = express();
const covid = require('novelcovid');
const cors = require('cors');
const fs = require('fs');

// Now we create a async/await

let getData =  async (value) => {
    let all;
    
            try{    
                all = await covid.getCountry();
                createDataCOVID(all);
                fs.writeFileSync('./db/data.json', JSON.stringify(dataCOVID));
                console.log("refresh");
            }
            catch (e){
                console.log("Deu merda vez: " + e );
            }
};

function createDataCOVID(rawData){
    dataCOVID = {}
    let iso2;
    for (let i=0; i<rawData.length; i++){
       iso2 = rawData[i].countryInfo.iso2;
       ["country","countryInfo", "todayCases", "todayDeaths", "active","casesPerOneMillion","deathsPerOneMillion" , "updated"].forEach(el => {delete  rawData[i][el];} )
       dataCOVID[iso2] =  rawData[i];
    }
 }setInterval(function(){ getData(); }, 1000000);

app.use(cors());
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function(req, res){
    res.sendFile('index.html', {root: path.join(__dirname)});
    console.log("ta no main");
});

app.get('/data', function(req, res){
    res.json(JSON.parse(fs.readFileSync('./db/data.json', 'utf8')));
});



app.listen(port, function () {
 getData()
 console.log('servidor rodando na url http://localhost:8080');

});