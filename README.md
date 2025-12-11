📘 README – Site vitrine Nectar Wine Merchant

Bienvenue dans le dossier contenant le code source du site vitrine Nectar Wine Merchant.
Ce document vous explique :

- comment ouvrir le projet dans Visual Studio Code,

- comment lancer le site en local,

- où il est hébergé,

- comment fonctionnent les formulaires (newsletter + contact),

- et où se trouvent les différents accès.

🧾 1. Informations générales

Technologies utilisées :

Framework : Next.js 14

Langage : React / JavaScript

Style : SCSS

Multilingue : i18n (Français / Anglais)

Hébergement : Vercel

SMTP : Gmail

Type de site :
Site vitrine responsive en 1 page, optimisé pour la performance (Lighthouse), avec :

un formulaire de contact fonctionnel,

une modale d'inscription à la newsletter,

une galerie,

un système de traduction FR/EN,

un nom de domaine personnalisé.

🌐 2. Hébergement & Domaine
✔️ Site en ligne

https://nectar-winemerchant.com

Hébergé chez Vercel.

✔️ Accès administrateur Vercel

Compte hébergeur :
monard johan – contact.monard.johan@gmail.com

Vous n'avez rien à gérer : les mises à jour techniques, déploiements et monitoring sont gérés par Johan sur demande du propriétaire du site

✔️ Nom de domaine

Hébergeur DNS : IONOS
Compte propriétaire :
h.moronval@nectar-winemerchant.com

🧪 3. Comment ouvrir le projet et lancer le site en local

Cette section est prévue pour quelqu’un qui n’a jamais utilisé Visual Studio Code.

📥 Étape 1 : Télécharger Visual Studio Code

https://code.visualstudio.com/

📁 Étape 2 : Ouvrir le dossier

Décompressez le fichier ZIP reçu.

Ouvrez Visual Studio Code.

Dans le menu du haut, cliquez sur File → Open Folder.

Sélectionnez le dossier du projet.

📦 Étape 3 : Installer les dépendances

Dans VS Code, ouvrez un terminal :

Menu : Terminal → New Terminal

Tapez :

npm install


→ Cela télécharge automatiquement les modules nécessaires.

▶️ Étape 4 : Lancer le site en local

Toujours dans le terminal :

npm run dev


Puis ouvrez votre navigateur à l’adresse :

http://localhost:3000


Le site s’ouvre comme en production.

✉️ 4. Fonctionnement des formulaires
📮 Formulaire de contact

Le formulaire utilise le service SMTP Gmail.

Les messages sont envoyés par l'adresse :
contact.monard.johan@gmail.com

puis transmis au client selon la configuration  à a.bellone@nectar-winemerchant.com

Aucune configuration supplémentaire n’est nécessaire côté client.

A noter que l'envoi de mail se fait uniquement via le Front-end de Vercel.

📰 5. Modale d'inscription à la newsletter
Fonctionnement :

Une fenêtre s’ouvre automatiquement à la première visite, puis éventuellement après un certain délai.

L’utilisateur laisse son adresse email.

Vous recevez un email contenant l’adresse saisie.

Important :

Les emails NE SONT PAS automatiquement ajoutés à une base.
👉 Il suffit de copier/coller l'adresse reçue dans votre outil d’envoi de newsletter.

Ce choix simplifie la gestion et évite les obligations RGPD lourdes pour seulement quelques inscriptions par mois.

🌍 6. Gestion des langues

Le site inclut anglais et français.
Le visiteur peut changer la langue via le menu.
Le choix est enregistré dans son navigateur.

♻️ 7. Mise à jour du site

Les mises à jour sont gérées via le compte Vercel de Johan.

Chaque fois qu’une modification du code est uploadée :

le site reconstruit automatiquement la version,

la nouvelle version est mise en production,

aucune intervention client n’est nécessaire.

🔒 8. Sécurité & Propriété

Le nom de domaine appartient entièrement à Nectar Wine Merchant (IONOS).

Le code source est fourni et reste utilisable même si l’hébergement change.

Le compte hébergeur Vercel est sous la responsabilité de Johan, qui assure maintenance et mises à jour techniques.

🚀 9. Résumé rapide pour le client
Fonction	Statut	Explication
Site en ligne	✔️	nectar-winemerchant.com
Contact	✔️	Envoie un mail via SMTP
Newsletter	✔️	Adresse envoyée par email à ajouter manuellement
Traductions	✔️	FR / EN
Hébergement	✔️	Vercel (Johan)
Domaine	✔️	IONOS (Nectar)
Code fourni	✔️	Lancement simple via npm run dev

📞 10. Support

En cas de problème technique, besoin d’une mise à jour ou ajout futur :

Johan Monard
Développeur Web – Devhook
📧 contact.monard.johan@gmail.com