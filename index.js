const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config({ path: './config.env' });

const app = express();

app.set('view engine', 'html')

app.use((req, res, next) => {
    req.header('x-access-token', `${process.env.METALS_API_KEY}`)
    next()
})

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res, next) => {
    res.render('index')
})

app.get('/api', async (req, res, next) => {
    const url = `https://www.goldapi.io/api/XAU/USD`;

    const getData = async url => {
        try {
            const response = await axios.get(url, {
                'headers': {
                    'x-access-token': process.env.METALS_API_KEY,
                    'Content-Type': 'application/json'
                }
            });
            const data = response.data;

            res.status(200).json({
                data
            });

        } catch (error) {
            console.log(error.message);
        }
    };

    getData(url);

})

app.listen(process.env.PORT || 8000, () => {
    console.log("Connected to server")
    // console.log(process.env.METALS_API_KEY)
})