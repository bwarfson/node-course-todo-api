const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const id = '5a9338003821a541c02f6832';

if(!ObjectID.isValid(id)) {
    console.log('ID not valid');
}

//this will remove everything in the database
Todo.remove({}).then((result) => {
    console.log(result);
});

//Todo.findOneAndRemove
Todo.findOneAndRemove({_id:'someid'}).then((todo) => {
    console.log(todo);
});

//Todo.findByIdAndRemove
Todo.findByIdAndRemove('someid').then((todo) => {
    console.log(todo);
});
