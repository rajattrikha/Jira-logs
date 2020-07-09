console.log('Om Ganeshay Namah!');
const express = require('express');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
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
app.use(express.static(path.join('node_modules/bootstrap/dist/css')));
app.use(express.static(path.join('node_modules/toastr/build')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/login', loginRouter);
app.use('/', dashboardRouter);
app.use('/api', apiRouter);
app.use('/about', aboutRouter);

app.listen(port, () => {
  console.log(`Server is running at localhost:${port}/`);
});
