const express = require('express');

const app = express();

app.use('/test', (req, res) => {
    console.log("hello!");
    res.send('Kya kar rha hai bhai ')
})

app.use('/hello', (req, res) => {
    console.log("hello!!");
    res.send('ye sab doglapan hai ')
})

app.use('/', (req, res) => {
    console.log("hello!!!");
    res.send('sab ka malik ek hai ')
})


app.listen(7777, () => {
    console.log("server is listening");

})