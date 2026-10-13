import express from 'express'
import * as controleur from './controllers/clientController.js'

const app = express()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', controleur.lire)
app.post('/', controleur.creer)
app.get('/bdd', controleur.read_bdd)

app.listen(3000, () => console.log('Serveur Mycookies sur http://localhost:3000'))