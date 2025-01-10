# Radios Favoritas

Este projeto é uma aplicação responsiva que permite listar radios ao redor do mundo, favoritar suas rádios e ouvi-las

## Tecnologias Utilizadas

- **React** (com TypeScript)
- **React Router**
- **Material UI**
- **HTML5 Audio API**
- **Vite**

## Veja online: 

https://frontend-radio-browser-abfuiukt6-michaelmascarenhas90s-projects.vercel.app/

## Funcionalidades

- **Listagem de Rádios:** Apresenta várias rádios
- **Favoritas/Desfavoritas:** Suas rádios favoritas são listadas na tela principal
- **Reprodução das rádios:** Basta clicar no play para reproduzir a rádio que você quer ouvir
- **Filtragem de Radios:** Filtre a rádio que deseja seja nos favoritos ou na listagem geral. Na listagem geral de radios online
a busca por nome ocorre a cada caracter digitado, busca por pais e idioma somente ao clicar no botão de busca (+)
- **Botão para limpar filtro** Foi inserido um botão que tem a funcionalidade de limpar o filtro
- **Busca dos favoritados** A busca dos favoritos busca somente as rádios que foram atribuidas aos favoritos, para buscar todas as rádios basta no drawer que lista todas as rádios disponíveis. 

---

## Instalação e execução

Siga os passos abaixo para rodar localmente:

### Pré Requisitos

**Node.js**
**NPM**

### Como instalar e rodar o projeto

1. **Clone o repositorio**

`git clone https://github.com/Michaelmascarenhas90/frontend-radio-browser`

2. **Instale as dependencias**

`npm install`

3. **Iniciar a aplicação**


`npm run dev` ou `npm run start`

A aplicação está rodando na porta http://localhost:5173/

## Melhorias futuras

- Aplicação de testes unitários
- Particionar os Components maiores em components menores

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

This is a challenge by Coodesh
