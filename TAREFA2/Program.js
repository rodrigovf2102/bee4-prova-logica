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
  for(let i=1;i<cities.length;i++){
    for(let j=1;j<cities.length;j++){
      if(cities[j]<cities[j+1]){
        const aux = cities[j];
        cities[j] = cities[j+1];
        cities[j+1] = aux;
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