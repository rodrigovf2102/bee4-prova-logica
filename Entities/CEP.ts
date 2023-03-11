import fetch from 'node-fetch';

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

  constructor(cep : string, logradouro? : string, complemento? : string, bairro? : string, localidade?: string, uf? : string, unidade? : string, ibge? : string, gia? : string){
    if(cep)this.cep = cep;
    if(logradouro)this.logradouro = logradouro;
    if(!logradouro) this.logradouro ="";
    if(complemento)this.complemento = complemento;
    if(!complemento) this.complemento ="";
    if(bairro)this.bairro = bairro;
    if(!bairro) this.bairro ="";
    if(localidade)this.localidade = localidade;
    if(!localidade) this.localidade ="";
    if(uf)this.uf = uf;
    if(!uf) this.uf ="";
    if(unidade)this.unidade = unidade;
    if(!unidade) this.unidade ="";
    if(ibge)this.ibge = ibge
    if(!ibge) this.ibge ="";
    if(gia)this.gia = gia;
    if(!gia) this.gia ="";
  }

  async getCEPInfo(){
    if(!this.verifyCEP()) return this.cepInvalido = "CEP Inválido";
    try {
      const response = await fetch(`https://viacep.com.br/ws/${this.cep}/json/`);
      const data : any = await response.json();
      const viaCepData : viacep = {};
      if(data.cep) viaCepData.cep = data.cep;
      if(data.logradouro) viaCepData.logradouro = data.logradouro;
      if(data.complemento) viaCepData.complemento = data.complemento;
      if(data.bairro) viaCepData.bairro = data.bairro;
      if(data.localidade) viaCepData.localidade =data.localidade;
      if(data.uf) viaCepData.uf = data.uf;
      if(data.ibge) viaCepData.ibge = data.ibge;
      if(data.gia) viaCepData.gia = data.gia;
      if(data.ddd) viaCepData.ddd = data.ddd;
      if(data.siafi) viaCepData.siafi = data.siafi;
      if(data?.erro) viaCepData.erro = data.erro;
      return viaCepData;
    } catch (error) {
      console.log(error);
    }
  }

  static csvToCEPs(csvCEPs : Buffer) : CEP[] {
    const arrayCEPs = csvCEPs.toString().split('\n').map(cep=>cep.split(';'));
    const ceps : CEP[] = [];
    for (const arrayCEP of arrayCEPs) {
      let cep : CEP;
      if(arrayCEP[1]==="") cep = new CEP(arrayCEP[0]);
      if(arrayCEP[1]!=="") cep = new CEP(arrayCEP[0],arrayCEP[1],arrayCEP[2],arrayCEP[3],arrayCEP[4],arrayCEP[5],arrayCEP[6],arrayCEP[7],arrayCEP[8]);
      ceps.push(cep);
    }
    return ceps;
  }

  static arrayToString(ceps : CEP[]) : string {
    console.log(ceps);
    let cepsString : string[] = []
    for (let i=0; i< ceps.length; i++) {
      const stringCep = CEP.cepToString(ceps[i]);
      cepsString.push(stringCep);
    }
    console.log(cepsString)
    return cepsString.join("\n");
  }

  static cepToString(cep : CEP) : string{
    if(!cep.cepInvalido) return `${cep.cep};${cep.logradouro};${cep.complemento};${cep.bairro};${cep.localidade};${cep.uf};${cep.unidade};${cep.ibge};${cep.gia}`;
    return `${cep.cep};${cep.cepInvalido}`
  }

  verifyCEP(){
    this.cep = this.cep.replace(/\D/g,'');
    if(this.cep.length===8) return true;
    return false;
  }

  async setCEPInfo(){
    if(this.cep==="CEP") return;
    const data = await this.getCEPInfo() as viacep;
    if(data?.erro){
      this.cepInvalido = "CEP Inválido";
      return
    }
    if(data.bairro)this.bairro = data.bairro;
    if(data.logradouro)this.logradouro = data.logradouro;
    if(data.complemento)this.complemento = data.complemento;
    if(data.localidade)this.localidade = data.localidade;
    if(data.uf)this.uf = data.uf;
    if(data.ddd)this.unidade = data.ddd;
    if(data.ibge)this.ibge = data.ibge
    if(data.gia)this.gia = data.gia;
  }
}

type viacep = {
  cep? : string,
  logradouro? : string,
  complemento? : string,
  bairro? : string,
  localidade?: string,
  uf?:string,
  ibge?:string,
  gia?:string,
  ddd?:string,
  siafi?:string,
  erro?:boolean
}