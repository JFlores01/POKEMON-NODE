var http = require('http').createServer(webServer),
    form = require('fs').readFileSync('recursos/form.html'),
    querystring = require('querystring'),
    util = require('util'),
    dataString = '' //Cadena de texto vacía para ir concatenando el resultado


function webServer(req, res)
{
    if(req.method  == 'GET') // 
    {
        res.writeHead(200, {'Content-Type' : 'text/html'})
        res.end(form) //Es lo que enviará al navegador web
    }
    
        if(req.method == 'POST')
    {
        req
            .on('data', function (data){ //Mientras haya datos, ejecutaremos la siguiente Callback
                dataString += data //Que concatenará el dato en la variable dataString
            })
            .on('end', function (){ //Cuando terminen los datos, ejecutarermos la siguiente Callback
                var dataObject = querystring.parse(dataString), //Obtendremos un objeto con querystring.parse
                    dataJSON = util.inspect(dataObject), //inspect devuelve una cadena de texto de un objeto
                    //Declaramos una variable de texto
                    templateString = `
                Los datos que enviaste por POST como string son: ${dataString}
                Los datos que enviaste por POST como JSON son: ${dataJSON}
                    `
                console.log(templateString)
                res.end(templateString) //Es lo que enviará al navegador web
            })

    }

}

http.listen(3005)
console.log('Servidor corriendo en http://localhost:3005/')
