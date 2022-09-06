
const express = require('express');

const path = require('path');

const {engine} = require('express-handlebars');
const apiRoutes = require('./routes/apiRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));
app.use(apiRoutes);


let error = '';

app.get('/signIn', (req, res) => {
    res.render('sign');
});

app.post('/signIn', ({body}, res) => {
    const checkValue = users.find(user => user.email === body.email && user.password.toString() === body.password);
    if (checkValue) {
        res.redirect(`/users/${checkValue.id.toString()}`);
    } else {
        res.redirect('/error');
        error = 'Такого Користовича не існує або він був видалений...';
    }

});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', ({body}, res) => {
    const checkUser = users.some(user => user.email === body.email);
    if (checkUser) {
        error = 'this email has already exists';
        res.redirect('/error');
        return;
    }
    users.push({...body, id: new Date().getTime()});
    res.redirect('/users');
});

app.get('/users', ({query}, res) => {
    if (Object.keys(query).length) {
        let usersArray = [...users];
        if (query.city) {
            usersArray = usersArray.filter(user => user.city === query.city);
        }

        if (query.age) {
            usersArray = usersArray.filter(user => user.age === query.age);
        }

        res.render('users', {users: usersArray});
        return;

    }

    res.render('users', {users});
});

app.get('/users/:userId', ({params}, res) => {
    const user = users.find(user => user.id === +params.userId);
    if (!user) {
        error = 'такого користовича не існує';
        res.redirect('/error');
        return;

    }
    res.render('user', ({user}));

});

app.post('/users/:userId', ({body}, res) => {
    users.splice(users.indexOf(body.id - 1), 1);
    res.redirect('/users');
});

app.get('/error', (req, res) => {
    res.render('error', ({error}));

});


app.use((req, res) => {
    res.render('notFoundPage');
});

app.listen(3010, () => {
    console.log('server has started 👽👽👽');
});