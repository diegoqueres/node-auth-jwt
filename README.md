# node-auth-jwt
Exemplo de implementação de token jwt numa aplicação NodeJS.

Implementação documentada commit a commit.

Fonte [Luiz Duarte, Autenticação JSON Web Token (JWT) em Node.js](https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/). 


## Complementar
Na branch **assinatura_assimetrica_jwt**, podemos conferir a implementação de criptografia assimétrica para assegurar seu JWT caso esteja operando em um ambiente de Microserviços *(onde não é recomendável compartilhar o SECRET entre eles)*.

As chaves RSA usadas nesse exemplo são de 1024 bits, usando format scheme PKCS #1 (base 64). Geradas no site: [https://www.csfieldguide.org.nz/en/interactives/rsa-key-generator/](https://www.csfieldguide.org.nz/en/interactives/rsa-key-generator/). 

Fonte [Luiz Duarte, Autenticação JSON Web Token (JWT) em Node.js - Parte 2](https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-node-js-2/). 