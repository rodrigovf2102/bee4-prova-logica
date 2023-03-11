import { CEP } from '../Entities/CEP.js';
import { FileService } from "../Services/FileService.js";

async function readCEPs(){
    const data = await FileService.readCSV("CEPs.csv");
    const ceps = CEP.csvToCEPs(data);
    return ceps;
}

function writeCEPs(ceps : CEP[]){
  let cepsString = CEP.arrayToString(ceps);
  FileService.writeCSV(cepsString,"CEPsWithInfo.csv")
}

async function solver(){
  const ceps = await readCEPs();
  for(let i =0 ; i < ceps.length ; i++){
    await ceps[i].setCEPInfo();
  }
  writeCEPs(ceps);
  console.log("Arquivo 'CEPsWithInfo.csv' criado com sucesso!");
}

solver();