export class City {
  cityName : string;
  population : string | number;

  constructor(cityName : string, population : string | number){
    this.cityName = cityName;
    this.population = population;
  }

  doublePopulation(){
    const isNumber = typeof(this.population) === 'number';
    if(isNumber) this.population = +this.population*2;
  }

  toString() : string{
    const isNumber = typeof(this.population) === 'number';
    if(!isNumber) return `${this.cityName};${this.population}`;
    if(isNumber) return `${this.cityName}; ${this.population}`;
  }

  toArray(cityString : string) : string[] {
    return cityString.split(";");
  }
}