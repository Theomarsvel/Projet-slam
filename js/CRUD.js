app.get('/myCookies-client', (req, res) => {
    mysqlconnexion.query('SELECT * FROM clients', (err, lignes, champs) => {
        if (!err) {
            console.log(lignes)
            res.send(lignes)
        }
    })
})

function ajouterClient(client) {
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
}

function deleteClients() {
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
}

module.exports = { ajouterClient, deleteClients };

