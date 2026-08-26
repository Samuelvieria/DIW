# Ecommerce Store — front-end consumindo API REST

Vitrine de e-commerce em **JavaScript puro**, sem framework e sem build.
Construída para a disciplina de Desenvolvimento de Interfaces Web (PUC Minas).

Consome a [Platzi Fake Store API](https://fakeapi.platzi.com/) e monta a
listagem de produtos dinamicamente a partir da resposta JSON.

## O que faz

- **Listagem paginada sob demanda** — busca 5 produtos por requisição e
  acrescenta à vitrine, mantendo o `offset` em memória entre as chamadas
- **Carrinho** — adiciona itens e incrementa a quantidade quando o produto já
  está na lista, em vez de duplicar a entrada
- **Truncamento de título** — corta em 18 caracteres com reticências, para que
  nome longo de produto não quebre o alinhamento do card
- **Layout responsivo** em CSS puro

## Stack

| Camada | Tecnologia |
|---|---|
| Estrutura | HTML5 |
| Estilo | CSS3 |
| Lógica | JavaScript ES6+ — `fetch` com `async/await` |
| Dados | Platzi Fake Store API (REST) |

## Como rodar

Não há dependência nem etapa de build:

```bash
git clone https://github.com/Samuelvieria/DIW.git
cd DIW/Ecommerce-api-Store
open index.html
```

Para evitar restrição de CORS ao abrir via `file://`, sirva por HTTP:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Estrutura

```
Ecommerce-api-Store/
├── index.html      → marcação da vitrine e do carrinho
├── script.js       → busca na API, paginação e lógica do carrinho
├── style.css       → layout e responsividade
└── resourse.md     → referência da API e assets usados
```

## Decisão técnica

A paginação carrega de 5 em 5 acumulando no DOM em vez de substituir a lista.
Isso mantém o histórico de rolagem do usuário intacto — trocar o conteúdo
inteiro a cada página faria a vitrine "pular" de volta ao topo.
