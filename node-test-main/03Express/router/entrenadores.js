const express = require('express');
const router = express.Router();
const Entrenadores = require('../models/entrenadores');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        const arrayEntrenadoresDB = await Entrenadores.find();
        console.log(arrayEntrenadoresDB);
        res.render("entrenadores", { 
            arrayEntrenadores: arrayEntrenadoresDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/crearEntrenador', (req, res) => {
    res.render('crearEntrenador'); //nueva vista que llamaremos Crear
 })

 
router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const entrenadoresDB = new Entrenadores(body) //Creamos un nuevo Pokemon, gracias al modelo
        await entrenadoresDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/entrenadores') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "pokemon.ejs" le pusimos
    //a este campo pokemon.id, por eso lo llamados con params.id
    try {
        const entrenadoresDB = await Entrenadores.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Pokemon” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(entrenadoresDB) //Para probarlo por consola
        res.render('detalleEntrenadores', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            entrenadores: entrenadoresDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalleEntrenadores', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Entrenador no encontrado!'
        })
    }
})


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const entrenadoresDB = await Entrenadores.findByIdAndDelete({ _id: id });
        console.log(entrenadoresDB)
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/pokemon') //Esto daría un error, tal y como podemos ver arriba
        if (!entrenadoresDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el Entrenador.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Entrenador eliminado.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})


router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const entrenadoresDB = await Entrenadores.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(entrenadoresDB)
        res.json({
            estado: true,
            mensaje: 'Entrenador editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Entrenador'
        })
    }
})



 
module.exports = router;