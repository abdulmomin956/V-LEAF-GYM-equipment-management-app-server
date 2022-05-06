const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
    res.send('Running the server')
})

app.listen(port, () => {
    console.log('yes this is fine')
})
