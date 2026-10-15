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

export const read_bdd = async () => {
    try {
        const [lignes] = await connexion.query(
            'SELECT * FROM client'
        );

        console.log(lignes);
        return lignes;
    } catch (err) {
        console.error('Erreur SQL :', err);
        throw err;
    }
};


export async function supprimerClient(email) {
    await pool.query('DELETE FROM clients WHERE EMAIL = ?', [email])
}

export async function modifierClient({ email, nom, prenom, adresse }) {
    await pool.query(
        'UPDATE clients SET NOM = ?, PRENOM = ?, ADRESSE = ? WHERE EMAIL = ?',
        [nom, prenom, adresse, email]
    )
}
