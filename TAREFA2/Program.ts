import { Mapa } from '../Entities/Mapa.js';
import { FileService } from '../Services/FileService.js';

async function readMapa() {
  const data = await FileService.readCSV("mapaReordenedCopie.csv");
  const mapa = Mapa.csvToMapa(data);
  return mapa;
}

function writeReordenedMapa(mapa : Mapa){
  const stringMapa = mapa.toString();
  FileService.writeCSV(stringMapa, "mapaReordenedCopie.csv");
}

async function solve(){
  const mapa = await readMapa();
  mapa.sortCities();
  writeReordenedMapa(mapa);
}

solve();