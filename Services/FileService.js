import fs from 'fs';
import { City } from '../Entities/City.js';

export class FileService {
  static async readCSV(file){
    const data = await fs.promises.readFile(file);
    return data;
  }

  static lineBreakSplit(data){
    return data.toString().split("\n");
  }

  static semiColonSplitArrayCity(data){
    const mapa = [];
    for (const element of data) {
      const elementParts = element.split(";");
      const newElement = new City(elementParts[0], elementParts[1]);
      mapa.push(newElement);
    }
    return mapa;
  }

  static lineBreakJoin(data){
    return data.join("\n");
  }

  static semiColonJoinArray(data){
    const stringMapa = [];
    for (const element of data) {
      stringMapa.push(element.toString());
    }
    return stringMapa;
  }
}