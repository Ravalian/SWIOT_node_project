'use strict';
const http = require( 'http' );
const httpStatus = require( 'http-status-codes' );
const express = require('express');

const port = 4000;

const api = express()

const HOST = 'localhost'
const PORT = 8888;

const Gpio = require('onoff').Gpio;
const led = new Gpio(20, 'out');
const motor = new Gpio(22, 'out');

api.listen(PORT, () => console.log('API running at '+HOST+':'+PORT+'!'));

api.get('/', (reg, res) => {
    res.send('Welcome to this API');
})

api.get('/turn_on', (reg, res) => {
    led.writeSync(1);

    res.send('Turning on LED');
})

api.get('/turn_off', (reg, res) => {
    led.writeSync(0);

    res.send('Turning off LED');
})

api.get('/turn_on_motor', (reg, res) => {
    motor.writeSync(1);
    res.send('Turning on motor');
})

api.get('/turn_off_motor', (reg, res) => {
    motor.writeSync(0);
    res.send('Turning off motor');
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