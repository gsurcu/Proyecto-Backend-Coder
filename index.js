import express from 'express';
import { router } from './routers/app.routers.js';

const app = express()
const PORT = process.env.PORT || 8080

// Rutas
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});