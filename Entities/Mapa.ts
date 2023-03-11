import { City } from "./City.js";

export class Mapa {
  cities : City[]

  constructor(mapaArray : City[]){
    this.cities = mapaArray;
  }

  toString() : string {
    const stringMapa : string[] = [];
    for (const city of this.cities) {
      stringMapa.push(city.toString());
    }
    return stringMapa.join("\n");
  }

  static csvToMapa(mapaCSV : Buffer){
    const stringCities = mapaCSV.toString().split("\n");
    const cities : City[] =[];
    for (const stringCity of stringCities) {
      const cityParts = stringCity.split(";");
      const newCity = new City(cityParts[0],cityParts[1])
      cities.push(newCity);
    }
    return new Mapa(cities);
  }

}