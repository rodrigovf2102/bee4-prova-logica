import fs from "fs";
import { FileService } from "../Services/FileService.js";

async function readMapa() {
  try {
    const data = await FileService.readCSV("mapa.csv")
    const cities = FileService.lineBreakSplit(data);
    const mapa = FileService.semiColonSplitArrayCity(cities);
    return mapa;
  } catch (error) {
    console.log("Erro ao ler o arquivo");
  }
}

function writeDuplicatedMapa(mapa) {
  const stringMapa = FileService.semiColonJoinArray(mapa);
  const writeMapa = FileService.lineBreakJoin(stringMapa);
  fs.writeFile("mapaDuplicatedCopie.csv", writeMapa, (error) => {
    if (error) throw error;
  });
}

function duplicatePopulation(mapa) {
  for (const city of mapa) {
    city.doublePopulation();
  }
  return mapa;
}

async function solver() {
  const mapa = await readMapa();
  const duplicatedMapa = duplicatePopulation(mapa);
  writeDuplicatedMapa(duplicatedMapa);
}

solver();