import fs from 'fs';

async function readMapa(){
  try {
    const data = await fs.promises.readFile('mapa.csv');
    const cities = data.toString().split('\n');
    return cities;
  } catch (error) {
    console.log("Error ao ler o arquivo");
  }
}

function sortMapa(cities){
  let aux;
  for(let i=1;i<cities.length;i++){
    for(let j=1;j<cities.length;j++){
      if(cities[i]>cities[j]){
        aux = cities[i];
        cities[i] = cities[j];
        cities[j] = aux;
      }
    }
  }
  return cities.join('\n');
}

function writeReordenedMapa(cities){
  fs.writeFile('mapaReordenedCopie.csv', cities, (error)=>{ if(error) throw error });
}

async function solve(){
  const cities = await readMapa();
  const reordenedCities = sortMapa(cities);
  writeReordenedMapa(reordenedCities);
}

solve();