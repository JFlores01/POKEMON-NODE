const express = require('express');
const router = express.Router();
const Gimnasios = require('../models/gimnasios');

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        const arrayGimnasiosDB = await Gimnasios.find();
        console.log(arrayGimnasiosDB);
        res.render("gimnasios", { 
            arrayGimnasios: arrayGimnasiosDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/crearGimnasios', (req, res) => {
    res.render('crearGimnasios'); //nueva vista que llamaremos Crear
 })

 
router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const gimnasiosDB = new Gimnasios(body) //Creamos un nuevo Pokemon, gracias al modelo
        await gimnasiosDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/gimnasios') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "pokemon.ejs" le pusimos
    //a este campo pokemon.id, por eso lo llamados con params.id
    try {
        const gimnasiosDB = await Gimnasios.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Pokemon” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(gimnasiosDB) //Para probarlo por consola
        res.render('detalleGimnasios', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            gimnasios: gimnasiosDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalleGimnasios', { //Mostraremos el error en la vista "detalle"
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
        const gimnasiosDB = await Gimnasios.findByIdAndDelete({ _id: id });
        console.log(gimnasiosDB)
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/pokemon') //Esto daría un error, tal y como podemos ver arriba
        if (!gimnasiosDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el Gimnasio.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Gimnasio eliminado.'
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
        const gimnasiosDB = await Gimnasios.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(gimnasiosDB)
        res.json({
            estado: true,
            mensaje: 'Gimnasio editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Gimnasio'
        })
    }
})



 
module.exports = router;