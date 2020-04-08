const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();
///

///

app.use(cors());
app.use(bodyParser.json());


const uri = process.env.DB_PATH;


let client = new MongoClient(uri, { useNewUrlParser: true });
const users = ["Asad", 'Moin', 'Sabed', 'Susmita', 'Sohana', 'Sabana'];


app.get('/products', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        
        const collection = client.db("hotOnion").collection("foodCollection");
        collection.find().toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
        });
        client.close();
      });
});

app.get('/orders', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        
        const collection = client.db("hotOnion").collection("orders");
        collection.find().toArray((err, documents)=>{
            if(err){
                
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
        });
        client.close();
      });
});



app.get('/:key', (req, res) =>{
    const key = req.params.key;
    
    
    
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("hotOnion").collection("foodCollection");
        collection.find({id: key}).toArray((err, documents)=>{
            if(err){
                
                res.status(500).send({message:err});
            }
            else{
                res.send(documents[0]);
            }
        });
        client.close();
      });
});


//delete
//update
// post
app.post('/addProduct', (req, res) => {
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("hotOnion").collection("foodCollection");
        collection.insert(product, (err, result)=>{
            if(err){
                
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        client.close();
      });
});
//Insert User Data
app.post('/addUser', (req, res) => {
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("hotOnion").collection("userCollection");
        collection.insertOne(product, (err, result)=>{
            if(err){
                
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        client.close();
      });
});
//SHIPMET   
app.post('/placeorder', (req, res) => {
    
    const order = req.body;
    order.time = new Date();
    

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("hotOnion").collection("orders");
        collection.insertOne(order, (err, result)=>{
            if(err){
                
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        client.close();
      });
});



const port = process.env.PORT || 4000;

 app.listen(port, () => console.log('Listenting to port ',  port));