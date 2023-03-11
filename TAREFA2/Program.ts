import { Mapa } from '../Entities/Mapa.js';
import { FileService } from '../Services/FileService.js';

async function readMapa() {
  const data = await FileService.readCSV("mapa.csv");
  const mapa = Mapa.csvToMapa(data);
  return mapa;
}

function writeReordenedMapa(mapa : Mapa){
  const stringMapa = mapa.toString();
  FileService.writeCSV(stringMapa, "mapaReordened.csv");
}

async function solve(){
  const mapa = await readMapa();
  mapa.sortCities();
  writeReordenedMapa(mapa);
  console.log("Arquivo 'mapaReordened.csv' criado com sucesso!");
}

solve();