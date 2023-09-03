import 'dotenv/config';

let port;

if (process.env.PORT) {
  port = parseInt(process.env.PORT, 10);
} else {
  port = 0;
}
const configDb = {
  user: process.env.USERDB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  server: String(process.env.SERVER),
  port,
  pool: {
    max: 100,
    idleTimeoutMillis: 300000,
  },
  options: {
    trustServerCertificate: true,
  },
};

export default configDb;
