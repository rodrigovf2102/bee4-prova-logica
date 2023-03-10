import fs from 'fs';

let cities;

readCsv('mapa.csv');

function readCsv(fileName){
  fs.readFile(fileName, readMapa);
}

function writeCsv(cities){
  fs.writeFile('mapaCopie.csv', cities, (error)=>{ if(error) throw error });
}

function readMapa(error, data){
  if(error) throw error;
  cities = data.toString().split('\n');
  cities = cities.map(city => city.split(';'));
  duplicatePopulation(cities);
}

function duplicatePopulation(cities){
  for(let i=0; i < cities.length; i++){
    if(i!==0)cities[i][1] = (cities[i][1]*2).toString();
    cities[i] = cities[i].join('; ');
  }
  cities = cities.join('\n');
  writeCsv(cities);
}