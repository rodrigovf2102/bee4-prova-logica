import { Mapa } from "../Entities/Mapa.js";
import { FileService } from "../Services/FileService.js";

async function readMapa() {
  try {
    const data = await FileService.readCSV("mapa.csv");
    const mapa = Mapa.csvToMapa(data);
    return mapa;
  } catch (error) {
    console.log("Erro ao ler o arquivo");
  }
}

function writeDuplicatedMapa(mapa : Mapa) {
  const stringMapa = mapa.toString();
  FileService.writeCSV(stringMapa, "mapaDuplicatedCopie.csv");
}

function duplicatePopulation(mapa : Mapa) {
  mapa.cities.forEach(city => {
    city.doublePopulation();
  })
  return mapa;
}

async function solver() : Promise<void> {
  const mapa = await readMapa();
  const duplicatedMapa = duplicatePopulation(mapa);
  writeDuplicatedMapa(duplicatedMapa);
}

solver();