# Gerenciador de Despesas 2.0

Projeto da atividade prática da Aula 09, com estado global, persistência local, formulário validado e melhorias de UX.

## Integrantes

- Nome: Mariana Rinaldi
- Matrícula: 2524290016

## Como executar

```bash
npm install
npx expo start
```

## Funcionalidades concluídas

- Estado global com Context API e `useReducer`.
- Persistência com AsyncStorage na chave `@expenses`.
- Tela única para criar e editar despesas.
- Exclusão com confirmação via `Alert`.
- Formulário com validação manual por campo.
- Categoria selecionada por `Modal`.
- Busca por descrição com debounce.
- Lista com estado vazio e total atualizado conforme o filtro.
- Tema claro e escuro com `useColorScheme`.
- Sombra adaptada por plataforma nos cards.

## Critérios atendidos

- `ADD`, `UPDATE`, `DELETE` e `SET` no reducer.
- `useExpenses()` para acesso ao contexto.
- `TodasDespesas` e `DespesasRecentes` consumindo o estado global.
- Cadastro e edição pela mesma tela.
- Validação de descrição, valor, data e categoria.
- `FlatList` com resumo e estado vazio orientativo.
- Estrutura modular em `src/`.

## Desafio extra

- Filtro por categoria: implementado.
- Limpar tudo: implementado.
- Layout responsivo com duas colunas: implementado.

## Evidências

- Prints da lista nos modos claro e escuro: inserir aqui.
- Print do formulário com validação: inserir aqui.
- Vídeo de demonstração: inserir aqui.
