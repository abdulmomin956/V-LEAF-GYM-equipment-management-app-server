const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());



const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@products.hm5pg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const productCollection = client.db("gleaf").collection("products");
        const userCollection = client.db("gleaf").collection("user");



        app.get('/products', async (req, res) => {
            const cursor = productCollection.find({});
            const products = await cursor.toArray();
            res.send(products)
        })

        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const product = await productCollection.findOne(query);
            res.send(product)
        })

        app.delete('/delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const product = await productCollection.deleteOne(query);
            res.send(product);
        })

        app.post('/product/', async (req, res) => {
            const newProduct = req.body;
            const result = await productCollection.insertOne(newProduct);
            res.send(result);
        })

        app.post('/user/', async (req, res) => {
            const newProduct = req.body;
            const result = await userCollection.insertOne(newProduct);
            res.send(result);
        })

        app.get('/user/:uid', async (req, res) => {
            const uid = req.params.uid;
            const query = { uid: uid };
            const cursor = userCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);

        })

        app.put('/product/:id', async (req, res) => {
            const id = req.params.id;
            const oldProduct = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    qty: oldProduct.qty,
                    sold: oldProduct.sold
                }
            };
            const result = await productCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })


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
