const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const id = '5a9338003821a541c02f6832';

if(!ObjectID.isValid(id)) {
    console.log('ID not valid');
}

Todo.find({ // if there is not any it returns []
    _id: id  // object id gets converted automattically
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({ //returns null instead of []
    _id: id  // object id gets converted automattically
}).then((todo) => {
    console.log('Todo', todo);
});

Todo.findById(id).then((todo) => { //use this when looking for a specfic id
    if(!todo){
        return console.log('Id not found');
    }
    console.log('Todo by id', todo);
}).catch((e) => console.log(e));