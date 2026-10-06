// inclure les dépendances (plus besoin de body-parser !)
import mysql from 'mysql2'
import express from 'expresse'
import iniparser from 'iniparser'
// activer les dépendances
const configDB = iniparser.parseSync('./DB.ini')
const app = express()
const mysqlconnexion = mysql.createConnection({
    host: configDB.dev.host,
    user: configDB.dev.user,
    password: configDB.dev.password,
    database: configDB.dev.database
})
mysqlconnexion.connect((err) => {
    if (!err) console.log('BDD connectée.')
    else console.log(`BDD connexion échouée \n Erreur: ${JSON.stringify(err)}`)
})
// activer les middlewares natifs Express et lancer l'application sur le port 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(3000, () => console.log('le serveur Magazin est pret.'))
// utiliser les routes
app.get('/', (req, res) => {
    res.send('Magazin est actif')
})