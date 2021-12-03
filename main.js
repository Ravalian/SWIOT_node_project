'use strict';
const http = require( 'http' );
const httpStatus = require( 'http-status-codes' );
const express = require('express');
const raspi = require('raspi');
const I2C = require('raspi-i2c').I2C;
const { resolve } = require('path');

//settings
const api = express()

const HOST = 'localhost'
const PORT = 8888;

api.listen(PORT, () => console.log('API running at '+HOST+':'+PORT+'!'));

//Gpio
const Gpio = require('onoff').Gpio;
const piLED1 = new Gpio(26, 'out');
const piLED2 = new Gpio(20, 'out');
const piLED3 = new Gpio(21, 'out');
const motor = new Gpio(22, 'out');
const discoLED = new Gpio(24, 'out');
const tempLED = new Gpio(27, 'out');

//Front page
api.get('/', (req, res) => {
    res.send('Welcome to this API');
})

//LED Controls
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

//Motor Controls
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

//Temp sensor controls
var temp_sensor = false;
var On_off = false;

api.get('/temp_sensor_on_off', (req, res) => {
    if (temp_sensor == false){
        On_off = true;

        temp_sensor = true;
        res.send("Temp sensor LED turn on")
    }
    else if (temp_sensor == true){
        On_off = false;
        temp_sensor = false;
        res.send("Temp sensor LED turned off")
    }
})

//i2c - Temp sensor
async function readtemp () {
    while(true){
        raspi.init(() => {
            const i2c = new I2C();
            console.log(i2c.readByteSync(0x48));

            if(temp_sensor == true){
                if(i2c.readByteSync(0x48) >= 29){
                    piLED2.writeSync(1);
                    tempLED.writeSync(1);
                }
                else{
                    piLED2.writeSync(0);
                    tempLED.writeSync(0);                
                }
                console.log("Temp_sensor LED turned on");
            }
            else {
                console.log("Temp_sensor LED turned off");
            }
        });
        await sleep(1000);
    }
}
//Run function
readtemp();

//Sleep function
function sleep (ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}