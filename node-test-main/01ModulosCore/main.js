var Clock = require("./reloj.js");

var miReloj = new Clock();


/*
Así controlamos las propiedades de event
cómo las llamadas a on
*/

miReloj.on("tictac", ()=>{
    miReloj.theTime();
});



