# node-test
A test node repository.

He creado una base de dattos con 3 colecciones diferentes, cada una de ellas tienen las mismas funcionalidades de añadir, editar y eliminar.
Tambien he añadido un nav-bar desde el cuál se podrá acceder a las diferentes vistas de Pokemon, Entrenadores y Gimnasios.
He solucionado un error que no impedía el arranque del servidor, pero aparecía cada vez que se iniciaba. Lo he solucionado añadiendo
esta línea: mongoose.set('strictQuery', false); justo antes de la conexión en el archivo 01-express.js.


