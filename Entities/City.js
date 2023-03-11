export class City{
  constructor(cityName, population){
    this.cityName = cityName;
    this.population = population;
  }

  doublePopulation(){
    if(!isNaN(this.population)) this.population = this.population*2;
  }

  toString(){
    if(isNaN(this.population)) return `${this.cityName};${this.population}`;
    if(!isNaN(this.population)) return `${this.cityName}; ${this.population}`;
  }
}