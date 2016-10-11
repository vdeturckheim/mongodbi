'use strict';
const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://localhost/injectable');

const app = Express();
app.use(BodyParser.json());

const Document = Mongoose.model('Document', {
    title: {
        type: String,
        unique: true
    },
    type: String
});

require('./documents.json').forEach((d) => (new Document(d)).save().catch(() => {}));
app.post('/documents', (req, res) => {

    delete req.body._id;
    (new Document(req.body))
        .save()
        .then(() => {

            res.sendStatus(201);
        })
        .catch((err) => res.json(err));
});

app.post('/documents/find', (req, res) => {

    if (!req.body.type && !req.body.title) {
        return res.json([]);
    }

    if (req.body.type === "secret projects") { // I don't want people to discover my secret projects,
        // it would be a shame is 'client.js' contained a method to show all the content of the collection here...
        return res.json([]);
    }

    Document.find(req.body).exec()
        .then((r) => res.json(r))
        .catch((err) => res.json(err));
});

app.listen(3000, () => {
    console.log('app listening on port 3000!');
});