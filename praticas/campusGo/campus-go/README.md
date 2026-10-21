# CampusGo

Aplicativo mobile com Expo Router, lista de tarefas, bolso, perfil, recursos nativos e mural de avisos consumindo a API do JSONPlaceholder.

## Integrantes

- Nome: Mariana Rinaldi
- Matrícula: 2524290016

## Estrutura principal

- `app/` — rotas por arquivos do Expo Router
- `app/(tabs)/` — abas Início, Tarefas, Bolso e Perfil
- `components/` — componentes reutilizáveis
- `hooks/` — hooks customizados
- `services/` — API, localização, mídia, notificações e utilitários
- `store/` — contexto de despesas

## Configuração inicial

1. Copie o ambiente de exemplo:

```bash
cp .env.example .env
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o projeto:

```bash
npx expo start
```

## Variáveis de ambiente

O projeto usa a variável:

```env
EXPO_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
```

Essa variável fica no arquivo `.env` local e o arquivo `.env.example` é enviado para o repositório.
