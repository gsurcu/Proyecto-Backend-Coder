const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./src/middlewares/passport');
const http = require('http')
const ChatDao = require('./src/models/daos/Chat.dao')
const Router = require('./src/routers/app.routers');

const router = new Router()
const chat = new ChatDao()
const { errorLog } = require('./src/middlewares/logger');
const { DBConfig } = require('./src/config/dbConfig');

const mode = process.argv[3] == 'cluster';
const app = express();

const server = http.createServer(app)
const io = require('socket.io')(server)

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(session({ 
  name: 'coder-session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: DBConfig.mongo.DB_URI("ecommerce") //dbConfig.mongodb.connectTo('sessions')
  })
}));
app.use(passport.initialize());
app.use(passport.session());

// Template engines
app.set('views', './views');
app.set('view engine', 'ejs');

// Routes
app.use(router.start());

// if (mode && cluster.isPrimary) {
//   console.log('Primary process PID =>', process.pid)
  
//   const numCPUs = os.cpus().length
//   console.log('No. de nucleos => ', numCPUs)

//   for (let i = 0; i < numCPUs; i++) cluster.fork();

//   cluster.on('exit', (worker, code) => {
//     console.log('Worker ', worker.process.pid, `Exitted on ${new Date().toLocaleDateString()}`);
//     cluster.fork()
//   })
// } else {
// }
const PORT = process.env.PORT || 8081;
io.on('connection', async (socket) => {
  emitir()
  socket.on("incomingMessage", async (message) =>{
    await chat.createItem(message)
    emitir()
  })
})

const emitir = async () => {
  const lista = await chat.normalizar()
  io.sockets.emit("chat", lista)
}
const runningServer = server.listen(PORT, async () => {
  console.log('Connected to DB!');
  console.log('[', process.pid, `] => running on http://localhost:${PORT}`);
});

runningServer.on('error', async (error) => {
  errorLog(error.message);
});