'use strict';
const http = require( 'http' );
const httpStatus = require( 'http-status-codes' );
const express = require('express');

const port = 4000;

const api = express()

const HOST = 'localhost'
const PORT = 8888;

api.listen(PORT, () => console.log('API running at '+HOST+':'+PORT+'!'));

api.get('/', (reg, res) => {
    res.send('Welcome to this API');
})

/*const app = http.createServer(
        ( request, response ) => {console.log( 'Received an incoming request!' );

    response.writeHead( httpStatus.OK, {'Content-Type': 'text/html'} );

    let responseMessage = '<h1>Hello World!</h1>';

    response.write( responseMessage );
    response.end();

    console.log( `Sent a response : ${responseMessage}` );
    } );

app.listen( port );
console.log( `The server has started and is listening on port number: ${port}` );*/