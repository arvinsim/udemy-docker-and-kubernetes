const express = require('express')
const redis = require('redis')

const app = express()
const client = redis.createClient({
    host: "redis",
    port: 6379
})
client.on('error', (err) => console.log('Redis Client Error', err));


async function bootUp() {
    await client.connect();
    await client.set('visits', 0);
};

bootUp()

app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        const newVisits = parseInt(visits, 10) + 1
        res.send('Number of visits is ' + newVisits)
        client.set('visits', newVisits)
    })
})

app.listen('8081', () => {
    console.log('Listening on port 8081')
})
