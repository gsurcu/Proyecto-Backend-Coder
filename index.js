import express from 'express';
import { router } from './routers/app.routers.js';
import mongoose from 'mongoose';

const app = express()
const DATABASE = 'demopb18'

const URI = `mongodb+srv://gab121:${process.env.DB_PASSWORD}@appprueba.jibhv.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

// Middlewares
// app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});