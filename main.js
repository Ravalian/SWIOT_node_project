'use strict';
const http = require( 'http' );
const httpStatus = require( 'http-status-codes' );
const express = require('express');

const port = 4000;

const api = express()

const HOST = 'localhost'
const PORT = 8888;

const Gpio = require('onoff').Gpio;
const piLED1 = new Gpio(20, 'out');
const piLED2 = new Gpio(21, 'out');
const piLED3 = new Gpio(26, 'out');
const motor = new Gpio(22, 'out');

api.listen(PORT, () => console.log('API running at '+HOST+':'+PORT+'!'));

api.get('/', (req, res) => {
    res.send('Welcome to this API');
})

api.get('/turn_on', (req, res) => {
    piLED1.writeSync(1);
    res.send('Turning on LED');
})

api.get('/turn_off', (req, res) => {
    piLED1.writeSync(0);
    res.send('Turning off LED');
})

api.get('/turn_on_motor', (req, res) => {
    motor.writeSync(1);
    res.send('Turning on motor');
})

api.get('/turn_off_motor', (req, res) => {
    motor.writeSync(0);
    res.send('Turning off motor');
})

api.post('/turn_on_led_from_api', (req, res) => {
    piLED1.writeSync(1);
    piLED2.writeSync(1);
    piLED3.writeSync(1);
    res.send("turned on led");
})

api.post('/turn_off_led_from_api', (req, res) => {
    piLED1.writeSync(0);
    piLED2.writeSync(0);
    piLED3.writeSync(0);
    res.send("turned off led");
})

var isOn = false;

api.get('/LED_on_off', (req, res) => {
    
    if(isOn = false){
        piLED1.writeSync(1);
        piLED2.writeSync(1);
        piLED3.writeSync(1);
        isOn = true;
    } 
    else {
        piLED1.writeSync(0);
        piLED2.writeSync(0);
        piLED3.writeSync(0);
        isOn = false;
    }
    
    res.send("turned on led");
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