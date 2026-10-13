import bcrypt from 'bcrypt'
import * as bdd from '../models/bdd.js'
import { read_bdd as lireClients } from '../models/bdd.js';


// GET : affiche le formulaire
export const lire = (req, res) => {
    res.render('Mycoockies', { erreur: null })
}

// POST : traite le formulaire
export const creer = async (req, res) => {
    try {
        const { nom, prenom, mdp, email, adresse } = req.body

        if (!nom || !prenom || !mdp || !email || !adresse) {
            return res.status(400).render('inscription', { erreur: 'Tous les champs sont obligatoires.' })
        }

        if (await bdd.trouverParEmail(email)) {
            return res.render('erreur/echec', { email })
            //return res.status(409).render('inscription', { erreur: 'Cet email est déjà utilisé.' })
            //res.render('echec', { email })
        }

        const mdpHash = await bcrypt.hash(mdp, 10)
        await bdd.creerClient({ nom, prenom, mdpHash, email, adresse })

        return res.render('succes', { prenom })
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).render('inscription', { erreur: 'Ce client existe déjà.' })
        }
        console.error(err)
        res.status(500).render('inscription', { erreur: 'Erreur serveur.' })
        res.render('erreur/echec', { email })
    }
}

export const read_bdd = async (req, res) => {
    try {
        const lignes = await lireClients();
        res.send(lignes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la lecture des clients');
    }
};

export const connexion = async (req, res) => {res.render('connexion')};