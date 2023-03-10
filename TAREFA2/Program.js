import fs from 'fs';

async function readMapa(){
  try {
    const data = await fs.promises.readFile('mapa.csv');
    const cities = data.toString().split('\n').map(city=>city.split(';'));
    return cities;
  } catch (error) {
    console.log("Error ao ler o arquivo");
  }
}
