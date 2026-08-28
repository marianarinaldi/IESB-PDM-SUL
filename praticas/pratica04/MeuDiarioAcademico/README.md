# MeuDiarioAcademico

Aplicativo desenvolvido com Expo e React Native para registrar disciplinas do semestre em uma interface simples, funcional e organizada.

## 🎯 Objetivo

Consolidar os fundamentos de UI em React Native, incluindo:

- criação do projeto Expo
- uso de componentes nativos
- import/export de constantes
- uso de `StyleSheet.create`
- organização com Flexbox
- estrutura do código em arquivos separados

## 📱 Descrição do app

A tela inicial permite cadastrar rapidamente as disciplinas do semestre, com:

- cabeçalho com o nome do aplicativo
- campo de texto para inserir a disciplina
- botão para adicionar a disciplina
- lista com as matérias cadastradas
- switch opcional para demonstrar o desafio extra

## 🛠️ Comando para criar o projeto

```bash
npx create-expo-app@latest MeuDiarioAcademico --template blank
```

## ▶️ Como executar

```bash
cd MeuDiarioAcademico
npx expo start
```

Em seguida, abra o projeto no emulador Android ou no Expo Go.

## 📦 Dependências utilizadas

```bash
npx expo install react-native-safe-area-context
```

## ✅ Funcionalidades implementadas

- `SafeAreaView` para manter a área segura da tela
- `TextInput` para cadastro da disciplina
- botão de adição com visual em `Pressable`
- lista de disciplinas organizadas visualmente
- uso de `flex` e largura percentual (`%`)
- arquivo `labels.js` com textos reutilizáveis
- estilos centralizados em `StyleSheet.create`
- `Switch` opcional para simular filtro visual

## 📁 Estrutura do projeto

```txt
MeuDiarioAcademico/
├─ App.js
├─ labels.js
├─ app.json
├─ index.js
├─ package.json
├─ assets/
├─ .gitignore
├─ README.md
└─ node_modules/
```

## 🖼️ Prints da tela

![Tela inicial do app](./assets/print1.png)

## 🧠 Observações de layout

A interface foi organizada com `flexDirection: 'row'`, `justifyContent` e `alignItems` para manter o formulário alinhado e visualmente equilibrado. Esse uso de Flexbox permite que o campo de entrada e o botão fiquem em uma linha harmoniosa, enquanto a lista abaixo permanece organizada e legível.

## 📌 Entrega

- Projeto desenvolvido em Expo
- README com instruções e prints
- estrutura de código organizada
- requisitos da atividade atendidos

> O diretório `node_modules` não deve ser enviado no repositório final.
