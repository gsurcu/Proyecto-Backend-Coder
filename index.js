import express from 'express';
import router from './routers/app.routers';

const path = require("path");
const app = express()
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});