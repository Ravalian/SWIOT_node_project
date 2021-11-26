'use strict';
const http = require( 'http' );
const httpStatus = require( 'http-status-codes' );
const express = require('express');
const raspi = require('raspi');
const I2C = require('raspi-i2c').I2C;

const port = 4000;

const api = express()

const HOST = 'localhost'
const PORT = 8888;

api.listen(PORT, () => console.log('API running at '+HOST+':'+PORT+'!'));

//Gpio
const Gpio = require('onoff').Gpio;
const piLED1 = new Gpio(20, 'out');
const piLED2 = new Gpio(21, 'out');
const piLED3 = new Gpio(26, 'out');
const motor = new Gpio(22, 'out');
const discoLED = new Gpio(24, 'out');

//i2c - Temp sensor
raspi.init(() => {
    const i2c = new I2C();
    console.log(i2c.readByteSync(0x48));
})

//Front page
api.get('/', (req, res) => {
    res.send('Welcome to this API');
})

//LED Controller
api.get('/LED_on_off', (req, res) => {
    var LEDValue = piLED1.readSync();
    console.log("Do this happen? is LED on: " + LEDValue);
    
    if(LEDValue == 0){
        piLED1.writeSync(1);
        discoLED.writeSync(1);
    } 
    else if(LEDValue == 1){
        piLED1.writeSync(0);
        discoLED.writeSync(1);
    }
    
    res.send("turned on led");
})

//Motor Controller
api.get('/Motor_on_off', (req, res) => {
    var LEDValue = piLED3.readSync();
    console.log("Do this happen? is LED on: " + LEDValue);
    
    if(LEDValue == 0){
        piLED3.writeSync(1);
        motor.writeSync(1);
    } 
    else if(LEDValue == 1){
        piLED3.writeSync(0);
        motor.writeSync(0);
    }
    
    res.send("turned on led");
})

//Test methods - used to test functionality
api.get('/turn_on_motor', (req, res) => {
    motor.writeSync(1);
    res.send('Turning on motor');
})

api.get('/turn_off_motor', (req, res) => {
    motor.writeSync(0);
    res.send('Turning off motor');
})

api.get('/MOTOR_on_off', (req, res) => {
    var MotorValue = motor.readSync();
    console.log("Do this happen? is LED on: " + MotorValue);

    if(MotorValue == 0){
        motor.writeSync(1);
    }
    else if(MotorValue == 1){
        motor.writeSync(0);
    }
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