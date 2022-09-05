const express = require('express');
const {response} = require("express");

const app = express();

const user = [{
    name: 'andriy',
    age: 43,
}]
app.get('/welcome', (req, res) => {
    res.json(user);

});

app.listen(3010, () => {
    console.log('server has started');
});