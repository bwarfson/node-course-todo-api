
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDb server');
    }
    console.log('Connected to MongoDb server');
    const db = client.db('TodoApp');

    db.collection('Todos').find({completed: false}).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    }); 


    db.collection('Todos').find(
        {
            _id: new ObjectID("5a90cb8daaaf5145d43cbb47")
        }).toArray().then((docs) => {
        console.log('Todo');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    }); 


    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}` );
    }, (err) => {
        console.log('Unable to fetch todos', err);
    }); 

    db.collection('Users').find({name: 'Bwarfson'}).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch users', err);
    });

    //client.close();
});