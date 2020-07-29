# Recuperação de Senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail; [x]
- O usuário deve receber um e-mail com instruções de recuperação de senha; [x]
- O usuário deve poder resetar sua senha; []

**RNF**

- Utilizar Mailtrap para testar envios em ambiente dev; []
- Utilizar Amazon SES para envios em produção; []
- O envio de e-mails deve acontecer em segundo plano(background Job); []


**RN**

- O link enviado por email para resetar a senha, deve expirar em 2 horas; []
- O usuário precisa confirmar a nova senha ao resetar sua senha []
