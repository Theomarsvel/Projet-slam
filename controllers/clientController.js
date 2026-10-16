import bcrypt from 'bcrypt'
import * as bdd from '../models/bdd.js'

// ----- Pages -----
export const lire = (req, res) => {
    return res.render('Mycoockies', { erreur: null })
}

export const inscription = (req, res) => {
    return res.render('inscription', { erreur: null })
}

export const connexion = (req, res) => {
    return res.render('connexion', { erreur: null })
}

export const read_bdd = async (req, res) => {
    try {
        const lignes = await bdd.read_bdd()
        return res.send(lignes)
    } catch (err) {
        console.error(err)
        return res.status(500).send('Erreur lors de la lecture des clients')
    }
}

// ----- Inscription -----
export const creer = async (req, res) => {
    try {
        const { nom, prenom, mdp, email, adresse } = req.body

        if (!nom || !prenom || !mdp || !email || !adresse) {
            return res.status(400).render('inscription', { erreur: 'Tous les champs sont obligatoires.' })
        }

        if (await bdd.trouverParEmail(email)) {
            return res.render('erreur/echec', { email })
        }

        const mdpHash = await bcrypt.hash(mdp, 10)
        await bdd.creerClient({ nom, prenom, mdpHash, email, adresse })

        return res.render('success/succes', { prenom })
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).render('inscription', { erreur: 'Ce client existe déjà.' })
        }
        console.error(err)
        return res.status(500).render('inscription', { erreur: 'Erreur serveur.' })
    }
}

// ----- Gestion des utilisateurs -----
export const manage = async (req, res) => {
    try {
        const clients = await bdd.read_bdd()
        return res.render('manage', { clients, message: req.query.message || null })
    } catch (err) {
        console.error(err)
        return res.status(500).send('Erreur lors de la lecture des clients')
    }
}

export const modifier = async (req, res) => {
    try {
        const { email, nom, prenom, adresse } = req.body
        await bdd.modifierClient({ email, nom, prenom, adresse })
        return res.redirect('/manage?message=Client modifié')
    } catch (err) {
        console.error(err)
        return res.status(500).send('Erreur lors de la modification')
    }
}

export const supprimer = async (req, res) => {
    try {
        await bdd.supprimerClient(req.body.email)
        return res.redirect('/manage?message=Client supprimé')
    } catch (err) {
        console.error(err)
        return res.status(500).send('Erreur lors de la suppression')
    }
}