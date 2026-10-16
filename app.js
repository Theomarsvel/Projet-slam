import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as controleur from './controllers/clientController.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

// Vues EJS et fichiers statiques (chemins indépendants du dossier de lancement)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

// Lecture des données envoyées par les formulaires
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Pages
app.get('/', controleur.lire)
app.get('/bdd', controleur.read_bdd)

// Inscription
app.get('/inscription', controleur.inscription)
app.post('/inscription', controleur.creer)

//connexion
app.get('/connexion', controleur.connexion)

// Gestion des utilisateurs
app.get('/manage', controleur.manage)
app.post('/manage/modifier', controleur.modifier)
app.post('/manage/supprimer', controleur.supprimer)

// Page introuvable
app.use((req, res) => {
  res.status(404).send(`Page introuvable : ${req.url}`)
})

app.listen(3000, () => console.log('Serveur Mycookies sur http://localhost:3000'))