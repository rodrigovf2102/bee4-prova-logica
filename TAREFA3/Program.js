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
  fs.writeFile('CEPsWithInfo.csv', ceps, (error)=>{ if(error) throw error });
}

async function insertCEPsInfo(ceps){
  ceps[0] = ceps[0].join(';');
  for(let i=1; i < ceps.length; i++){
    const validCep = verifyCEP(ceps[i][0]);
    if(validCep) {
      const data = await getCEPInfo(validCep);
      ceps[i] = [ceps[i][0],data.logradouro, data.complemento, data.bairro, data.localidade, data.uf, data.ddd, data.ibge, data.gia]
      ceps[i] = ceps[i].join(';');
    }
    if(!validCep){
      ceps[i] = [ceps[i][0],"CEP Inválido"];
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
    console.log("Erro ao reber informações da api VIACEP.");
  }
}

function verifyCEP(cep){
  cep = cep.replace(/\D/g,'');
  if(cep.length===8) return cep;
  return false;
}

async function solver(){
  const ceps = await readCEPs();
  const cepsWithInfo = await insertCEPsInfo(ceps);
  writeCEPs(cepsWithInfo);
  console.log("Arquivo 'CEPsWithInfo.csv' criado com sucesso!");
}

solver();