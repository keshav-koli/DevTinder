const express = require('express');

const app = express();


// ? Multiple handler or controller with different name 
app.use('/test', (req, res) => {
    console.log("hello!");
    res.send('Kya kar rha hai bhai ')
})

app.use('/hello', (req, res) => {
    console.log("hello!!");
    res.send('<h1>dsafddsf</h1>ye sab doglapan hai ')
})

// ~ a /  will work for every controller is placed at top therefore position of code matters
// app.use('/', (req, res) => {
//     console.log("hello!!!");
//     res.send('sab ka malik ek hai ')
// })

// * GET, POST, PUT ,PATCH , DELETE REST api

app.get('/user', (req, res) => {
    res.send({ "sdaf": "adfsdsaf" })
})

app.post('/user', (req, res) => {
    res.send({ no: 'sda' })
})
app.put('/user', (req, res) => {
    res.send('sm 4 sure')
})
app.patch('/user', (req, res) => {
    res.send('adsf')
})

app.delete('/user', (req, res) => {
    res.send('adsf')
})



app.get('/complex', (req, res) => {
    res.send("complex routing 1")
})

// app.get("/abc",(req,res)=>{
//     res.send("complex routing 2")
// })

// ^ it works for acd or abcd , b is optional
app.get(/^\/ab?cd$/, (req, res) => {
    res.send('ab?cd');
});
// ^ The + modifier indicates that the character immediately preceding it can be repeated one or more times means b can be repated many times
app.get(/^\/ab+cd$/, (req, res) => {
    res.send('ab+cd');
});

// ^The * character acts as a wildcard that matches any character or string of characters at that specific position
app.get('/ab*cd', (req, res) => {
    res.send('ab*cd');
});

app.get(/^\/ab*cd$/, (req, res) => {
    res.send('ab*cd');
});


app.get(/.*fly$/, (req, res) => {
    res.send('/.*fly$/');
});

app.get(/^\/a(bc)?d$/, (req, res) => {
    res.send('a(bc)d')
})

app.get(/^\/a(bc)+d$/, (req, res) => {
    res.send('a(bc)+d')
})



//! payload 

app.get('/getUser',(req,res)=>{
    console.log(req.query);
    res.send({route:'query params',method:2,value:req.query.userId});
})

app.get('/getUserParam/:userId/:password',(req,res)=>{
    console.log(req.params);
    res.send({route:'dynamic params',method:2,value:req.params.userId});
})

app.listen(7777, () => {
    console.log("server is listening");

})