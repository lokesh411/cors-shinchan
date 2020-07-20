const app = require('express')()
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const https = require('https')
const agent = new https.Agent({
    rejectUnauthorized: false
});
app.use(bodyParser.json())
app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next()
})

app.post('/:url', async (req, res) => {
    const url = decodeURIComponent(req.params.url);
    try {
        const response = await axios.post(url, {
            ...req.body,
            headers: {
                ...req.headers,
            },
            httpsAgent: agent
        })
        console.log('response.data ::: ', response.data)
        return res.send(response.data);
    } catch (e) {
        res.status(500).send({ error: e })
    }
});

app.get('/:url', async (req, res) => {
    const url = decodeURIComponent(req.params.url);
    try {
        const response = await axios.get(url, {
            headers: {
                ...req.headers,
            },
            httpsAgent: agent,
        })
        console.log('response.data ::: ', response.data)
        return res.send(response.data);
    } catch (e) {
        res.status(500).send({ error: e })
    }
})

app.listen(9000, () => console.log('Server listening on 9k'));