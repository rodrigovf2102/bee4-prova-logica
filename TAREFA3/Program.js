import fs from 'fs';
import fetch from 'node-fetch';

async function readCEPs(){
  try {
    const data = await fs.promises.readFile('CEPs.csv');
    const ceps = data.toString().split('\n').map(cep=>cep.split(';'));
    return ceps;
  } catch (error) {
    console.log("Erro ao ler o arquivo");
  }
}

function writeCEPs(ceps){
  fs.writeFile('CEPsWithInfoCopie.csv', ceps, (error)=>{ if(error) throw error });
}

async function insertCEPInfo(ceps){
  for(let i=1; i < ceps.length; i++){
    const validCep = verifyCEP(ceps[i][0]);
    if(validCep) {
      const data = await getCEPInfo(validCep);
      ceps[i][1] = data.logradouro;
      ceps[i][2] = data.complemento;
      ceps[i][3] = data.bairro;
      ceps[i][4] = data.localidade;
      ceps[i][5] = data.uf;
      ceps[i][6] = data.ddd;
      ceps[i][7] = data.ibge;
      ceps[i][8] = data.gia;
      ceps[i] = ceps[i].join(';');
    }
    if(!validCep){
      ceps[i][1] = "CEP Inválido";
      ceps[i] = ceps[i].join(';');
    }
  }
  return ceps.join('\n');
}

async function getCEPInfo(cep){
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function verifyCEP(cep){
  cep = cep.replace(/\D/g,'');
  if(cep.length===8) return cep;
  return false;
}

async function solver(){
  const ceps = await readCEPs();
  const cepsWithInfo = await insertCEPInfo(ceps);
  writeCEPs(cepsWithInfo);
}

solver();