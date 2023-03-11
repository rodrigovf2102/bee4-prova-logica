export class CEP {
  cep : string;
  logradouro? : string;
  complemento? : string;
  bairro? : string;
  localidade? : string;
  uf? : string;
  unidade? : string;
  ibge? : string;
  gia? : string;
  cepInvalido? : string;

  constructor(cep : string){
    this.cep = cep;
  }

  async getCEPInfo(){
    if(!this.verifyCEP) return this.cepInvalido = "CEP Inválido";
    try {
      const response = await fetch(`https://viacep.com.br/ws/${this.cep}/json/`);
      const data : viacep = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static arrayToCEP(){
    
  }

  verifyCEP(){
    this.cep = this.cep.replace(/\D/g,'');
    if(this.cep.length===8) return true;
    return false;
  }

  async setCEPInfo(){
    const data = await this.getCEPInfo() as viacep;
    if(data.erro) return this.cepInvalido = "CEP Inválido"
    this.bairro = data.bairro;
    this.logradouro = data.logradouro;
    this.complemento = data.complemento;
    this.localidade = data.localidade;
    this.uf = data.uf;
    this.unidade = data.ddd;
    this.ibge = data.ibge
    this.gia = data.gia;
  }
}

type viacep = {
  cep : string,
  logradouro : string,
  complemento : string,
  bairro : string,
  localidade: string,
  uf:string,
  ibge:string,
  gia:string,
  ddd:string,
  siafi:string,
  erro?:boolean
}