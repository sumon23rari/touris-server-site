const express=require("express");
require('dotenv').config();
const cors=require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express();
const port=process.env.PORT || 7000;

// user sawkot4
//pass l4gysgISfA0VGcZr
// using middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster01.pcdipav.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const database = client.db("insertsport");
        const touristCollection = database.collection("tourist");
        const orderCollection=database.collection('OrderService');
        // get all service
        app.get('/service',async(req,res)=>{
            const query={}
            const cursor= touristCollection.find(query)
            const result=await cursor.toArray();
            res.send(result)
        });
        // get a service
     app.get('/service/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:ObjectId(id)};
      //  console.log('query',query);
        const result=await touristCollection.findOne(query);
       // console.log('result',result)
        res.send(result);
     })
    //   post service
    app.post('/service',async(req,res)=>{
        const newService=req.body;
        console.log(newService);
        const serviceResult=await touristCollection.insertOne(newService);
        res.send(serviceResult)
    });
    // delete a service
    app.delete('/service/:id',async(req,res)=>{
        const ids=req.params.id;
        console.log('ids',ids)
        const query={_id:ObjectId(ids)};
        const result=await touristCollection.deleteOne(query);
        res.send(result)

    });
    // order collection api

    // get a order
    app.get('/order',async(req,res)=>{
        const email=req.query.email;
        console.log(email);
        const query={email:email}
        const cursor=orderCollection.find(query)
        const result =await cursor.toArray();
        res.send(result);
    });
  
    //post a order
    app.post('/order',async(req,res)=>{
        const orderd=req.body;
        console.log(orderd);
        const result=await orderCollection.insertOne(orderd)
        res.send(result)
    });
    }
    finally{
        //await client.close()
    }
   
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('Hellow banglai')
})
app.listen(port,()=>{
    console.log('tourist web site')
})
