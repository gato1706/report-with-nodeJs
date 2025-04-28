# 📄 Report Generator com Node.js, PDFMake e PostgreSQL
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)


Projeto desenvolvido como prática acompanhando as aulas da [Dani Leão no YouTube](https://youtu.be/WG1EYRhny3M?si=PyLaRgrJNRkb5jjG).  
O objetivo foi aprender a gerar relatórios de produtos em PDF dinamicamente, puxando dados de um banco de dados PostgreSQL.

## 🚀 Tecnologias Utilizadas

- **TypeScript**  
- **Express** para o servidor HTTP  
- **PostgreSQL** (armazenado no [Neon Console](https://neon.tech/))  
- **PDFMake** para geração de documentos PDF

## 🎯 Funcionalidades

- Cadastro de produtos no banco de dados (rota POST)
- Listagem de todos os produtos cadastrados (rota GET)
- Geração de relatórios em PDF com listagem dos produtos
- Estilização básica dos relatórios (tabelas, cabeçalhos, etc.)

## 🛠️ Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/gato1706/report-with-nodeJs.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   
   Crie um arquivo `.env` baseado no `.env.example`, e preencha com os dados do seu banco PostgreSQL Neon:
   ```
   DATABASE_URL=postgresql://<usuario>:<senha>@<host>/<database>
   ```

4. Inicie o servidor:
   ```bash
   npm run dev
   ```

5. Rotas disponíveis:
   - **Cadastrar produto** (POST):
     ```
     POST http://localhost:3333/products
     ```
   - **Listar todos os produtos** (GET):
     ```
     GET http://localhost:3333/products
     ```
   - **Gerar relatório em PDF** (GET):
     ```
     GET http://localhost:3333/products/report
     ```

## 📚 O que eu aprendi

- Como integrar o **pdfmake** dentro de uma aplicação Node.js
- Como formatar e estruturar dados para geração de PDFs dinâmicos
- Integração de servidor backend com **PostgreSQL** utilizando o **Neon**
- Construção de rotas básicas com **Express**

## 💡 Inspiração

Esse projeto foi construído baseado nas aulas da Dani, trazendo uma abordagem prática para aprender a trabalhar com geração de documentos dentro do ambiente Node.js, algo muito comum em sistemas corporativos e ERPs.
