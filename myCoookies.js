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
app.listen(3000, () => console.log('le serveur myCoookies est pret.'))
// utiliser les routes
app.get('/', (req, res) => {
    res.send('myCoookies est actif')
})


app.get('/myCookies-client', (req, res) => {
    mysqlconnexion.query('SELECT * FROM clients', (err, lignes, champs) => {
        if (!err) {
            console.log(lignes)
            res.send(lignes)
        }
    })
})

app.post('/myCookies-client', (req, res) => {
    const { Nom, Prenom, MDP, Email } = req.body;

    console.log(`Creation du compte de ${nom} ${prenom} avec adresse email ${email}`);
    const requeteSQL = `INSERT INTO client (Nom, Prenom, MDP, Email) VALUES (${nom}, "${prenom}", "${mdp}", ${email})`;
    console.log("Requete : " + requeteSQL);

    mysqlconnexion.query(requeteSQL, (err) => {
        if (!err) {
            console.log("Insertion terminé");
            res.redirect("/myCookies-client");
        } else {
            console.log("Erreur lors de l'enregistrement");
            res.send("Erreur ajout : " + JSON.stringify(err));
        }
    });
});

app.delete('/myCookies-client/:email', (req, res) => {
    let critere = req.params.email
    console.log("email = " + critere)
    mysqlconnexion.query('DELETE FROM client WHERE Email = ?', [critere], (err, lignes, champs) => {
        if (!err) {
            console.log("Effacement terminé")
            res.send("Effacement terminé")
        } else {
            console.log("Erreur lors de l'effacement")
            res.send("Erreur effacement : " + JSON.stringify(err))
        }
    })
})
