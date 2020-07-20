const app = require('express')()
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const _ = require('lodash')

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
        // const requestOptions = {
        //     url: url,
        //     method: 'get',
        //     headers: _.omit(req.headers, ['cache-control', 'host', 'postman-token', 'user-agent']),
        // }
        // const response = await axios(requestOptions)
        const response = await axios.get(url, {
            headers: {
                ..._.pick(req.headers, ['x-auth-token', 'Authorization', 'Content-Type']),
            }
        })
        console.log('response.data ::: ', response.data)
        return res.send(response.data);
    } catch (e) {
        res.status(500).send({ error: e })
    }
})

app.get('/', (req, res) => {
    res.send('hello heroku app')
})
const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log('Server listening on ' + PORT));