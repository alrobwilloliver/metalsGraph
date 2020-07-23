const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config({ path: './config.env' });

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.render('index')
})

app.get('/api', (req, res, next) => {
    const url = `https://metals-api.com/api/latest?access_key=${process.env.METALS_API_KEY}`;

    const getData = async url => {
        try {
            const response = await axios.get(url);
            const data = response.data;

            res.status(200).json({
                status: 'success',
                data
            });

        } catch (error) {
            console.log(error);
        }
    };

    getData(url);
})

app.listen(process.env.PORT || 8000, () => {
    console.log("Connected to server")
    // console.log(process.env.METALS_API_KEY)
})