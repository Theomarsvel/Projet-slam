import mysql from 'mysql2/promise'
import iniparser from 'iniparser'

const configDB = iniparser.parseSync('./DB.ini')

const connexion = mysql.createPool({
    host: configDB.dev.host,
    user: configDB.dev.user,
    password: configDB.dev.password,
    database: configDB.dev.database
})

export const creerClient = async ({ nom, prenom, mdpHash, email, adresse }) => {
    await connexion.execute(
        `INSERT INTO client (Nom, Prenom, MDP, Email, Adresse_livraison)
         VALUES (?, ?, ?, ?, ?)`,
        [nom, prenom, mdpHash, email, adresse]
    )
}

export const trouverParEmail = async (email) => {
    const [rows] = await connexion.execute('SELECT * FROM client WHERE Email = ?', [email])
    return rows[0]
}

export const read_bdd = (req, res) => {
    connexion.query('SELECT * FROM client', (err, lignes, champs) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur lors de la lecture des clients');
        }

        console.log(lignes);
        res.send(lignes);
    });
};
