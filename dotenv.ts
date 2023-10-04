import * as dotenv from 'dotenv';
dotenv.config();
const {PORT,DB_URL,JWT_SECRET} = process.env;

export const ENV = {...process.env, ...{PORT,DB_URL,JWT_SECRET}}