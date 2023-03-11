export class City {
  cityName : string;
  population : any;

  constructor(cityName : string, population : any){
    this.cityName = cityName;
    this.population = population;
  }

  doublePopulation(){
    if(!isNaN(this.population)) this.population = this.population*2;
  }

  toString() : string{
    if(isNaN(this.population)) return `${this.cityName};${this.population}`;
    if(!isNaN(this.population)) return `${this.cityName}; ${this.population}`;
  }

  toArray(cityString : string) : string[] {
    return cityString.split(";");
  }
}