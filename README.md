# mongodbi

This repository contains code that is vulnerable to mongodb (NoSQL) injection.

> You will need mongodb accessible on your machine

start the server:
```sh
$ npm start
```

run the client
```sh
$ node client.js
```

A simple NoSQL injection is performed by the client. The code is not large (50LOC server, 23 LOC client), please read it to understand what happens here.

Open issue if you have questions.
