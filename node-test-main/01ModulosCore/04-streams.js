var fs = require('fs'),
    readStream = fs.createReadStream('nombres.txt'),
    writeStream = fs.createWriteStream('nombres_copia.txt')
// Con el método pipe podremos comenzar a leer/escribir ficheros
readStream.pipe(writeStream)
readStream  //Al objeto readStream, le estamos ejecutando un .on (con data) y un .on (con end).
.on('data', function (chunk){ 
    		console.log( //Imprimir por consola lo siguiente
        		'He leído: ',
        		chunk.length,
        		'caracteres.'
    		)
})
.on('end', function (){ 
    		console.log('Terminé de leer el archivo')
})
