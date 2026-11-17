# Malino 🦉

Appli de maths et de lecture pour les enfants de 5 à 8 ans : calcul mental répété et accéléré, lecture syllabique (s + e = se, puis mots de 2 et 3 syllabes), avatar à personnaliser, badges, série de jours, coffre du jour et cadeaux fixés par les parents.

- Cinq autres jeux : Monnaie, Logique, Robot (premiers pas en programmation), Découverte du monde, Anglais.
- Un seul fichier : `index.html`, sans installation ni serveur.
- Progression enregistrée dans le navigateur de l'appareil (export / import dans l'espace parent).
- Espace parent protégé par un code : niveaux, vitesse, cadeaux, courbes de progression, enregistrement des sons de lettres.
- Bruitages : pack « uisfx », domaine public (CC0). Les parents peuvent ajouter leurs propres sons, qui restent sur l'appareil.


## Voix
Les consignes, syllabes, mots et phrases sont lus par des fichiers audio pré-générés (dossier `sons/`) avec **Piper TTS** et la voix française « siwis » (jeu de données SIWIS, Université d'Édimbourg, licence CC BY 4.0). Si un son manque ou ne charge pas, l'appli utilise la voix du navigateur.

## Aide
La page `aide.html` ouvre le chat de support (Tidio) ; le script du chat n'est chargé que sur cette page.

## Adresse
Domaine personnalisé : `malino.paceapp.fr` (fichier `CNAME`).

## Malino+ (freemium)

- **Gratuit pour toujours** : maths, lecture, Monnaie et Logique, 1 enfant.
- **Essai de 14 jours** sans carte bancaire, dès la création du compte : niveaux 1 à 3 des autres thématiques, 2 enfants.
- **Malino+** : 3,99 €/mois ou 29,99 €/an (Stripe, compte Pace, produit « Malino+ ») : tout débloqué, 4 enfants, suivi détaillé, objets Plasma, coffre doré chaque semaine.
- **Cadeau** : 3 mois (9,99 €) ou 6 mois (17,99 €), sans compte, depuis le bouton « Offrir » ou `?offrir`.
- **Parrainage** : +7 jours par ami inscrit (2 maximum) ; l'ami a 21 jours d'essai.
- **Panel admin** : `admin.html` (comptes listés dans la table `admins`).
- Supabase : tables `comptes`, `paiements`, `cadeaux`, `parrainages`, `stops`, `journal` ; fonctions `malino-api`, `stripe-malino` (webhook), `code-connexion`.
