# Typescript, Express and Mysql Application

### Documento de Requisitos

[Espeficicação de Requisitos e Avaliação Bimestral](https://docs.google.com/document/d/1yvZnEVfoK7_QiZc_B0FME_ZE8zQEMO95XcRXBQgdEiE/edit?usp=sharing)

### Passo 1: Inicializando o Projeto com TypeScript

1.	Inicialize o projeto:
```bash
mkdir mysql-api-ads
cd mysql-api-ads
npm init -y
```

2.	Instale as dependências:
```bash
npm install express ejs mysql2
```

3.	Instale o TypeScript e as definições de tipo para Express:
```bash
npm install typescript ts-node @types/node @types/express @types/mysql --save-dev
```

4.	Crie o arquivo de configuração do TypeScript:
```bash
npx tsc --init
```

5.	Subistitua o conteúdo do arquivo `tsconfig.json` gerado pelo comando anterior pelo conteúdo a seguir:
```json
{
  "compilerOptions": {
    "target": "ES2023",
    "module": "commonjs",
    "strict": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Passo 2: Criando a Estrutura de Pastas

1.	Crie a pasta `src`, `src/views` e dentro da pasta `src` o arquivo `index.ts`:
```bash
mkdir src
mkdir src/views
touch src/index.ts
```

### Passo 3: Codificando

1. Codifique o arquivo `src/index.ts` seguindo o código do [repositório original](https://github.com/rafael-labegalini/mysql-api-adsb/blob/main/src/index.ts). Caso o arquivo não exista no seu projeto crie-o.

2. Crie os arquivos de templates dentro do diretório `src/views` seguindo a mesma estrutura do [repositório original](https://github.com/rafael-labegalini/mysql-api-adsb/tree/main/src/views)

### Passo 4: Rodando a Aplicação
1.	Criar o script de inicialização da aplicação no `package.json`:
```json
"scripts": {
    "start": "ts-node --transpile-only src/index.ts"
},
```

2. Criar o arquivo `docker-compose.yaml` na raiz do projeto seguindo o modelo disponibilizado no [repositório original](https://github.com/rafael-labegalini/mysql-api-adsb/blob/main/docker-compose.yaml)

Para executar a aplicação agora use os seguintes comandos:
```bash
docker compose up -d
npm start
```
> PS: Certifique-se de que seu docker esteja rodando 
