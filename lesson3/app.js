//Homework lesson3
// Попереднє дз переписати на роути і контролери і
// написати мідлвару яка буде перевіряти по роуту /sigIn чи імейл існує в масиві юзерів
// і другу мідлвару /login чи користувач ввів всі data

const express = require('express');

const path = require('path');

const {engine} = require('express-handlebars');
const apiRoutes = require('./routes/apiRoutes');
const app = express();

// default setup
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));
//setup engine

app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

//Routes setup
app.use(apiRoutes);


app.listen(3010, () => {
    console.log('server has started 👽👽👽');
});
