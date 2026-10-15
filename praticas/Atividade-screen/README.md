# Atividade de Screen Navigation - Expense Tracker

Aplicativo React Native com navegação em abas e stack, desenvolvido como atividade prática para gestão de despesas.

## Objetivo

Construir a estrutura de navegação de um aplicativo de controle de despesas utilizando React Navigation, combinando:

- Bottom Tabs
- Native Stack
- Componente reutilizável de botão com ícone

## Estrutura do projeto

```bash
Atividade-screen/
├── App.js
├── README.md
├── app.json
├── assets/
├── components/
│   └── IconButton.js
├── screens/
│   ├── DespesasRecentes.js
│   ├── TodasDespesas.js
│   └── GerenciarDespesa.js
├── index.js
├── package.json
└── package-lock.json
```

## Tecnologias utilizadas

- React Native
- Expo
- React Navigation
- @expo/vector-icons

## Dependências instaladas

```bash
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context @expo/vector-icons
```

## Como executar

1. Abra o terminal na pasta do projeto:

```bash
cd praticas/Atividade-screen
```

2. Inicie o projeto Expo:

```bash
npx expo start
```

3. Escolha uma das opções:

- abrir no emulador
- usar o Expo Go no celular
- rodar em web com suporte do Expo

## Funcionalidades implementadas

- Aba de despesas recentes
- Aba com todas as despesas
- Tela de gerenciamento de despesa
- Ícone no cabeçalho para navegar até a tela de gestão
- Feedback visual no botão ao pressionar

## Navegação

A aplicação possui:

- Stack principal com a tela `Despesas`
- Bottom Tabs dentro da tela principal
- Navegação para `GerenciarDespesa` pelo botão do cabeçalho

## Autor

Atividade prática do 4º bimestre.
