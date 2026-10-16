// Module ES : s'exécute dans le navigateur, après le chargement de la page.

const fenetre = document.querySelector('#fenetre')
const liste = document.querySelector('.liste')

// Remplit les champs de la fenêtre avec les données d'un utilisateur
const remplirFormulaire = ({ email, prenom, nom, adresse }) => {
  document.querySelector('#f-email').value = email
  document.querySelector('#f-prenom').value = prenom
  document.querySelector('#f-nom').value = nom
  document.querySelector('#f-adresse').value = adresse ?? ''
}

// Un seul écouteur pour tous les boutons "Modifier"
liste.addEventListener('click', (event) => {
  const bouton = event.target.closest('.btn-modifier')
  if (!bouton) return

  remplirFormulaire(bouton.dataset)
  fenetre.showModal()
})

// Confirmation avant suppression
liste.addEventListener('submit', (event) => {
  if (!event.target.matches('.form-suppr')) return

  if (!confirm('Supprimer cet utilisateur ?')) {
    event.preventDefault()
  }
})

// Fermeture de la fenêtre
document.querySelector('#annuler').addEventListener('click', () => fenetre.close())
