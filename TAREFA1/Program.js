import fs from 'fs';

async function readMapa(){
  try {
    const data = await fs.promises.readFile('mapa.csv');
    const cities = data.toString().split('\n').map(city=>city.split(';'));
    return cities;
  } catch (error) {
    console.log("Erro ao ler o arquivo");
  }
}

function writeDuplicatedMapa(cities){
  fs.writeFile('mapaDuplicated.csv', cities, (error)=>{ if(error) throw error });
}

function duplicatePopulation(cities){
  for(let i=0; i < cities.length; i++){
    if(i!==0)cities[i][1] = (cities[i][1]*2).toString();
    if(i!==0)cities[i] = cities[i].join('; ');
    if(i===0)cities[i] = cities[i].join(';');
  }
  const duplicatedCities = cities.join('\n');
  return duplicatedCities;
}

async function solver(){
  const cities = await readMapa();
  const duplicatedCities = duplicatePopulation(cities);
  writeDuplicatedMapa(duplicatedCities);
  console.log("Arquivo 'mapaDuplicated.csv' criado com sucesso!");
}

solver();