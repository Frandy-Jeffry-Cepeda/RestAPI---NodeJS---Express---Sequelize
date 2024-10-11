import express from 'express'
import router from './router'
import db from './config/db'

// Conectar a base de datos

export async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
       // console.log('Conexión exitosa a la bd')
    } catch (error) {
        // console.log(error)
        console.log('Hubo un error al conectar la base de datos')
    }
}

connectDB()

// Instancia de express

const server = express()

// Leer datos de formularios

server.use(express.json())

server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.json({msg: 'Desde API'})
})

export default server