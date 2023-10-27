const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');

    // Set interval sends the message to the client every second.
    // When working with a stream a data, set interval is not needed.

    setInterval(() => {
        // The message may be replaced with other data.
        res.write(`Liverpool is the best team in the world!\n\n`);
    }, 1000);

    res.on('close', () => {
        console.log('Client has closed the connection.');
        res.end();
    });

    res.on('error', (err) => {
        console.log(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

