const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());



const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@products.hm5pg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("gleaf").collection("products");
    // perform actions on the collection object
    client.close();
});

async function run() {
    try {
        await client.connect();
        const productCollection = client.db("gleaf").collection("products");


    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Running the server')
})

app.listen(port, () => {
    console.log('yes this is fine')
})
