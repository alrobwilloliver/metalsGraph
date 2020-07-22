const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.render('index')
})

const port = 8000;
app.listen(port, () => {
    console.log("Connected to server")
})