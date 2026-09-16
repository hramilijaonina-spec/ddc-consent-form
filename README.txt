DDC CONSENT — Application PWA (fonctionne hors-ligne)
=====================================================

CONTENU DU DOSSIER
- index.html              -> l'application (tout est inclus : PDF, logo, textes)
- manifest.webmanifest    -> déclare l'app (nom, icône, plein écran)
- service-worker.js       -> met l'app en cache pour le hors-ligne
- icon-192.png / icon-512.png / icon-512-maskable.png / apple-touch-icon.png

POURQUOI IL FAUT L'HÉBERGER UNE FOIS
Une app installable qui marche hors-ligne doit être servie depuis une adresse
https:// (obligatoire sur iPhone). Après la première ouverture, elle se met en
cache et fonctionne SANS connexion.

HÉBERGEMENT — OPTION SIMPLE (gratuite, 2 min) : Netlify Drop
1. Va sur https://app.netlify.com/drop
2. Glisse-dépose CE DOSSIER entier (ou le .zip) dans la page.
3. Tu obtiens une adresse du type https://xxxxx.netlify.app
   -> c'est l'adresse de ton app.

HÉBERGEMENT — SUR TON DOMAINE (ddc-africa.com)
Mets ces fichiers dans un sous-dossier, ex. /consent/ , et ouvre
https://ddc-africa.com/consent/  (le tout via HTTPS).

INSTALLER SUR IPHONE (à faire une fois, en ligne)
1. Ouvre l'adresse dans SAFARI (important : Safari, pas un aperçu de fichier).
2. Bouton Partager  ->  « Sur l'écran d'accueil ».
3. Une icône DDC apparaît. Ouvre-la : l'app se lance en plein écran.
4. Désormais elle fonctionne HORS-LIGNE.

METTRE À JOUR L'APP PLUS TARD
Remplace les fichiers sur l'hébergement et change la ligne
  var CACHE = "ddc-consent-v6";
en v7, v8, ... dans service-worker.js. À la prochaine ouverture en ligne,
l'app se met à jour toute seule.

LE PDF
À l'envoi, le PDF s'ouvre dans le lecteur iOS : tu peux l'enregistrer dans
Fichiers, le partager, ou l'imprimer (Epson). Tout se fait sur l'appareil.
