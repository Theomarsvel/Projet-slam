import express from 'express'
import * as controleur from './controllers/clientController.js'

const app = express()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', controleur.lire)
app.get('/bdd', controleur.read_bdd)

app.get('/connexion', controleur.connexion)
app.get('/inscription', controleur.inscription)   
app.post('/inscription', controleur.creer)

app.listen(3000, () => console.log('Serveur Mycookies sur http://localhost:3000'))

