# Backend do Projeto backEndFJCompany

Este é o backend do Projeto backEndFJCompany, que consiste em uma aplicação que oferece uma variedade de funcionalidades através de APIs RESTful. Abaixo estão algumas informações sobre o que este backend faz e as tecnologias que utiliza.

## Funcionalidades

O backend deste projeto oferece as seguintes funcionalidades:

- Gerenciamento de usuários
- CRUD (Create, Read, Update, Delete) de recursos específicos

## Padrão de Organização

Este projeto segue o padrão de organização MVC (Model-View-Controller), com as responsabilidades de controle de fluxo e manipulação de dados separadas em diferentes camadas:

- **Controller:** Lida com a lógica da aplicação e a comunicação com o modelo e a visão.
- **Model:** Responsável pela manipulação de dados e regras de negócios.
- **Rota:** Define as rotas da API e mapeia cada rota para um controlador correspondente.

## Tecnologias Utilizadas

Este backend utiliza as seguintes tecnologias:

- **Axios:** Biblioteca para realizar chamadas HTTP.
- **SQL Server:** Banco de dados relacional utilizado para armazenar e recuperar dados.
- **Integração com a Open AI:** Integração para solicitar tradução de textos aleatórios para inglês utilizando a API da Open AI.

## Configuração

Antes de executar este backend, certifique-se de configurar corretamente o ambiente, incluindo as variáveis de ambiente necessárias para a conexão com o banco de dados e as chaves de API para a integração com a Open AI.

Para instalar as dependências, execute:

```bash
npm install

