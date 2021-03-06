const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 123
}, {
    _id: new ObjectID(),
    text: 'Third test todo'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', (params) => {
   it('should create a new todo', (done) => {
       var text = 'Test todo text';

       request(app)
       .post('/todos')
       .send({text})
       .expect(200)
       .expect((res) => {
           expect(res.body.text).toBe(text);
       })
       .end((err, res) => {
           if(err) {
               return done(err);
           }

           Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);   
                done();
           }).catch((e) => done(e));

       });
   });

   it('should not create todo when the body data is invalid', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err) {
                return done(err);
            }
 
            Todo.find().then((todos) => {
                 expect(todos.length).toBe(3);
                 done();
            }).catch((e) => done(e));
 
        });
   });
});

describe('GET /todos', (params) => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(3);
        })
        .end(done);
    });
});


describe('GET /todos/:id', (params) => {
    it('should get todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        const id = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
        .get("/todos/123")
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/:id', (done) => {
    it('should remove a todo', (done) => {
        const hexId = todos[1]._id.toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
            if(err) {
                return done(err);
            }
            Todo.findById(hexId).then((todo) => {
                expect(todo).toBeNull();
                done();
            }).catch((e) => done(e));
        });
    });

    it('should return 404 if todo not found', (done) => {
        const id = new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${id}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
        .delete("/todos/123")
        .expect(404)
        .end(done);
    });
});

describe('Patch /todos/:id', (done) => {
    it('should update a todo', (done) => {
        const hexId = todos[0]._id.toHexString();
        const text = 'My test text';
        request(app)
        .patch(`/todos/${hexId}`)
        .send({'text': text, 'completed': true})
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBeTruthy();
            //expect(res.body.completedAt).toBeA('number');
        })
        .end(done);
    });

    it('should should clear completedAt when a todo is not completed', (done) => {
        const hexId = todos[1]._id.toHexString();
        request(app)
        .patch(`/todos/${hexId}`)
        .send({'text': 'Testing', 'completed': false})
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe("Testing");
            expect(res.body.todo.completed).toBeFalsy();
            expect(res.body.todo.completedAt).toBeNull();
        })
        .end(done);
    });

});