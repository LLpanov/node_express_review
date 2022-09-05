const express = require('express');
const path = require('path');

const {engine} = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));
const users = [
    {name: 'Andriy', password: 'unaparolasolas'},
    {name: 'Oleg', password: '12345'},
    {name: 'Kira', password: '1q2w3e4r'}
];

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/users', (req, res) => {
    res.render('users', {users});
});
app.get('/users/:userId',(req, res)=>{
    const {userId} = req.params;
    res.json(users[userId]);
})
app.post('/login', (req,res) => {
    users.push(req.body);
    res.redirect('/users');
});

app.use((req, res) => {
    res.render('notFoundPage');
});

app.listen(3010, () => {
    console.log('server has started');
});