# Teste prático - Lógica

## Branches

1. Branch "main" utiliza de javascript sem POO para resolução das tarefas ( solução mais simples e menos verbosa );
2. Branch "programWithOOP" utiliza de typescript e POO para resolução das tarefas ( solução mais robusta e mais verbosa );

## Como rodar

1. Caso queira testar a solução com TypeScript e POO, abre o terminal e clone o repositório com o comando: "git clone -b programWithOOP https://github.com/rodrigovf2102/bee4-prova-logica" ;
2. Caso queira testar a solução com JavaScript e sem POO, abra o terminal e clone o repositório com o comando: "git clone https://github.com/rodrigovf2102/bee4-prova-logica.git" ;
3. Em seguida, no terminal, acesse o diretório que o programa esta contido;
4. Instale as dependências, digite no terminal: "npm i";
5. Para executar, no terminal digite: "npm run TAREFA1" para executar a tarefa1, "npm run TAREFA2" para executar tarefa2 e "npm run TAREFA3" para executar tarefa3;


## Docker

Caso tenha problema de incompatibilidade com o node, execute as tarefas por um container docker:
1. Para rodar a TAREFA1 execute o comando "npm run docker:TAREFA1" no terminal;
2. Para rodar a TAREFA2 execute o comando "npm run docker:TAREFA2" no terminal;
3. Para rodar a TAREFA3 execute o comando "npm run docker:TAREFA3" no terminal;
(Comandos do docker no package-json incompatíveis com o SO windows)


## Extra

A função bubbleSort foi adicionada com um "toggle(crescente/decrescente)", caso o arquivo readFile e writeFile sejam os mesmos, cada execução da TAREFA2 vai variar a ordenção de crescente / descrescente continuamente;

## Observação

1. Programa funcional e testado utilizando node: v16.19.0 e no Linux: Ubuntu 22.04.2 LTS
2. A propriedade "Unidade", do CEP, foi considerado como sendo o "ddd" da API "viacep";
