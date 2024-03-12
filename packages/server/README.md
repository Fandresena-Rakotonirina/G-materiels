# Application gestion des matériels coté serveur

## 🚀 React / Express / MongoDB / GraphQL 🚀

### Requirements :

- Install these program in your PC

  - MongoDB
  - Node.js

### Commandes

- Open a terminal inside the project folder :

  - Install all backend's packages :

  ```sh
  cd api

  npm install

  #start server
  npm start
  ```

![Alt text](./screenshot.png 'Screenshot')

### Taper cette commande pour créer un compte Adiministrateur

- `level`:`1` laisse le comme ça (1: role administateur)
- `email`:`votre email`
- `nom`:`votre nom`
- `prenom`:`votre prenom`
- `password`:`votre mot de passe`

```sh
curl -v -X POST localhost:8000/api/user/register -H 'Content-Type: application/json' \
    -d '{ "level":"1", "email": "admin@gmail.com", "nom": "SANTATRINIAINA", "prenom":"Fandresena", "password": "secret1234"}'
```

💻 Made by RAKOTONIRINA Santatriniaina Fandresena Jean Aime ,.......

Email: fandresenarakotonirina99@gmail.com

Facebook: Fandresena RAKOTONIRINA

Tel: 034 24 725 89 / 033 70 163 78
