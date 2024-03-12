export const {
  HTTP_PORT = 8000,
  NODE_ENV = 'developement',
  DEV_ORIGIN = 'http://localhost:3000',
  TOKEN_SECRET = '990bf68e6adf1be5f1671bba3bec692056922454',

 /*  DB_USERNAME = 'fandresena',
  DB_PASSWORD = 'root', */
  DB_HOST = 'localhost',
  DB_PORT = 27017,
  DB_NAME = 'materiels',

  PROD_ORIGIN
} = process.env

export const IS_PROD = NODE_ENV === 'production'

export const ORIGIN = IS_PROD ? PROD_ORIGIN : DEV_ORIGIN

// Construction de l'URI de connexion MongoDB 
export const MONGO_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

/* // Password URL encoded to escape special characters
export const MONGO_URI = `mongodb://${DB_USERNAME}:${encodeURIComponent(
  DB_PASSWORD
)}@${DB_HOST}:${DB_PORT}/${DB_NAME}` */
