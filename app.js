console.log('Om Ganeshay Namah!');
const express = require('express');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const authenticate = require('./middlewares/authentication');

dotenv.config({ path: './config.env' });

const dashboardRouter = require('./routes/dashboardRoutes');
const aboutRouter = require('./routes/aboutRoutes');
const apiRouter = require('./routes/apiRoutes');
const loginRouter = require('./routes/loginRoutes');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use(
  session({
    secret: 'hushh its our secret',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static('assets'));
app.use(express.static(path.join('node_modules/bootstrap/dist')));
app.use(express.static(path.join('node_modules/toastr/build')));
app.use(express.static(path.join('node_modules/popper.js/dist/umd')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/login', loginRouter);
app.use('/about', aboutRouter);
app.use('/', authenticate, dashboardRouter);
app.use('/api', authenticate, apiRouter);

app.listen(port, () => {
  console.log(`Server is running at localhost:${port}/`);
});
