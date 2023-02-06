/*

var buf = new Buffer(100),
    buf2 = new Buffer(26),
    str = '\u00bd + \u00bc = \u00be'

buf.write('abcd', 0, 4, 'ascii')

console.log(
    buf,
    buf.toString('ascii'),
    str,
    str.length + 'caracteres',
    Buffer.byteLength(str, 'utf8') + 'bytes',
    buf2.length
)

*/

var buf = Buffer.alloc(100),
    buf2 = Buffer.alloc(26),// 26 letras del abecedario
    str = '\u00bd + \u00bc = \u00be'

for ( var i = 0; i < buf2.length; i++ )
{
    // 97 en ASCII es a
    buf2[i] = i + 97 // De esta forma vamos a poder pintar el abecedario en minúsculas

}

console.log( buf2.toString('ascii') )










