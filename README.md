# API Autenticação e autorização

Uma API desenvolvida para praticar conceitos de de autenticação e autorização

Rode o comando abaixo para executar a migração de banco de dados: 

´´´bash
npm run migrate:dev
´´´

**Será essencial ter um banco de dados criado e referenciado nas variáveis de ambiente**

Rode o comando abaixo para iniciar a aplicação em modo de desenvolvimento:

´´´bash
npm run dev
´´´

## Rotas da aplicação

### Registrar usuário /users POST 

Padrão de corpo:

´´´json
{
    "name": "John Doe",
    "email": "johndoe@mail.com",
    "password": "1234"
}
´´´

Padrão de resposta (STATUS 201): 

´´´json
{
	"id": 1,
	"name": "John Doe",
	"email": "johndoe@mail.com"
}
´´´

### Log-in de usuário /users/login POST 

Padrão de corpo:

´´´json
{
    "email": "johndoe@mail.com",
    "password": "1234"
}
´´´

Padrão de resposta (STATUS 200): 

´´´json
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEzODE2MDI4fQ.DJDDIUgUDXWglhoJH2It8nJrk2kMHte_cEpKCtTYu-w",
	"user": {
		"id": 1,
		"name": "John Doe",
	    "email": "johndoe@mail.com"
	}
}
´´´

#### Possíveis erros: 

404 - NOT FOUND - Usuário não registrado

´´´json
{
	"message": "User not registred"
}
´´´

403 - FORBIDDEN - Senha e e-mail não correspondem

´´´json
{
	"message": "E-mail and password doens't match"
}
´´´

### Recuperar usuário /users GET (precisa de autorização)

Autorização: 

´´´json
{
    "headers": {
        "authorization": "Bearer token"
    }
}
´´´

Padrão de resposta (STATUS 200): 

´´´json
{
	"id": 1,
	"name": "John Doe",
	"email": "johndoe@mail.com"
}
´´´

#### Possíveis erros: 

401 - UNAUTHORIZED - Token não fornecido

´´´json
{
	"message": "Token is required"
}
´´´

401 - UNAUTHORIZED - Token inválido

´´´json
{
	"message": "invalid signature"
}
´´´