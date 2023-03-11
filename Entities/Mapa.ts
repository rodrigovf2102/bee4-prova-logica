import { City } from "./City.js";

export class Mapa {
  cities: City[];

  constructor(mapaArray: City[]) {
    this.cities = mapaArray;
  }

  toString(): string {
    const stringMapa: string[] = [];
    for (const city of this.cities) {
      stringMapa.push(city.toString());
    }
    return stringMapa.join("\n");
  }

  static csvToMapa(mapaCSV: Buffer) {
    const stringCities = mapaCSV.toString().split("\n");
    const cities: City[] = [];
    for (const stringCity of stringCities) {
      const cityParts = stringCity.split(";");
      const newCity = new City(cityParts[0], cityParts[1]);
      cities.push(newCity);
    }
    return new Mapa(cities);
  }

  sortCities() {
    let order: boolean;
    let toggle: boolean;
    if (this.cities[0] > this.cities[1]) toggle = false;
    if (this.cities[0] < this.cities[1]) toggle = true;
    for (let i = 1; i < this.cities.length; i++) {
      for (let j = 1; j < this.cities.length; j++) {
        if (toggle) order = this.cities[j] > this.cities[j + 1];
        if (!toggle) order = this.cities[j] < this.cities[j + 1];
        if (order) {
          const aux = this.cities[j];
          this.cities[j] = this.cities[j + 1];
          this.cities[j + 1] = aux;
        }
      }
    }
  }
}
